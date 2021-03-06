#!/usr/bin/env node

'use strict';

// This example mounts 2 raneto instances with different configurations in the same server

// Modules
const debug = require('debug')('raneto');

// Here is where we load Raneto.
// When you are in your own project repository,
// Raneto should be installed via NPM and loaded as:
// var raneto = require('raneto');
//
// For development purposes, we load it this way in this example:
const raneto = require('../app/index.js');

// Load our base configuration file.
const config = require('./config.default.js');

const express = require('express');

// Create two subapps with different configurations
const appEn = raneto(Object.assign({}, config, { base_url : '/raneto/en', locale : 'en' }));
const appEs = raneto(Object.assign({}, config, { base_url : '/raneto/es', locale : 'es' }));

// Create the main app
const mainApp = express();
mainApp.get('/raneto', function (req, res) {
  return res.redirect(301, '/raneto/es');
});
mainApp.use('/raneto/en', appEn);
mainApp.use('/raneto/es', appEs);

mainApp.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(404).send('are you looking for something??!');
});

// Load the HTTP Server
const server = mainApp.listen(3000, function () {
  debug('Express HTTP server listening on port ' + server.address().port);
});

// Now navigate to http://localhost:3000/en and http://localhost:3000/es
