// Express
const express = require('express');
const app = express();

//ENV file
require('dotenv').config();
// Mongoose / DB
require('./config/db');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // body-parser

const { ensureAuth } = require('./config/auth');
const userRoutes = require('./src/routes/userRoutes');
// app.use('/error_logs', ensureAuth, errorLogsRoutes);
app.use('', userRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('App listening in port: ' + port);
});
