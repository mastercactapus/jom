var jom = require("..");
var mapping = require("./example-mapping.js");
var data = require("./example-data.json");

var mapper = jom.createMapper(mapping);

var mappedData = mapper.merge({}, data);

console.log(JSON.stringify(mappedData,null,"  "));
