const express = require('express');
const path = require('path');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
//router.get('/', forwardAuthenticated, (req, res) =>res.render('welcome'));

router.get('/',/* forwardAuthenticated,*/ (req, res) =>{ 
    res.sendFile(path.join(__dirname,'index.html')),
    res.sendFile(path.join(__dirname,'style.css'))
}
    );

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

module.exports = router;
