const express = require('express');
const router = express.Router();
const path = require('path');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
//router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

router.get('/',(req,res) => res.sendFile(path.join(__dirname,'front-end','index.html')));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

module.exports = router;
