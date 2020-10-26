const express = require('express');
const bodyParser = require ('body-parser');
// const dotenv = require('dotenv').config();
const path = require('path');
var helmet = require('helmet');
const limiter = require('./folder/middleware/rate-limiter');
const mongoSanitize = require('express-mongo-sanitize');
var hpp = require('hpp');

const topicsRoutes = require('./folder/routes/topic.routes');
const usersRoutes = require('./folder/routes/user.routes');
const commentsRoutes = require('./folder/routes/comment.routes');

const app = express();
app.use(limiter);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const db = require("./folder/models");
db.sequelize.sync({ force: false })
.then(() => {
    console.log("Drop and re-sync db.");
});

app.use(hpp());


// app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/topics', topicsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/comments', commentsRoutes);

module.exports = app;