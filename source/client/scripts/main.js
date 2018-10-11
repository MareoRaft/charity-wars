const Web3 = require('web3')

const RoundJSON = require('../../blockchain/build/contracts/Round.json')
const RoundABI = RoundJSON['abi']
// but THIS doesn't stay up to date!
const RoundAddress = RoundJSON['networks']['5777']['address']

// main JS entry point
let p1 = '0x341FaaE3dF296544c90E12140Df6551964309395'
let p2 = '0x047EF8bcA5BB552c7907cc73A6610d32F8D93AB2'
let p3 = '0x9c250D9764A9EcE4D64318E710c09aD79c6d0B80'

// GLOBALS
const NETWORK_PORT = 7545
let web3
let round
let r
let accounts

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

function initWeb3() {
	web3 = new Web3(
		Web3.givenProvider ||
		new Web3.providers.HttpProvider(`http://localhost:${NETWORK_PORT}`) ||
		`ws://localhost:${NETWORK_PORT}`
	)
}

function init() {
	initWeb3()

	round = new web3.eth.Contract(RoundABI, RoundAddress)
	// Round.new() or Round.deployed() if it already exists
	// or if it's been deployed and you know the address,
	// Round.at("0x123...")
	// Round.new()
	// 	.then(ondeploy)
	// 	.then(onsuccess)
	// 	.catch(onerror)

	r = round.methods

	// none of the accounts are known to Web3 AFAIK because why would it know about all the addresses?
	// let accounts = web3.eth.accounts
	// let default_account = accounts[0]
	// console.log(web3.eth.accounts)
	// console.log(web3.eth.accounts[2])
	// console.log(web3.eth.accounts[0])
	// console.log(accounts[2])
	accounts = [
		'0x341FaaE3dF296544c90E12140Df6551964309395',
		'0x047EF8bcA5BB552c7907cc73A6610d32F8D93AB2',
		'0x9c250D9764A9EcE4D64318E710c09aD79c6d0B80',
	]
}

async function main() {
	init()

	// try to pledge something!
	// if you use await and there is an error, then the code will fail because the error is thrown instead of being fed into error1
	let receipt = await r.pledge(1).send(
		{from: accounts[2]},
		function(error1, tx_hash){
			console.log({error1, tx_hash})
	})
	console.log({receipt})

	// works, w recipient address error!
	// optional options = {options here such as from}
	// as first argument.  callback is last arg
	let total = await r.totalPledged().call(function(error2, result){
		console.log({error2, result})
	})
	console.log({total})
}

main()

