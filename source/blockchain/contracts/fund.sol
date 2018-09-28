pragma solidity ^0.4.4;


// a single contract instance will represent a single round of pledges for a single event and payout accordingly
contract Round {


	// the guy shaving runs the round
	address admin;

	// is the bet still going or has it already happened?
	bool active = true;

	// or in future, do a 2-dim array: pledgers['pledgecategory'][]
	mapping ( address => uint ) pledger_to_amount;

	// constructor
	function Round() payable {
		admin = msg.sender;
	}

	// decorator/modifier for only-admin methods
	modifier onlyAdmin() {
		if (msg.sender != admin)
			throw;
		_;
	}

	// render the contract inactive after collections
	modifier onlyActive() {
		if (!active)
			throw;
		_;
	}

	// just in case the admin doesn't want to take money from one of the pledgers
	function removePledger(pledger) onlyAdmin onlyActive returns (bool success) {
		delete pledger_to_amount[pledger];
		return true;
	}

	// allow anyone to pledge money
	function pledge(uint amount) onlyActive returns (bool success) {
		pledger_to_amount[msg.sender] = amount
		// somehow tie up their money
		return true
	}

	// collect the pledges from everyone
	function collect() onlyAdmin onlyActive returns (uint total) {
		uint total;
		for(pledger in pledger_to_amount) {
			amount = pledger_to_amount[pledger];
			total = total + amount;
		}
		// actually deduct pledges from pledgers and pay to admin
		active = false
		return total
	}


}

