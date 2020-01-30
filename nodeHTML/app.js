const express = require('express');
const path = require('path');
const User = require('./models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const app = express();


// Passport Config
require('./config/passport')(passport);


// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
      useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));





// Express body parser
app.use(express.urlencoded({ extended: true }));

app.use(express.static('front-end'));

app.get('/login', (req,res) => res.sendFile(path.join(__dirname,'front-end','login.html')));
app.get('/register', (req,res) => res.sendFile(path.join(__dirname,'front-end','register.html')));

// Registration
app.post('/register', (req,res) => {

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
    
    

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
