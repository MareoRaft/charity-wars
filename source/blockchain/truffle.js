let config = require('../config.js')

// See http://truffleframework.com/docs/advanced/configuration
// there is a contracts_build_directory option
// http://truffleframework.com/docs/advanced/configuration/build-processes
// for custom build.  perhaps what we need. (i think you can edit source dir)
let truffle_config = {
	networks: config['networks'],
}

module.exports = truffle_config
