const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

// Load User Model
const User = mongoose.model('users');

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    }, (accessToken, refreshToken, profile, done) => {
      //console.log(accessToken);
      //console.log(profile);

      const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
      
      //console.log(profile);

      const newUser = {
        googleID: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        gender: profile.gender,
        provider: profile.provider,
        url: profile.url,
        isPlusUser: profile.isPlusUser,
        isVerified: profile.isVerified,
        language: profile.language,
        image: image
      }

      //Check for Exising User
      User.findOne({
        googleID: profile.id
      })
        .then(user => {
          if(user) {
            user.displayName = newUser.displayName;
            user.firstName = newUser.firstName;
            user.lastName = newUser.lastName;
            user.email = newUser.email;
            user.gender = newUser.gender;
            user.provider = newUser.provider;
            user.url = newUser.url;
            user.isPlusUser = newUser.isPlusUser;
            user.isVerified = newUser.isVerified;
            user.language = newUser.language;
            user.image = image;

            user.save()
              .then(user => done(null, user));
          // // Return user
          // done(null, user);
          } else {
          // Create User
            new User(newUser)
              .save()
              .then(user => done(null, user));
          }
      })
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
  });
}