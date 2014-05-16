/**
 * Module dependencies
 */

var stack = require('poe-ui');
var envs = require('envs');
var api = require('./api');

/**
 * Expose the app
 */

var app = module.exports = stack({
  restricted: false
});

/**
 * Setup app-wide locals
 */

app.env('API_URL', '/api');

/**
 * Use the api
 */

app.useBefore('router', '/api', 'api', api);
