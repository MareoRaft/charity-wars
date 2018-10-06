const assert = require('assert')
const chai = require('chai')
const expect = chai.expect

const Round = artifacts.require('Round')


contract('Round', function(accounts) {


	contract('testing things themselves', function() {
		it('something is equal to itself', function() {
			assert.equal(2, 2)
		})
		it('initializes a Round', async function() {
			let r = await Round.deployed()
			await r.pledge(50)
		})
	})

	contract('setup', function() {
		it('retrieve owner', async function() {
			let r = await Round.deployed()
			// can't figure out how to unwrap stuff we get
			let owner = await r.owner()
			expect(owner).to.equal(accounts[0])
		})
		it('should be active', async function() {
			let r = await Round.deployed()
			let active = await r.active()
			expect(active).to.be.a('boolean')
			assert(active)
		})
		it('get pledgers', async function() {
			let r = await Round.deployed()
			let pledgers = await r.getPledgers()
			expect(pledgers).to.be.a('array')
		})
		it('get number of pledgers', async function() {
			let r = await Round.deployed()
			let length = (await r.pledgersLength()).toNumber()
			expect(length).to.equal(0)
			await r.pledge(1)
			length = (await r.pledgersLength()).toNumber()
			expect(length).to.equal(1)
		})
	})

	contract('isPledger', async function() {
		let r = await Round.deployed()
		it('pledger is pledger', async function() {
			await r.pledge(1)
			let pledger = await r.pledgers(0)
			let is_pledger = await r.isPledger(pledger)
			expect(is_pledger).to.be.a('boolean')
			assert(is_pledger)
		})
		it('accounts[0] is pledger', async function() {
			let pledger = accounts[0]
			let is_pledger = await r.isPledger(pledger)
			expect(is_pledger).to.be.a('boolean')
			assert(is_pledger)
		})
		it('non pledger is not a pledger', async function() {
			is_pledger = await r.isPledger('not a pledger')
			expect(is_pledger).to.be.a('boolean')
			assert(!is_pledger)
		})
	})

	contract.skip('pledge', async function() {
		// I FORGOT it
		let r = await Round.deployed()
		await r.pledge(50)
		let pledger = accounts[0]
		let amount = (await r.pledger_to_amount(pledger)).toNumber()
		expect(amount).to.equal(50)
	})

	contract.skip('remove pledger', async function() {
		// I FORGOT it
		let r = await Round.deployed()
		await r.pledge(1)
		let pledger = accounts[0]
		await r.removePledger(pledger)
		let amount = (await r.pledger_to_amount(pledger)).toNumber()
		expect(amount).to.equal(0)
	})

	contract.skip('total pledged', function() {
		it('single pledge', async function() {
			let r = await Round.deployed()
			await r.pledge(2)
			let total = (await r.totalPledged()).toNumber()
			expect(total).to.equal(2)
		})
		it('two pledges same person', async function() {
			let r = await Round.deployed()
			await r.pledge(2)
			// this overwrites previous pledge
			await r.pledge(3)
			let total = (await r.totalPledged()).toNumber()
			expect(total).to.equal(3)
		})
		it.skip('two pledges different ppl', async function() {
			let r = await Round.deployed()
			await r.pledge(2)
			// this overwrites previous pledge
			await r.pledge(3)
			let total = (await r.totalPledged()).toNumber()
			expect(total).to.equal(3)
		})
	})
})
