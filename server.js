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

// Session
const cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.set('trust proxy', 1); // trust first proxy
app.use(
	session({
		name: 'session',
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: oneDay, // 1 min
		},
	})
);

const userRoutes = require('./src/routes/userRoutes');
// app.use('/error_logs', ensureAuth, errorLogsRoutes);
app.use('', userRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('App listening in port: ' + port);
});
