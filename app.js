const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const workshopRoutes = require('./routes/workshopRoutes');
const jobListingRoutes = require('./routes/jobListingRoutes');
const companyRoutes = require('./routes/companyRoutes');
const communityGroupRoutes = require('./routes/communityGroupRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const reportRoutes = require('./routes/reportRoutes');
const newcomerRoutes = require('./routes/newcomerRoutes');
const professionalRoutes = require('./routes/professionalRoutes');

const app = express();
const port = process.env.PORT || 3001;

require('dotenv').config();

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

// Enable CORS
app.use(cors());

// Middleware for JSON body parsing
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/workshops', workshopRoutes);
app.use('/joblistings', jobListingRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/communitygroups', communityGroupRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/newcomers', newcomerRoutes);
app.use('/api/professionals', professionalRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
