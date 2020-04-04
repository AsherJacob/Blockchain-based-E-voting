const express = require('express');
const path = require('path');
const User = require('./models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const Web3 = require('web3');
const cookieParser = require('cookie-parser');



var uid = [];
var count = 0;
var loginemail = "";



// web3 config

   var web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
// ethereum.enable();
   web3 = new Web3(web3Provider);


 coinbase = "0x775e80af823Ddb17b60c3B62691413bda3247CDa";
var contractAddress = "0xbEdbD7c5BcE90461402625286D91cb745F7e0fed";

var contractAbi = [
  {
    "constant" : false,
    "inputs": [
      {
        "name": "_candidateId",
        "type": "uint"
      }
    ],
    "name": "vote",
    "output": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },

  {
    "constant": false,
    "inputs":[
      {
        "name": "_name",
        "type": "string"
      
      }
  ],
    "name": "addCandidate",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },

  {
    "constant": true,
    "inputs": [
      {
        "name": "_Id",
        "type": "uint"
      }
    ],
    "name" : "getVote",
    "outputs": [
        {
          "name": "_Cid",
          "type": "uint"
        },
        {
          "name": "_Cvotecount",
          "type": "uint"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"

  }
];

Election = new web3.eth.Contract(contractAbi, contractAddress)

app.use(express.json());

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
app.use(cookieParser());
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// For static front end
app.use(express.static('front-end'));


//GET Login
app.get('/login', (req,res) => res.sendFile(path.join(__dirname,'front-end','login.html')));

//GET Registration page
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

//Get Result
// Democracy.methods.getResult()
//     .call({ from: coinbase }).then((val) => {
//       console.log(val);
//       val.
//     })
 //Function to ensure you're logged in before seeing dashboard
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
     res.redirect('/login');
}


//GET Dashboard
app.get('/dashboard',ensureAuthenticated, (req,res) => {
  if(count>0 && (uid.indexOf(loginemail) >= 0))
    res.send('already voted');
  else
  res.sendFile(path.join(__dirname,'front-end','dashboard.html'))
});

// app.get('/vote', (req,res) => res.sendFile(path.join(__dirname,'blockchain','src/index.html')) );

//login

app.post('/login',(req, res, next) => {

  loginemail = req.body.email;
  
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  })(req, res, next);
});



//logout
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


app.post('/dashboard', (req,res) => {

  data = req.body;

  //Store email id into array     
  uid[count] = loginemail;
  count = count+1;

  Election.methods.vote(
    data.Candidate
  ).send({ from:coinbase, gas: 600000}).catch((error)=>{
    console.log(error)
  });
  
  res.send('Success');

});


app.get('/result', (req,res) => {

  Election.methods.getVote(1)
      .call({from:coinbase}).then((val) => {
        console.log(val);
        res.send('its done');
      }).catch(error =>
        console.log(error)
      );
});
    
module.exports = app;
