const path = require('path');
require('dotenv').config();
const express = require('express');
const passport = require('passport');
require('./services/authGoogle');
require('./services/authGithub');
const session = require('express-session');
const RedisStore = require('connect-redis').default; // Updated Redis session store
const { createClient } = require('redis'); // Updated Redis client

const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");

const cors = require('cors');

const app = express();
const createAdminAccount = require("./scripts/admin");
const PORT = process.env.PORT || 5000;

// Redis client configuration
const redisClient = createClient({
  url: process.env.REDIS_URL // Ensure to set your Redis URL in the .env file
});

// Connect to Redis
redisClient.connect().catch(console.error);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'build')));


app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Session middleware with Redis store
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET || 'keyboard cat', // Use environment variable for session secret
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

createAdminAccount();

app.use("/user", signupRoute);
app.use("/auth", loginRoute);
app.use("/api", userRoute);

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