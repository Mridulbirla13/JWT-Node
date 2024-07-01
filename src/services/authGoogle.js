const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const { generateToken } = require('../utils/jwtUtils');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = new User({ 
        googleId: profile.id,
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

// // src/services/authGoogle.js
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('../models/user');

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://localhost:5000/auth/google/callback"
// },
// async (token, tokenSecret, profile, done) => {
//   // // Save or update user details in the database
//   // const user = await User.findOneOrCreate({ googleId: profile.id }, {
//   //   name: profile.displayName,
//   //   email: profile.emails[0].value
//   // });
//   return done(null, profile);
// }
// ));

// passport.serializeUser((user, done) =>{
//   done(null, user);
// });

// passport.deserializeUser((user, done) =>{
//   done(null, user);
// });

// module.exports = passport;
