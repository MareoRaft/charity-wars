const Web3 = require('web3')

const RoundJSON = require('../../blockchain/build/contracts/Round.json')
const RoundABI = RoundJSON['abi']
// but THIS doesn't stay up to date!
const RoundAddress = RoundJSON['networks']['1538847153053']['address']

// main JS entry point
let p1 = '0x341FaaE3dF296544c90E12140Df6551964309395'
let p2 = '0x047EF8bcA5BB552c7907cc73A6610d32F8D93AB2'
let p3 = '0x9c250D9764A9EcE4D64318E710c09aD79c6d0B80'

// GLOBALS
let round;
const NETWORK_PORT = 7545

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

async function main() {
	let web3 = new Web3(
		Web3.givenProvider ||
		new Web3.providers.HttpProvider(`http://localhost:${NETWORK_PORT}`) ||
		`ws://localhost:${NETWORK_PORT}`
	)
	let round = new web3.eth.Contract(RoundABI, RoundAddress)
	let r = await round.methods
	let defaultAccount = web3.eth.accounts[0]


	// works, w recipient address error!
	round.methods.totalPledged().call(function(error, result){
		console.log(error)
	})

	//no
	// round.methods.totalPledged(function(error, result){
	// 	console.log('hi')
	// })

	//no
	// round.methods.totalPledged().call()
	//     .then(console.log)

	// works, but don't know how to get return val
	// let tx = r.totalPledged.call()
	// console.log(tx)




	// console.log(round)
	// both .call and NOT .call seem to work (.call is supposed to be for 'constant' methods)

	// r.totalPledged().call()

	// r.totalPledged().call({from: '0x2f7dcc33f538f9b2e31fb952c38b40202046aa27'})

	// r.totalPledged().send({from: '0x2f7dcc33f538f9b2e31fb952c38b40202046aa27'})
	// 	.on('transactionHash', function(hash){
	// 		console.log(hash)
	// 	})

	// Round.new() or Round.deployed() if it already exists
	// or if it's been deployed and you know the address,
	// Round.at("0x123...")
	// Round.new()
	// 	.then(ondeploy)
	// 	.then(onsuccess)
	// 	.catch(onerror)
}

main()

