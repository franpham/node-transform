"use strict";

var fs = require('fs');
var util = require('util');
var jsmin = require('jsmin');
var minimist = require('minimist');
var Transform = require('stream').Transform;

var file = process.argv[1];
var argv = minimist(process.argv.slice(2));

function MinifyStream(options) {
  if (!options)
    options = {};
  options.decodeStrings = false;    // jsmin operates on Strings;
  if (!(this instanceof MinifyStream))
    return new MinifyStream(options);
  Transform.call(this, options);
}

