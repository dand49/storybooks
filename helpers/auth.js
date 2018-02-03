module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated() || module.exports.isAdmin(req.user)) {
      return next();
    }
    res.redirect('/');
  },

  ensureGuest: function(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard');
    } else {
      return next();
    }
  },

  ensureAdmin: function(req, res, next) {
    if ( req.isAuthenticated() 
         && module.exports.isAdmin(req.user) ) {
      return next();
    }
    res.redirect('/');
  },

  isAdmin: function(user) {
    if (user.firstName === 'Dan'
        && user.lastName === 'Dorton') {
      return true;
    } else {
      return false;
    }
  }
}

