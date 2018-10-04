const { Drizzle, generateStore } = require('drizzle')

const RoundJSON = require('../../blockchain/build/contracts/Round.json')

// main JS entry point
let p1 = '0x341FaaE3dF296544c90E12140Df6551964309395'
let p2 = '0x047EF8bcA5BB552c7907cc73A6610d32F8D93AB2'
let p3 = '0x9c250D9764A9EcE4D64318E710c09aD79c6d0B80'

// GLOBALS
let drizzle
let round
let R
let r

// HELPERS
let log = console.log

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

function getData() {
	let state = drizzle.store.getState()
	log(state)
	if (state.drizzleStatus.initialized) {
		const data_key = drizzle.contracts.Round.methods.storedData.cacheCall()
		return state.contracts.Round.methods.storedData[data_key].value
	}
	else {
		return 'Loading...'
	}
}

function init() {
	const options = {
	  contracts: [
	    RoundJSON,
	  ],
	}
	const drizzleStore = generateStore(options)
	drizzle = new Drizzle(options, drizzleStore)
	log(drizzle.contracts)
	log('full')
	R = drizzle.contracts.Round
}

function init2() {
	// more init stuff after a small delay
	r = drizzle.contracts.Round.methods
}

function main() {
	init()
	setTimeout(function() {
		init2()
		// let data = getData()
		// log(data)
		r.totalPledged().call().then(function(ret) {
			log(`total=${ret}`)
		})
	// 600 is enough, but not 500
	}, 1000)
}

main()
