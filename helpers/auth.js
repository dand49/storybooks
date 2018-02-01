module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated() || isAdmin(req)) {
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
         && module.exports.isAdmin(req) ) {
      return next();
    }
    res.redirect('/');
  },

  isAdmin: function(req) {
    if (req.user.firstName === 'Dan'
        && req.user.lastName === 'Dorton') {
      return true;
    } else {
      return false;
    }
  }
}

