const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/User');
const Aadhar = require('../models/Aadhar');
const bcrypt = require('bcryptjs');


//router.get('/', (req,res) => res.sendFile(path.join(__dirname,'../front-end','register.html')));

router.get('/' ,(req,res) => res.render('register'));

router.post('/', (req, res) => {
  const { name,ano, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
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
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {

        Aadhar.findOne({ ano: ano, name:name, email:email }).then(user => {
          if (user) {
            const newUser = new User({
              name,
              ano,
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
          else {
            errors.push({ msg: 'Aadhaar details do not match' });
            res.render('register', {
            errors,
            name,
            email,
            password,
            password2
         });

        }

        }); 

      }

    });

  }

});
        
      
        

      
  

module.exports = router;