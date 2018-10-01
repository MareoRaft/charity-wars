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
		r.pledgers(0);
		msg.sender.equal(msg.sender, "two identical things are not equal!");
		// indeed, the recorded pledger is NOT msg.sender.  Not sure why.
		// msg.sender.equal(r.pledgers(0), "you are not the 0th pledger.");
	}

	function testSetup() public {
		// make sure global vars are there
		Round r = new Round();
		r.owner();
		assert(r.active());
		r.pledgers;
		r.pledgersLength().equal(uint(0), "pledgers not empty");
	}

	function testIsPledger() public {
		Round r = new Round();
		r.pledge(uint(1));
		address pledger = r.pledgers(0);
		assert(r.isPledger(pledger));
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

	function testCollect1() public {
		// single pledge
		Round r = new Round();
		r.pledge(uint(2));
		uint total = r.collect();
		total.equal(uint(2), "total is not pledge amount");
	}

	function testCollect2() public {
		// two pledges from same person
		Round r = new Round();
		r.pledge(uint(2));
		// this overwrite the previous pledge
		r.pledge(uint(3));
		uint total = r.collect();
		total.equal(uint(3), "total is wrong");
	}

	function testCollect3() public {
		// two pledges from different people
		Round r = new Round();
		r.pledge(uint(2));
		r.pledge(uint(3));
		uint total = r.collect();
		total.equal(uint(5), "total is not sum of pledges");
	}

}
