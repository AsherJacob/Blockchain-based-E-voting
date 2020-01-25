const express = require('express');
const path = require('path');
const User = require('./models/User');
const mongoose = require('mongoose');
const app = express();



// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
// mongoose
//   .connect(
//     db,
//     { useNewUrlParser: true,
//       useUnifiedTopology: true }
//   )
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));



// Express body parser
app.use(express.urlencoded({ extended: true }));

app.use(express.static('front-end'));

app.get('/login', (req,res) => res.sendFile(path.join(__dirname,'front-end','login.html')));
app.get('/register', (req,res) => res.sendFile(path.join(__dirname,'front-end','register.html')));

// Registration
app.post('/register', (req,res) => {

        const newUser = new User({
          name: req.body.name,
          email:req.body.email,
          password:req.body.password
        })

       newUser.save();

       console.log(`user name is ${newUser.name}`);

}
)
               
      

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
