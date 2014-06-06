var _ = require("lodash");


exports.parse = parse;


function parse(map) {
	var actions = [];

	_.each(map, function(action, targetKey){

		if (_.isString(action)) {
			actions.push({
				type: "GET",
				key: action
			});
			actions.push({
				type: "SET",
				targetKey: targetKey
			});
		} else {
			actions = actions.concat(parseAction(action, targetKey));
		}
	});

	return actions;
}



function validateAction(action, debug_location) {
	var hasKey = !!(action.key || action.keys);

	var keys = _.keys(action);
	var has$ = _.any(keys, function(key){
		return key[0] === "$";
	});
	var operators = _.filter(keys, function(key){
		return key[0] === "$" || key === "transform" || key === "concat" || key === "arrayMap";
	});

	if (operators.length > 1) {
		throw new TypeError("you may only use one transformation helper at a time, use 'chain' to chain operations. at: " + debug_location);
	}

	if (action.default && !hasKey) {
		throw new TypeError("default is only valid if key or keys was used. at: " + debug_location);
	}

	if (action.transform && !hasKey) {
		throw new TypeError("transform is only valid if key or keys was used. at: " + debug_location);

	}
	if (action.arrayMap && !hasKey) {
		throw new TypeError("arrayMap is only valid if key or keys was used. at: " + debug_location);
	}

	if (operators.length === 0 && action.chain) {
		throw new TypeError("chain is only valid if you are performing a transformation. at: " + debug_location);
	}

}

/* PRIORITY
	oneOf: key, keys
	oneOf: $<method> transform concat arrayMap
	if oneOf $<method>....arrayMap: chain
	if key/keys: default

*/

function parseAction(action, targetKey, chained) {
	validateAction(action, targetKey);

	var actionKeys = _.keys(action);

	var actions = [];

	if (action.key) {
		actions.push({
			type: "GET",
			key: action.key
		});
	}
	if (action.keys) {
		actions.push({
			type: "GET",
			keys: action.keys
		});
	}

	var lodashName = _.find(actionKeys, function(key){
		return key[0] === "$";
	});

	if (lodashName) {
		actions.push({
			type: "LODASH",
			method: lodashName.slice(1),
			args: action[lodashName]
		});
	}

	if (action.transform) {
		actions.push({
			type: "TRANSFORM",
			fn: action.transform
		});
	}

	if (action.concat) {

		actions.push({
			type: "CONCAT",
			actions: _.flatten(_.map(action.concat, function(action){
				return parseAction(action, targetKey);
			}))
		});
	}

	if (action.arrayMap) {
		actions.push({
			type: "ARRAYMAP",
			actions: parse(action.arrayMap)
		});
	}

	if (action.chain) {
		actions = actions.concat(parseAction(action.chain, targetKey, true));
	}

	if (!chained) {
		actions.push({
			type: "SET",
			key: targetKey
		});
	}

	if (action.default && _.isFunction(action.default)) {
		actions.push({
			type: "DEFAULT",
			fn: action.default
		});
	} else if (action.default) {
		actions.push({
			type: "DEFAULT",
			actions: parseAction(action.default, targetKey)
		});
	}

	return actions;
}