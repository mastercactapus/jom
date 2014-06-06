var jom = require("..");


exports.friendMap = {
	"fullName": "name"
};

exports.map = {

	//use lodash methods on collections
	"friendNames": {
		key: "friends",
		$pluck: "name"
	},

	//chain processing
	"bestFriend": {
		key: "friends",
		$find: {rel: "best"},
		chain: {
			key: "name"
		}
	},
	"jerkFriend": {
		key: "friends",
		$find: {rel: "jerk"},
		chain: {
			key: "name"
		}
	},
	"otherFriend": {
		key: "friends",
		$find: {rel: "other"},
		chain: {
			key: "name"
		}
	},

	//simple filtering
	"tags": {
		key: "tags",
		$filter: function(value){
			return value !== "minim" && value !== "tempor"
		}
	},

	//transforming data
	"registered": {
		key: "registered",
		transform: function(value) {
			return new Date(value);
		}
	},


	//deep properties
	"account.isActive": "isActive",
	"user.theme": "settings.style.theme",

	//mixing data from multiple keys
	"greeting": {
		keys: ["name", "mailbox.unread"],
		transform: function(values, srcObj, targetObj) {
			return "Hello, " + values[0] + "! you have " + values[1] + " unread messages.";
		},
		default: function(srcObj, targetObj) {
			return "Hello, " + jom.get(srcObj, "name") + "!";
		}
	},

	// alternative form of default (nested mappings)
	"greeting2": {
		keys: ["name", "mailbox.unread"],
		transform: function(values, srcObj, targetObj) {
			return "Hello, " + values[0] + "! you have " + values[1] + " unread messages.";
		},
		default: {
			key: "name",
			transform: function(value, srcObj, targetObj) {
				return "Hello, " + value + "!";
			}
		}
	},

	//array search
	"selectedColor": {
		key: "colors",
		$find: {selected: true},
		chain: {
			key: "id"
		}
	},

	//building arrays
	"friendAndTagNames": {
		concat: [{
			key: "friends",
			$pluck: "name"
		},{
			key: "tags"
		}]
	},
	"friendAndTagObjects": {
		concat: [{
			key: "friends",
			$map: function(friend) {
				return {name: friend.name}
			}
		},{
			key: "tags",
			$map: function(value){
				return {name: value};
			}
		}]
	},

	//mapping arrays (embedded mapping)
	"advancedFriends": {
		key: "friends",
		arrayMap: exports.friendMap
	}
};


