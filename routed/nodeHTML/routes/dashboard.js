const express = require('express');;
const router = express.Router();
const path = require('path');

// To ensure authentication

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    
    else{
      res.redirect('/login');
    }
    
  }


router.get('/',ensureAuthenticated, (req,res) => res.sendFile(path.join(__dirname,'../front-end','dashboard.html')));

module.exports = router;