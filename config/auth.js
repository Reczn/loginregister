module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }  
    req.flash('error_msg', 'Bu kaynağı görüntülemek için lütfen giriş yapın');
    res.redirect('/users/login');
  }, 
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');      
  }
};
