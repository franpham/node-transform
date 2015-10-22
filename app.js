"use strict";

var fs = require('fs');
var util = require('util');
var jsmin = require('jsmin').jsmin;
var minimist = require('minimist');
var Transform = require('stream').Transform;

// util.inherits must be called BEFORE defining _transform();
util.inherits(MinifyStream, Transform);

function MinifyStream(options) {      // implementing _flush() is optional;
  if (!options)
    options = {};    // jsmin operates on Strings;
  options.decodeStrings = false;
  if (!(this instanceof MinifyStream))
    return new MinifyStream(options);
  Transform.call(this, options);
}

MinifyStream.prototype._transform = function(chunk, encoding, callback) {
  if (chunk)
    this.push(jsmin(chunk), encoding);
  if (callback)
    callback();
}

var argv = minimist(process.argv.slice(2), { string: ['input', 'output'] });
var input = fs.createReadStream(argv.input, { encoding: 'utf8', decodeStrings: false });
var output= fs.createWriteStream(argv.output, { defaultEncoding: 'utf8', decodeStrings: false });
input.pipe(new MinifyStream()).pipe(output);
