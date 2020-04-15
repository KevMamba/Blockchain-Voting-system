pragma solidity>=0.4.16 <0.6.0;
contract Election {
	string public greeting;
	struct Candidate
	{
		uint id;
		string name;
		uint count;
	}

	mapping(uint=>Candidate) public candidates;
	mapping(address=>bool) public voters;
	uint public candCount;
	uint public initialV;

	constructor() public{
		greeting = "Hello";
		initialV = 0;
	}

	function addCandidate(string memory a) public{
		candidates[candCount] = Candidate(candCount,a,initialV);
		candCount++;
	}
	function vote(uint id) private{
		candidates[id].count++;
	}
	function castV(uint id) public returns (uint){
		require(!voters[msg.sender]);
		require(id>=0 && id<candCount);
		voters[msg.sender]=true;
		vote(id);
		return candidates[id].count;
	}
	function getVotes(uint id) public returns (uint){
		return candidates[id].count;
	}
	function getNumberOfCandidates() public returns (uint){
		return candCount;
	}
	function getCandName(uint id) public returns (string memory){
		return candidates[id].name;
	}

}
