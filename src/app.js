const path = require('path');
require('dotenv').config();
const express = require('express');
const passport = require('passport');
require('./services/authGoogle');
require('./services/authGithub');
const MongoStore = require('connect-mongo');
const session = require('express-session');



const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");
const forgotPasswordRoute = require('./routes/forgotPassword'); 

const cors = require('cors');

const app = express();
const createAdminAccount = require("./scripts/admin");
const PORT = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'build')));


app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 14 * 24 * 60 * 60 // Session TTL (optional)
  })
}));

app.use(passport.initialize());
app.use(passport.session());

createAdminAccount();

app.use("/user", signupRoute);
app.use("/auth", loginRoute);
app.use("/api", userRoute);
app.use("/auth", forgotPasswordRoute);


// Handle the `/dashboard` route
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// For any other requests, serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});