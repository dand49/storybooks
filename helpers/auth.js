module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenitcated) {
      return next();
    }
    res.redirect('/');
  }
}