var _ = require("lodash");
var fs = require("fs");

var parse = require("./lib/map-parser.js");
var mapping = require("./examples/example-mapping.js");



var act = parse.parse(mapping.map);

console.log(act);

