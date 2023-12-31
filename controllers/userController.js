const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Newcomer = require('../models/Newcomer');
const Professional = require('../models/Professional');
const CommunityGroup = require('../models/CommunityGroup');
const Company = require('../models/Company');
const transporter = require('../emailService');
const Collaboration = require('../models/Collaboration');

exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Email, password, and role are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({ ...req.body, password: hashedPassword });

        // Handle role-specific record creation
        switch (role) {
            case 'newcomer':
                // Assuming you want to collect specific data for a newcomer during registration
                await Newcomer.create({ user: user._id, /* additional newcomer data */ });
                break;
            case 'professional':
                // Assuming specific data for professionals
                await Professional.create({ user: user._id, /* additional professional data */ });
                break;
            case 'community':
                // For community groups
                await CommunityGroup.create({ user: user._id, /* additional community group data */ });
                break;
            case 'company':
                // For companies
                await Company.create({ user: user._id, /* additional company data */ });
                break;
            case 'admin':
                user.role = 'admin';
                // Handle admin creation if needed
                // await Admin.create({ user: user._id, /* additional admin data */ });
                break;
            default:
                // Optionally handle unknown roles
                throw new Error('Invalid user role');
        }

        // Create token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        const mailOptions = {
            from: '"ADA IN TECH" adaobiamudo@gmail.com',
            to: user.email, // User's email address
            subject: 'Welcome to Ada in Tech',
            text: `Welcome, ${user.name}! Thank you for registering at Ada in Tech. This is a confirmation that your account has been created.`,
            html: `<p>Welcome, <strong>${user.name}</strong>! Thank you for registering at Ada in Tech. This is a confirmation that your account has been created.</p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending welcome email:', error);
            } else {
                console.log('Welcome email sent:', info.messageId);
            }
        });

        res.status(201).json({ token, userRole: user.role });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({
            userId: user._id,
            name: user.name,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            // include other necessary fields but exclude the password
        };

        res.json({ user: userData, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('profilePicture name email bio skills interests linkedIn github role');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Method to send message and record collaboration
exports.sendMessage = async (req, res) => {
    const { recipientId, message, senderId, subject } = req.body;

    try {
        // Fetch recipient's email
        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found' });
        }

        // Send email
        const mailOptions = {
            from: '"ADA IN TECH" <adaobiamudo@gmail.com>',
            to: recipient.email,
            subject: subject,
            text: message
        };
        await transporter.sendMail(mailOptions);

        // Record collaboration
        await Collaboration.create({ sender: senderId, receiver: recipientId });

        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Failed to send message' });
    }
};
