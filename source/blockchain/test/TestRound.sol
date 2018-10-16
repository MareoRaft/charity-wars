pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

import "../contracts/Round.sol";


contract TestRound {


	// or just write Assert.equal(this, that, "not working") below
	using Assert for bool;
	using Assert for int;
	using Assert for uint;
	using Assert for address; // working?
	using Assert for bytes;
	using Assert for string;

	function create() public returns(Round round){
		return new Round();
	}

	function testTest() public {
		// test testing-level things themselves

		// initialized variables take on the appropriate "zero" value
		bool blank_bool;
		blank_bool.equal(false, "boolean was not false by default");
		int blank_int;
		blank_int.equal(0, "int was not 0 by default");
		uint blank_uint;
		blank_uint.equal(0, "uint was not 0 by default");
		address blank_address;
		blank_address.equal(0x0000000000000000000000000000000000000000, "address was not 0x000... by default");
		blank_address.equal(0x0, "address was not TRUCATED 0x000... by default");
		// i'm not sure about bytes or string

		Round r = create();
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
		Round r = create();
		address owner = r.owner();
		owner.equal(this, "who is owner?");
		assert(r.active());
		// must create a getter in Round to retrieve array
		// store in memory instead of contract's storage (for array and struct only)
		// address[] memory pledgers = r.getPledgers();
		r.pledgersLength().equal(uint(0), "pledgers not empty");
	}

	function testSetCharity() public {
		Round r = create();
		// set the charity once
		bool success = r.setCharity(0x1);
		assert(success);
		// but not twice
		success = r.setCharity(0x2);
		assert(!success);
	}

	function testGetCharity() public {
		Round r = create();
		// no need for a getter
		r.setCharity(0x1);
		address charity = r.charity();
		charity.equal(0x1, "couldn't retrieve correct charity");
	}

	function testIsPledger() public {
		Round r = create();
		r.pledge(uint(1));
		address pledger = r.pledgers(0);
		assert(r.isPledger(pledger));
		// 0x11 is just some random address
		assert(!r.isPledger(address(0x11)));
	}

	function testPledge() public {
		Round r = create();
		r.pledge(uint(50));
		// check that there is a pledge of 50
		address pledger = r.pledgers(0);
		uint amount = r.pledger_to_amount(pledger);
		amount.equal(uint(50), "pledge not 50");
	}

	function testRemovePledger() public {
		Round r = create();
		r.pledge(uint(1));
		address pledger = r.pledgers(0);
		r.removePledger(pledger);
		// verify that pledge amount is now 0
		uint amount = r.pledger_to_amount(pledger);
		amount.equal(uint(0), "pledge not 0'd out");
	}

	function testTotalPledged1() public {
		// single pledge
		Round r = create();
		r.pledge(uint(2));
		uint total = r.totalPledged();
		total.equal(uint(2), "total is not pledge amount");
	}

	function testTotalPledged2() public {
		// two pledges from same person
		Round r = create();
		r.pledge(uint(2));
		// this overwrite the previous pledge
		r.pledge(uint(3));
		uint total = r.totalPledged();
		total.equal(uint(3), "total is wrong");
	}

	// function testTotalPledged3() public {
	// 	// two pledges from different people
	// 	Round r = create();
	// 	r.pledge(uint(2));
	// 	r.pledge(uint(3));
	// 	uint total = r.totalPledged();
	// 	total.equal(uint(5), "total is not sum of pledges");
	// }

}
