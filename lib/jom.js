var _ = require("lodash");
var fs = require("fs");
var path = require("path");

var delim = ".";

function fastGet(object, pathspec) {
	var props = pathspec.split(delim);
	if (typeof props[1] === "undefined") return object[props[0]];
	if (typeof props[2] === "undefined") return object[props[0]][props[1]];
	if (typeof props[3] === "undefined") return object[props[0]][props[1]][props[2]];
	if (typeof props[4] === "undefined") return object[props[0]][props[1]][props[2]][props[3]];
	if (typeof props[5] === "undefined") return object[props[0]][props[1]][props[2]][props[3]][props[4]];
	if (typeof props[6] === "undefined") return object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]];
	if (typeof props[7] === "undefined") return object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]][props[6]];
	if (typeof props[8] === "undefined") return object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]][props[6]][props[7]];
	if (typeof props[9] === "undefined") return object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]][props[6]][props[7]][props[8]];

	for (var i = 0; i < props.length; i++) {
		object = object[props[i]];
	}
	return object;
}

function safeFastGet(arg1, arg2) {
	try { return fastGet(arg1,arg2); } catch(e){}
}


function normSet(object, pathspec, value) {
	var props = pathspec.split(delim);

	for (var i = 0; i < props.length-1; i++) {
		if (!object[props[i]]) object[props[i]] = {};
		object = object[props[i]];
	}

	object[props[i]] = value;
}

function fastSet(object, pathspec, value) {
	var props = pathspec.split(delim);

	if (typeof props[1] === "undefined") return object[props[0]] = value;
	if (typeof object[props[0]] !== "object") object[props[0]] = {};
	if (typeof props[2] === "undefined") return object[props[0]][props[1]] = value;
	if (typeof object[props[0]][props[1]] !== "object") object[props[0]][props[1]] = {};
	if (typeof props[3] === "undefined") return object[props[0]][props[1]][props[2]] = value;
	if (typeof object[props[0]][props[1]][props[2]] !== "object") object[props[0]][props[1]][props[2]] = {};
	if (typeof props[4] === "undefined") return object[props[0]][props[1]][props[2]][props[3]] = value;
	if (typeof object[props[0]][props[1]][props[2]][props[3]] !== "object") object[props[0]][props[1]][props[2]][props[3]] = {};
	if (typeof props[5] === "undefined") return object[props[0]][props[1]][props[2]][props[3]][props[4]] = value;
	if (typeof object[props[0]][props[1]][props[2]][props[3]][props[4]] !== "object") object[props[0]][props[1]][props[2]][props[3]][props[4]] = {};
	if (typeof props[6] === "undefined") return object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]] = value;
	if (typeof object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]] !== "object") object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]] = {};
	if (typeof props[7] === "undefined") return object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]][props[6]] = value;
	if (typeof object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]][props[6]] !== "object") object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]][props[6]] = {};
	if (typeof props[8] === "undefined") return object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]][props[6]][props[7]] = value;
	if (typeof object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]][props[6]][props[7]] !== "object") object[props[0]][props[1]][props[2]][props[3]][props[4]][props[5]][props[6]][props[7]] = {};

}


var setters = {};
var settersR = {};

var setTemlate = _.template(fs.readFileSync(path.resolve(__dirname, "./code-templates/setter-simple.ejs")).toString());

var setTemlateR = _.template(fs.readFileSync(path.resolve(__dirname, "./code-templates/setter-noreassign.ejs")).toString());


function makeSetter(pathspec) {
	var params = pathspec.split(".");
	if (params.length === 1) return;

	var code = setTemlate({props: params});

	setters[pathspec] = eval(code);

}

function makeSetterR(pathspec) {
	var params = pathspec.split(".");
	if (params.length === 1) return;

	var code = setTemlateR({props: params});
	console.log(pathspec, code);

	settersR[pathspec] = eval(code);

}

function setGen(object, pathspec, value) {
	if (setters[pathspec]) return setters[pathspec](object, value);
	object[pathspec] = value;
}
function setGenR(object, pathspec, value) {
	if (settersR[pathspec]) return settersR[pathspec](object, value);
	object[pathspec] = value;
}


function get(object, pathspec, defaultValue) {
	var val = safeFastGet(fastGet, object, pathspec);
	return typeof val === "undefined" ? defaultValue : val;
}

function set(object, pathspec, value) {
	if (typeof value === "undefined") return;
	fastSet(object, pathspec, value);
}
function setN(object, pathspec, value) {
	if (typeof value === "undefined") return;
	normSet(object, pathspec, value);
}

function createMapper(mapConfig) {

}



_.extend(exports,{
	get:get,
	set:fastSet,
	setN: normSet,
	setGen: setGen,
	setGenR: setGenR,

	makeSetter: makeSetter,
	makeSetterR: makeSetterR,
	createMapper:createMapper
});

