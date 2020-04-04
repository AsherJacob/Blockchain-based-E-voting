const express = require('express');
const router = express.Router();
const passport = require('passport');
 
 
router.get('/', (req,res) => {
    // req.session.destroy(function (err) {
    //     res.redirect('/'); 
    //   });
    req.logOut();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');

});
 

 

 
module.exports = router;