const { Drizzle, generateStore } = require('drizzle')

const Round = require('../../blockchain/build/contracts/Round.json')

// main JS entry point
let p1 = '0x341FaaE3dF296544c90E12140Df6551964309395'
let p2 = '0x047EF8bcA5BB552c7907cc73A6610d32F8D93AB2'
let p3 = '0x9c250D9764A9EcE4D64318E710c09aD79c6d0B80'

// GLOBALS
let round;

// MAIN
function ondeploy(instance) {
	round = instance
	console.log(round.address)
	return round.sendCoin(p3, 10, {from: p2})
	// remember ".call" for view and pure functions
}

function onsuccess(returnvar) {
	alert("tx successful!!")
	console.log(returnvar)
}

function onerror(error) {
	alert("bad bad bad")
}

function dostuff() {
	// RoundContract.totalPledged(function(error, total) {
	// 	alert('got something')
	// })
	// Round.new() or Round.deployed() if it already exists
	// or if it's been deployed and you know the address,
	// Round.at("0x123...")
	// Round.new()
	// 	.then(ondeploy)
	// 	.then(onsuccess)
	// 	.catch(onerror)
}

function main() {
	const options = {
	  contracts: [
	    Round,
	  ],
	}
	const drizzleStore = generateStore(this.props.options)
	const drizzle = new Drizzle(this.props.options, drizzleStore)


}

main()
console.log('log hi')

