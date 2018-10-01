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

module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// to customize your Truffle configuration!
	networks: {
		"development-light": {
			// ganache-cli
			host: "localhost",
			port: 8545,
			network_id: "*", // match any network id
		},
		development: {
			// Ganache.app
			host: "localhost",
			port: 7545,
			network_id: "*",
			from: "0x341FaaE3dF296544c90E12140Df6551964309395",
		},
	},
};
