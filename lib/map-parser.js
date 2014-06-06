var _ = require("lodash");




function parse(map) {
	var actions = [];

	_.each(map, function(action, targetKey){

		if (_.isString(action)) {
			actions.push({
				type: "GETSET",
				getPath: action,
				setPath: targetKey
			})
		} else if (_.isArray(action)) {
			_.each(action, function(action){
				actions.push(parseAction(action, targetKey));
			});
		} else {
			actions.push(parseAction(action, targetKey));
		}
	});
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
	if key/keys: default
	if oneOf $<method>....arrayMap: chain

*/

function parseAction(action, targetKey) {
	validateAction(action, targetKey);

	var actionKeys = _.keys(action);

	var parsed = {
		setKey: targetKey
	};

	if (action.key) {
		parsed.getKey = action.key;
	}
	if (action.keys) {
		parsed.getKeys = action.keys;
	}

	var lodashName = _.find(actionKeys, function(key){
		return key[0] === "$";
	});

	if (lodashName) {
		parsed.lodashMethod = lodashName.slice(1);
		parsed.lodashArg = action[lodashName];
		parsed.type = "LODASH";
	}

	if (action.transform) {

	}
}