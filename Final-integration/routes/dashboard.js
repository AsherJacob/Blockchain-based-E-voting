const express = require('express');
const router = express.Router();
const path = require('path');
const login = require('./login');
 
// To ensure authentication
 
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
   
    else{
      res.redirect('/login');
    }
   
  }
 
 
  var cid=[];
  var cname = [];
  var counter = 0;
 
//router.get('/',ensureAuthenticated, (req,res) => res.sendFile(path.join(__dirname,'../front-end','dashboard.html'))
 
 
router.get('/', ensureAuthenticated, (req,res) => {
  //Get Mail ID of the User
  //console.log(`email in dashboard = ${login.email}`);
  mailId = login.email;
  Election.methods.hasVoted(mailId)
    .call({ from: coinbase}).then((cond) => {
      if(!cond) {
        Election.methods.candidatesCount()
          .call({ from: coinbase }).then((count) => {
            console.log(coinbase);
            for ( var i = 1; i <= count; i++ ) {
              Election.methods.getCandidate(i)
                .call({ from: coinbase }).then((val) => {
                  cid[counter] =  web3.utils.toBN(val._id).toString();
                  cname[counter] = val._name;
                  counter++;
                  //console.log(`data.id = ${cid}  and data.name = ${cname} `);
                  if(counter==count){
                    //console.log(`final cid = ${cid}  `);
                    counter = 0;
                    res.render('dashboard', {cid:cid, cname:cname});
                  }
              });
            }
          });
      }
      else {
        res.render('voted');
      }
    });
});  
 
router.post('/', function(req, res, next) {
  var voteData = req.body.selectpicker;
  mailId = login.email;
  //Pass Mail ID of the user along with voting Data
  Election.methods.vote(voteData, mailId)
    .send({from: coinbase, gas:6000000}).catch((error) => {
      console.log(error);
    }).then(() => {
      res.redirect('/login');
    });
  //res.send('Succesfully Voted');
 
});






module.exports = router;