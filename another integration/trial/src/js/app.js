const Express = require('express');
const Web3 = require('web3');
const path = require('path');



let App = {

    init: function() {
        App.server = Express();

        App.initWeb3().then( () => {
            App.port = 8001;
        App.startServing();
    });
    },

    initWeb3: async function() {
        
        App.web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

        let electionContractJson = require("../../build/contracts/Election.json");

        App.ElectionABI =  electionContractJson.abi;
        App.ElectionBIN = electionContractJson.bytecode;


        App.ChainId = await App.web3.eth.net.getId();
        let electionAddr = electionContractJson.networks[App.ChainId].address;


        App.ElectionInstance = new App.web3.eth.Contract(
            App.ElectionABI,
            electionAddr
        );
    },


    startServing: async function() {
        

        App.server.use(Express.urlencoded({ extended: true }));
        App.server.use(Express.static('src'));

        await App.web3.eth.getAccounts().then(function(e){
            App.accounts = e;
        });
        console.log(App.accounts);

        // require('./routes')(App.server, {
        //     web3: App.web3,
        //     accounts: App.accounts,
        //     electionAddr: App.ElectionInstance._address,
        //     electionABI: App.ElectionABI,
        //     electionInstance: App.ElectionInstance
        // });


        App.server.get('/', (req,res) => {
            res.send('hello brother');
            App.printing();
        });



         App.server.get('/vote', (req,res) => {
             res.sendFile(path.join(__dirname,'../vote.html'));
             var electionInstance;
              //  var loader = $("#loader");
               // var content = $("#content");
            
               // loader.show();
                //content.hide();
            
                // Load account data
                App.web3.eth.getCoinbase(function(err, account) {
                if (err === null) {
                    App.account = account;
                   // $("#accountAddress").html("Your Account: " + account);
                }
                });
            
                // Load contract data
                App.contracts.Election.deployed().then(function(instance) {
                electionInstance = instance;
                return electionInstance.candidatesCount();
                }).then(function(candidatesCount) {
                var candidatesResults = $("#candidatesResults");
                candidatesResults.empty();
            
                var candidatesSelect = $('#candidatesSelect');
                candidatesSelect.empty();
            
                for (var i = 1; i <= candidatesCount; i++) {
                    electionInstance.candidates(i).then(function(candidate) {
                    var id = candidate[0];
                    var name = candidate[1];
                    var voteCount = candidate[2];
            
                    // Render candidate Result
                    var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
                    candidatesResults.append(candidateTemplate);
            
                    // Render candidate ballot option
                    var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
                    candidatesSelect.append(candidateOption);
                    });
                }
                return electionInstance.voters(App.account);
                }).then(function(hasVoted) {
                // Do not allow a user to vote
                // if(hasVoted) {
                //     $('form').hide();
                // }
              //  loader.hide();
                //content.show();
                }).catch(function(error) {
                console.warn(error);
                });


         });

        App.server.listen(App.port, () => {
            console.log('We are live on ' + App.port);

        console.log("Deployed Election contract address: ", App.ElectionInstance._address);
        // App.ElectionInstance.methods.owner().call().then( function(owner) {
        //     console.log("Election owner: "+owner);
        // });
    });
    },


    printing: function() {
        console.log('trial baby');
    }




};

App.init();











// var port = 8000;

// app.get('/', (req,res) => {
//     res.send('hi');
// })

// app.listen(port, () => {
//     console.log('Server running on port 8000');
// });
