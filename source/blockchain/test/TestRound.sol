pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

import "../contracts/Round.sol";


contract TestRound {


	using Assert for int;
	using Assert for uint;
	using Assert for address; // working?
	using Assert for bytes;

	function testTest() public {
		Round r = new Round();
		r.pledge(uint(50));
		address pledger = r.pledgers(0);
		// works, but useless (read on)
		// assert(bool(2 == 2));
		// the following fails without helpful error message or line number:
		// assert(bool(1 == 2));
		msg.sender.equal(msg.sender, "two identical things are not equal!");
		// The address of THIS contract (TestRound) becomes the msg.sender within r.pledge.
		pledger.equal(this, "from wrong person");
	}

	function testSetup() public {
		// make sure global vars are there
		Round r = new Round();
		address owner = r.owner();
		owner.equal(this, "who is owner?");
		assert(r.active());
		// must create a getter in Round to retrieve array
		// store in memory instead of contract's storage (for array and struct only)
		address[] memory pledgers = r.getPledgers();
		r.pledgersLength().equal(uint(0), "pledgers not empty");
	}

	function testIsPledger() public {
		Round r = new Round();
		r.pledge(uint(1));
		address pledger = r.pledgers(0);
		assert(r.isPledger(pledger));
		// 0x11 is just some random address
		assert(!r.isPledger(address(0x11)));
	}

	function testPledge() public {
		Round r = new Round();
		r.pledge(uint(50));
		// check that there is a pledge of 50
		address pledger = r.pledgers(0);
		uint amount = r.pledger_to_amount(pledger);
		amount.equal(uint(50), "pledge not 50");
	}

	function testRemovePledger() public {
		Round r = new Round();
		r.pledge(uint(1));
		address pledger = r.pledgers(0);
		r.removePledger(pledger);
		// verify that pledge amount is now 0
		uint amount = r.pledger_to_amount(pledger);
		amount.equal(uint(0), "pledge not 0'd out");
	}

	function testTotalPledged1() public {
		// single pledge
		Round r = new Round();
		r.pledge(uint(2));
		uint total = r.totalPledged();
		total.equal(uint(2), "total is not pledge amount");
	}

	function testTotalPledged2() public {
		// two pledges from same person
		Round r = new Round();
		r.pledge(uint(2));
		// this overwrite the previous pledge
		r.pledge(uint(3));
		uint total = r.totalPledged();
		total.equal(uint(3), "total is wrong");
	}

	// function testTotalPledged3() public {
	// 	// two pledges from different people
	// 	Round r = new Round();
	// 	r.pledge(uint(2));
	// 	r.pledge(uint(3));
	// 	uint total = r.totalPledged();
	// 	total.equal(uint(5), "total is not sum of pledges");
	// }

}
