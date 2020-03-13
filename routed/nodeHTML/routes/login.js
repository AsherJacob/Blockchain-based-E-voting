const express = require('express');;
const router = express.Router();
const path = require('path');
const passport = require('passport');


router.get('/', (req,res) => res.sendFile(path.join(__dirname,'../front-end','login.html')));

router.post('/',(req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login'
    })(req, res, next);
  });


  

module.exports = router;