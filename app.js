const express = require("express");
const bodyParser = require("body-parser");
const stuffRoutes = require("./src/routes/device");
const userRoutes = require("./src/routes/user");
const { MongooseService } = require('./src/utilities/services/moongose.service')


MongooseService.connectWithRetry();

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/device', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
