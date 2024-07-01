const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/user');
const { generateToken } = require('../utils/jwtUtils');

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID_GITHUB,
  clientSecret: process.env.GITHUB_CLIENT_SECRET_GITHUB,
  callbackURL: "/auth/github/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ githubId: profile.id });
    if (!user) {
      user = new User({
        githubId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        role: 'customer'
      });
      await user.save();
    }
    const token = generateToken(user);
    return done(null, user, { token });
  } catch (error) {
    return done(error, false);
  }
}
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

module.exports = passport;
