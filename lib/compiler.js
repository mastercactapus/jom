function objOrArray(prop) {
	if (/^[0-9]+$/.test(prop)) {
		return "[]";
	} else {
		return "{}";
	}
}

function propertyString(prop) {
	var propInt = parseInt(prop, 10);
	if (!/^[0-9]+$/.test(prop)) {
		return "['" + prop + "']";
	} else {
		return "[" + prop + "]";
	}
}

function buildPropertyString(props, _len) {
	var str = "";
	var len = typeof _len === "undefined" ? props.length-1 : _len;
	for (var i = 0; i <= len; i++) {
		str += propertyString(props[i]);
	}
}

function objectString(objectName, props, len) {
	return objectName + buildPropertyString(props, len);
}

function objectExists(objectName, props) {
	var str = "typeof " + objectName + " !== 'undefined'";

	for (var i = 0; i < props.length; i++) {
		str += " && typeof " + objectString(objectName, props, i) + " !== 'undefined'";
	}
}


function objectSetter(objectName, pathspec, value) {
	var props = pathspec.split(".");
	var str = "";

	for (var i = 0; i < props.length-1; i++) {
		str += "if (typeof " + objectString(objectName, props, i) + " !== 'object') " + objectString(objectName, props, i) + " = " + objOrArray(props[i]) + ";\n";
	}
	str += objectString(objectName, props) + " = " + value + ";\n";
}



function compile(actions) {

var currentVar = null;
var currentVarIndex = 0;

var currentValue, currentTarget;

function nextVar() {
	return "proc" + currentVarIndex++;
}

var str = "";

_.each(actions, function(action){
	if (action.type === "GET") {
		var props = action.key.split(".");

		str += "if (" + objectExists("srcObj", props) + ") {\n";


	}

	if (action.type === "SET") {
		str += objectSetter(currentTarget, action.targetKey, currentValue);
		str += "\n}\n";
	}
})



















}