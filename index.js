'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/js-cockpit.cjs.production.js')
} else {
  module.exports = require('./dist/js-cockpit.cjs.development.js')
}
