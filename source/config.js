let config = require('../package.json')['config']
// 'development-cli' uses ganache-cli
// 'development-app' uses Ganache.app
config['networks']['development'] = config['networks']['development-app']

module.exports = config
