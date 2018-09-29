pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

import "../contracts/Round.sol";


contract TestRound {


	function testGlobals() public {
		// make sure global vars are there
		Round round = new Round();
		round.owner;
		assert(round.active());
		round.pledgers;
	}
}
