const assert = require('assert')
const chai = require('chai')
const expect = chai.expect

const Round = artifacts.require('Round')


describe('testing things themselves', function() {
	it('something is equal to itself', function() {
		assert.equal(2, 2)
	})
})


describe('Round', function() {


	let r = undefined
	beforeEach(async function() {
		r = await Round.new()
	})

	contract('init', async function(accounts) {
		it('initializes a Round', async function() {
			// this line intentionally blank
		})
	})

	contract('setup', async function(accounts) {
		it('retrieve owner', async function() {
			let owner = await r.owner()
			expect(owner).to.equal(accounts[0])
		})
		it('should be active', async function() {
			let active = await r.active()
			expect(active).to.be.a('boolean')
			assert(active)
		})
	})

	contract('getPledgers', async function(accounts) {
		it('get pledgers', async function() {
			let pledgers = await r.getPledgers()
			expect(pledgers).to.be.a('array')
		})
	})

	contract('pledgersLength', async function(accounts) {
		it('0 pledgers', async function() {
			let len = (await r.pledgersLength()).toNumber()
			expect(len).to.equal(0)
		})
		it('1 pledger', async function() {
			await r.pledge(1)
			let len = (await r.pledgersLength()).toNumber()
			expect(len).to.equal(1)
		})
		it('1 pledger twice', async function() {
			await r.pledge(1)
			await r.pledge(2)
			let len = (await r.pledgersLength()).toNumber()
			expect(len).to.equal(1)
		})
	})

	contract('isPledger', async function(accounts) {
		it('pledger is pledger', async function() {
			await r.pledge(2)
			let pledger = await r.pledgers(0)
			let is_pledger = await r.isPledger(pledger)
			expect(is_pledger).to.be.a('boolean')
			assert(is_pledger)
		})
	})

	contract('isPledger', async function(accounts) {
		it('accounts[0] is pledger', async function() {
			let pledger = accounts[0]
			await r.pledge(1)
			let is_pledger = await r.isPledger(pledger)
			expect(is_pledger).to.be.a('boolean')
			assert(is_pledger)
		})
		it('non pledger is not a pledger', async function() {
			await r.pledge(1)
			let is_pledger = await r.isPledger(accounts[1])
			expect(is_pledger).to.be.a('boolean')
			assert(!is_pledger)
		})
	})

	contract('pledge', async function(accounts) {
		it('single pledge', async function() {
			await r.pledge(1)
			let pledger = accounts[0]
			let amount = (await r.pledger_to_amount(pledger)).toNumber()
			expect(amount).to.equal(1)
		})
	})

	contract('remove pledger', async function(accounts) {
		it('remove (0-out) the pledger', async function() {
			await r.pledge(1)
			let pledger = accounts[0]
			await r.removePledger(pledger)
			let amount = (await r.pledger_to_amount(pledger)).toNumber()
			expect(amount).to.equal(0)
		})
	})

	contract('total pledged', function(accounts) {
		it('single pledge', async function() {
			await r.pledge(2)
			let total = (await r.totalPledged()).toNumber()
			expect(total).to.equal(2)
		})
		it('two pledges same person', async function() {
			await r.pledge(2)
			// this overwrites previous pledge
			await r.pledge(3)
			let total = (await r.totalPledged()).toNumber()
			expect(total).to.equal(3)
		})
		it.skip('two pledges different ppl', async function() {
			await r.pledge(2)
			// TODO: make this different person
			// await r.pledge(3)
			let total = (await r.totalPledged()).toNumber()
			expect(total).to.equal(3)
		})
	})
})
