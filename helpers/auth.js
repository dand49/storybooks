module.exports = {
  ensureAuthenticated: function(req, res, next) {
    console.log(`ensureAuthenticated: ${req.user}`);
    if (req.isAuthenticated() || isAdmin(req)) {
      console.log(`ensureAuthenticated next(): ${next}`);
      return next();
    }
    console.log(`ensureAuthenticated redirect()`);
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
         && isAdmin(req) ) {
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

