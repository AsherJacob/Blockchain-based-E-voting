const express = require('express');
const router = express.Router();
const path = require('path');

var cid=[];
var cname = [];
var cvote = [];
var counter = 0;

router.get('/', (req,res) => {
    Election.methods.candidatesCount()
     .call({ from: coinbase }).then((count) => {
 
        for ( var i = 1; i <= count; i++ ) {
          Election.methods.getCandidate(i)
            .call({ from: coinbase }).then((val) => {
              cid[counter] =  web3.utils.toBN(val._id).toString();
              cname[counter] = val._name;
              cvote[counter] = val._voteCount;
              counter++;
              //console.log(`data.id = ${cid}  and data.name = ${cname} `);
              if(counter==count){
                //console.log(`final cid = ${cid}  `);
                counter = 0;
                res.render('result', {cid:cid, cname:cname, cvote:cvote});
              }
             
            });
        }
      });
  }); 


  module.exports = router;