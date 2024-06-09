require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const wordsRoutes = require('./routes/words'); 
const userRoutes = require('./routes/users'); 
const contentRoutes = require('./routes/content')
const activityRoutes = require('./routes/activity');
const gradeRoutes = require('./routes/grades');
const { Content } = require('./models/contentModel')
// express app
const app = express();

// Allow requests from localhost:5173
app.use(cors({
    origin: 'http://localhost:5173'
  }));

// middleware
app.use(express.json()); // used for post/update request
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/words', wordsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/grades', gradeRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        // listen to requests
        app.listen(process.env.PORT, () => {
        console.log('connected to db and listening to port', process.env.PORT ); // for DEBUGGING
        })
    })
    .catch((error) => {
        console.log(error)
    })

