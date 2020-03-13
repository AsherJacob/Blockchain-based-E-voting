const express = require('express');;
const router = express.Router();
const path = require('path');
const User = require('../models/User');
const bcrypt = require('bcryptjs');


router.get('/', (req,res) => res.sendFile(path.join(__dirname,'../front-end','register.html')));

router.post('/', (req,res) => {

    const { name, email, password, password2 } = req.body;
  
    if(password !== password2){
      res.send("Passwords do not match");
    }
  
    else if(password.length < 6){
      res.send("Password must be at least 6 characters");
    }
    
    else{
      User.findOne({ email: email }).then(user => {
        if (user) {
          res.send("Email already exists");
        }
  
        else{
          const newUser = new User({
            name,
            email,
            password
          });
  
          bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save().then( () => {res.redirect('/login');}).catch(err => console.log(err));
              
    
                
            });
          });
      }
  
    });
  }
  
  });
  

module.exports = router;