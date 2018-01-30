module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
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
    if ( req.isAuthenticated 
         && req.user.firstName === 'Dan'
         && req.user.lastName === 'Dorton') {
      return next();
    }
    res.redirect('/');
  }
}