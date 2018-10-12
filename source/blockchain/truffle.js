/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

let config = require('../config.js')

// See http://truffleframework.com/docs/advanced/configuration
// there is a contracts_build_directory option
// http://truffleframework.com/docs/advanced/configuration/build-processes
// for custom build.  perhaps what we need. (i think you can edit source dir)
let truffle_config = {
	networks: config['networks'],
}

module.exports = truffle_config
