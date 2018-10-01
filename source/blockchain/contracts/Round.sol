pragma solidity ^0.4.4;


// a single contract instance will represent a single round of pledges for a single event and payout accordingly
contract Round {
	// utilities here, if any

	// the guy shaving runs the round
	// doesn't really need to be public
	address public owner;

	// is the bet still going or has it already happened?
	// self-destruct contract when done.  Then won't need active or onlyActive.
	bool public active = true;

	// or in future, do a 2-dim array: pledgers['pledgecategory'][]
	address[] public pledgers;
	mapping (address => uint) public pledger_to_amount;

	function pledgersLength() view external returns(uint length) {
		return pledgers.length;
	}

	// constructor
	constructor() payable public {
		owner = msg.sender;
	}

	// decorator/modifier for only-owner methods
	modifier onlyOwner() {
		require(msg.sender == owner);
		_;
	}

	// render the contract inactive after collections
	modifier onlyActive() {
		require(active);
		_;
	}

	function isPledger(address person) view public returns(bool is_pledger) {
		for(uint i = 0; i < pledgers.length; i++) {
			if(person == pledgers[i]) {
				return true;
			}
		}
		return false;
	}

	// allow anyone to pledge money
	function pledge(uint amount) onlyActive payable public returns(bool success) {
		address pledger = msg.sender;
		// if pledger has pledged before, check pledge
		if(isPledger(pledger)) {
			// you can't LOWER a pledge
			require(amount > pledger_to_amount[pledger]);
		}
		// otherwise, post them as new pledger
		else {
			pledgers.push(pledger);
		}
		// finally, adjust their pledge
		pledger_to_amount[pledger] = amount;
		// somehow tie up their money (similar to stakeBela, their money can't be used for anything else as long as it is 'pledged').  This might be as simple as transferring it to another account.
		return true;
	}

	// just in case the owner doesn't want to take money from one of the pledgers
	function removePledger(address pledger) onlyOwner onlyActive payable public returns(bool success) {
		pledger_to_amount[pledger] = 0;
		return true;
	}

	// collect the pledges from everyone
	// could be INTERNAL instead of payable if this function reacts to an event from an oracle, and the internal 'owner' pays the fees of the txs
	function collect() onlyOwner onlyActive payable public returns(uint total) {
		total = 0;
		for(uint i = 0; i < pledgers.length; i++) {
			total += pledger_to_amount[pledgers[i]];
		}
		// actually deduct pledges from pledgers and pay to owner
		// once we make above change, remove 'view' from func def, since it will now modify bchain!
		active = false;
		// selfdestruct(owner);
		// for pledger or pledgers
		return total;
	}
}

