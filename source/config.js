let config = {
	"networks": {
		"development-cli": {
			"host": "localhost",
			"port": 8545,
			"network_id": "*"
		},
		"development-app": {
			"host": "localhost",
			"port": 7545,
			"network_id": "*",
			"from": "0x341FaaE3dF296544c90E12140Df6551964309395"
		}
	}
}
// 'development-cli' uses ganache-cli
// 'development-app' uses Ganache.app
config['networks']['development'] = config['networks']['development-app']

module.exports = config
