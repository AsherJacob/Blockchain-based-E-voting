pragma solidity >=0.4.22  <0.7.0;

//declare contract
contract Election {
    //creating smoke test
    //model a candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    //store accounts that have voted
    mapping(address => bool) public voters;
    //store candidate
    //fetch candidate
    mapping(uint =>Candidate) public candidates; //mappingis an associative array r a ahsh associativee key value pairs with one another
    //store candidates Count
    uint public candidatesCount;
    string public candidate;
    //constructor
    constructor () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }
    /*function election () public {
        //candidate = "candidate1";//candidate is a state variable and it is accessible inside contract
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }*/
    function addCandidate (string memory _name) private { // private because not too be accessible by public interface of contract
        candidatesCount ++;
        candidates[candidatesCount] = Candidate({id: candidatesCount, name: _name, voteCount:0} );
    }
    function vote (uint _candidateId) public {
        //user haven't voted before
        require(!voters[msg.sender],'User have voted before!!');
        //valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount,'Invalid candidate');
        voters[msg.sender] = true;
        candidates[_candidateId].voteCount ++;
    }

    function getVote (uint _Id) public view returns (uint _Cid,  uint _Cvotecount){
        _Cid = candidates[_Id].id;
        _Cvotecount = candidates[_Id].voteCount;
    }
}
//Election.deployed().then(function(instance) { app = instance })
//app.vote(1, { from: accounts[0] })