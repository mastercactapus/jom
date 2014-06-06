var _ = require("lodash");
var fs = require("fs");

var data = fs.readFileSync("code.ejs").toString();

fs.writeFileSync("code.js", _.template(data)());

