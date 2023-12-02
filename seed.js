require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust path as needed
const Course = require('./models/Course');
const Workshop = require('./models/Workshop');
const JobListing = require('./models/JobListing');
const Company = require('./models/Company');
const CommunityGroup = require('./models/CommunityGroup');
const Resource = require('./models/Resource');
const Feedback = require('./models/Feedback');
const Report = require('./models/Report');

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const seedData = async () => {
    await mongoose.connection.dropDatabase();

    // Creating seed data for Users
    const users = await User.insertMany([
        { name: 'Alice', email: 'alice@example.com', password: 'password', role: 'newcomer', bio: 'Aspiring developer', skills: ['JavaScript', 'React'], interests: ['Web Development', 'AI'], linkedIn: 'linkedin.com/in/alice', github: 'github.com/alice' },
        { name: 'Bob', email: 'bob@example.com', password: 'password', role: 'professional', bio: 'Experienced developer', skills: ['Node.js', 'MongoDB'], interests: ['Backend Development', 'Databases'], linkedIn: 'linkedin.com/in/bob', github: 'github.com/bob' }
        // Add more users as needed
    ]);

    // Creating seed data for Companies
    const companies = await Company.insertMany([
        { name: 'TechCorp', description: 'Leading tech company', location: 'San Francisco', industry: 'Software', website: 'techcorp.com' },
        { name: 'InnovateNow', description: 'Innovation-driven company', location: 'New York', industry: 'Hardware', website: 'innovatenow.com' }
        // Add more companies as needed
    ]);

    // Creating seed data for Courses
    const courses = await Course.insertMany([
        { title: 'Intro to JavaScript', description: 'Learn JavaScript from scratch', instructor: users[1]._id, enrolledUsers: [users[0]._id], startDate: new Date(), endDate: new Date(), level: 'Beginner', category: 'Programming' },
        { title: 'Advanced Node.js', description: 'Deep dive into Node.js', instructor: users[1]._id, enrolledUsers: [users[0]._id], startDate: new Date(), endDate: new Date(), level: 'Advanced', category: 'Backend' }
        // Add more courses as needed
    ]);

    // Creating seed data for Workshops
    const workshops = await Workshop.insertMany([
        { title: 'React Workshop', description: 'Interactive React workshop', presenter: users[1]._id, participants: [users[0]._id], date: new Date(), location: 'Online' },
        { title: 'UI/UX Design Fundamentals', description: 'Mastering UI/UX design', presenter: users[1]._id, participants: [users[0]._id], date: new Date(), location: 'Online' }
        // Add more workshops as needed
    ]);

    // Creating seed data for Job Listings
    const jobListings = await JobListing.insertMany([
        { title: 'Frontend Developer', company: companies[0]._id, description: 'Developing cutting-edge frontend applications', requirements: ['React', 'CSS'], location: 'Remote', employmentType: 'Full-time' },
        { title: 'Backend Engineer', company: companies[1]._id, description: 'Building robust backend systems', requirements: ['Node.js', 'MongoDB'], location: 'New York', employmentType: 'Full-time' }
        // Add more job listings as needed
    ]);

    // Creating seed data for Community Groups
    const communityGroups = await CommunityGroup.insertMany([
        { name: 'Women in Tech', description: 'Supporting women in technology', focusArea: 'Gender Equality', website: 'womenintech.com' },
        { name: 'Code for Good', description: 'Coding for social impact', focusArea: 'Social Good', website: 'codeforgood.com' }
        // Add more community groups as needed
    ]);

    // Creating seed data for Resources
    const resources = await Resource.insertMany([
        { title: 'JavaScript Basics', type: 'article', link: 'https://example.com/js-basics', description: 'A beginner guide to JavaScript', author: 'Alice' },
        { title: 'React Tutorial', type: 'video', link: 'https://example.com/react-tutorial', description: 'Learn React step by step', author: 'Bob' }
        // Add more resources as needed
    ]);

    // Creating seed data for Feedback
    const feedbacks = await Feedback.insertMany([
        { user: users[0]._id, content: 'Great course!', onCourse: courses[0]._id, rating: 4 },
        { user: users[1]._id, content: 'Very insightful workshop', onCourse: workshops[0]._id, rating: 5 }
        // Add more feedbacks as needed
    ]);

    // Creating seed data for Reports
    const reports = await Report.insertMany([
        { user: users[0]._id, description: 'Issue with course content', dateReported: new Date(), resolved: false },
        { user: users[1]._id, description: 'Technical problem in the workshop', dateReported: new Date(), resolved: true, resolutionDetails: 'Issue resolved' }
        // Add more reports as needed
    ]);

    console.log('Database seeded!');
    mongoose.connection.close();
};

seedData();
