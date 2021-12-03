const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));
router.get('/shop', forwardAuthenticated, (req, res) => res.render('shop'));

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Lütfen tüm alanları girin' });
  }

  if (password != password2) {
    errors.push({ msg: 'Parolalar uyuşmuyor' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Şifre en az 6 karakterden oluşmalıdır' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Bu e-posta zaten kayıtlı' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
      User.findOne({ name: name }).then(user => {
      if (user) {
        errors.push({ msg: 'Girdiğiniz isime zaten bir kişi sahip' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });
      console.log(newUser)
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'Artık kayıtlısınız ve giriş yapabilirsiniz'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
})}});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Çıkış yaptınız');
  res.redirect('/users/login');
});

module.exports = router;
 