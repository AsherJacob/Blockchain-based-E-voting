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
}
//Election.deployed().then(function(instance) { app = instance })
//app.vote(1, { from: accounts[0] })
/*pragma solidity >=0.4.22 <0.7.0;
contract Ballot {
    struct Voter {
        uint weight;
        bool voted;
        address delegate;
        uint vote;
    }
    struct proposal {
        bytes32 name;
        uint voteCount;
    }

    address public chairperson;
    mapping(address => Voter ) public voters;
    proposal[] public proposals;
    constructor(bytes32[] memory proposalNames ) public {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        for(uint i = 0; i < proposalNames.length; i++) {
            proposals.push(proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }
    function giveRightToVote(address voter) public {
        require(
            msg.sender == chairperson,
            "Only Chairperson can give right- to vote."
        );
        require(
            !voters[voter].voted,
            "The voter already voted."
        );
        require(voters[voter].weight == 0, "Error.");
        voters[voter].weight = 1;
    }
    function delegate(address to) public {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted,"You already voted.");

        require(to != msg.sender, "Self-delegation is disallowed");

        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;

            require(to != msg.sender, "Found loop in delegation.");
        }
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegate_ = voters[to];
        if(delegate_.voted) {
            proposals[delegate_.vote].voteCount += sender.weight;
        } else {
            delegate_.weight += sender.weight;
        }
    }
    function vote(uint proposal)public {
        Voter storage
    }
}

    /// Delegate your vote to the voter `to`.
    function delegate(address to) public {
        // assigns reference
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "You already voted.");

        require(to != msg.sender, "Self-delegation is disallowed.");

        // Forward the delegation as long as
        // `to` also delegated.
        // In general, such loops are very dangerous,
        // because if they run too long, they might
        // need more gas than is available in a block.
        // In this case, the delegation will not be executed,
        // but in other situations, such loops might
        // cause a contract to get "stuck" completely.
        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;

            // We found a loop in the delegation, not allowed.
            require(to != msg.sender, "Found loop in delegation.");
        }

        // Since `sender` is a reference, this
        // modifies `voters[msg.sender].voted`
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegate_ = voters[to];
        if (delegate_.voted) {
            // If the delegate already voted,
            // directly add to the number of votes
            proposals[delegate_.vote].voteCount += sender.weight;
        } else {
            // If the delegate did not vote yet,
            // add to her weight.
            delegate_.weight += sender.weight;
        }
    }

    /// Give your vote (including votes delegated to you)
    /// to proposal `proposals[proposal].name`.
    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;

        // If `proposal` is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        proposals[proposal].voteCount += sender.weight;
    }

    /// @dev Computes the winning proposal taking all
    /// previous votes into account.
    function winningProposal() public view
            returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    // Calls winningProposal() function to get the index
    // of the winner contained in the proposals array and then
    // returns the name of the winner
    function winnerName() public view
            returns (bytes32 winnerName_)
    {
        winnerName_ = proposals[winningProposal()].name;
    }pragma solidity >=0.4.22  <0.7.0;

//declare contract
contract Election {
    //creating smoke test
    //model a candidate
    struct Candidate {
        uint id;
        string name;
        uint votCount;
    }
    //store candidate

    //fetch candidate
    mapping(uint =>Candidate) public candidates; //mappingis an associative array r a ahsh associativee key value pairs with one another
    //store candidates Count
    uint public candidatesCount;
    string public candidate;
    //constructor
    function election () public {
        //candidate = "candidate1";//candidate is a state variable and it is accessible inside contract
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }
    function addCandidate (string memory _name) private { // private because not too be accessible by public interface of contract
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
}
//Election.deployed().then(function(instance) { app = instance })*/