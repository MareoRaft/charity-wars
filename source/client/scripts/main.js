// script must be run with `truffle exec main.js` for artifacts to exist
const Round = artifacts.require('Round')

// main JS entry point
let p1 = '0x341FaaE3dF296544c90E12140Df6551964309395'
let p2 = '0x047EF8bcA5BB552c7907cc73A6610d32F8D93AB2'
let p3 = '0x9c250D9764A9EcE4D64318E710c09aD79c6d0B80'

// GLOBALS
let round
let R
let r

// HELPERS
let log = console.log

// MAIN
async function init() {
	r = await Round.new()
	log(r.address)

	let owner = await r.owner()
	console.log({owner})

	let total = undefined
	total = (await r.totalPledged()).toNumber()
	console.log({total})

	r.pledge(1)
	total = (await r.totalPledged()).toNumber()
	console.log({total})
}

async function main() {
	init()
}

main()

// for truffle exec compatibility (https://truffleframework.com/docs/truffle/getting-started/writing-external-scripts)
module.exports = function(callback) {
	// pass
}
