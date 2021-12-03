const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

router.get('/shop', ensureAuthenticated, (req, res) => 
res.render('shop', {
  user: req.user
})); 

router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

module.exports = router;
