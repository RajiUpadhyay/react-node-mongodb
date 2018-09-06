const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const jwt = require("jsonwebtoken");
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();
const port = process.env.API_PORT || 8081;

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(fileUpload());

//Set up default mongoose connection
//Bind connection to error event (to get notification of connection errors)
//Get the default connection
// Get Mongoose to use the global promise library
const mongoDB = 'mongodb://127.0.0.1/obaju-react';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], 'OBAJU_NODE_REACT_MONGO', (err, decode) => {
            req.user = err ? undefined : decode;
            next();
        })
    } else {
        req.user = undefined;
        next();
    }
});

app.use('/api', routes);

app.listen(port, () => {
    console.log(`App is running at ${port}`)
})