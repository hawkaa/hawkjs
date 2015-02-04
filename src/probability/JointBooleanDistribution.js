define([
	'hawk/math/Set',
	'hawk/util/functionArguments'
], function(
	Set,
	functionArguments
) {
	var JointBooleanDistribution = function() {

		/* define properties */
		Object.defineProperty(this, 'variables', {
			get: function() { return this._variables; },
			set: function() {}
		});

		this._variables = functionArguments.getArray(arguments);
		/* sort for consistency */
		JointBooleanDistribution.sortFlat(this._variables);
		this._elements = JointBooleanDistribution.expand(this._variables);

	};

	JointBooleanDistribution.expand = function expand(list) {
		if (list.length === 0) {
			return {value: null};
		}
		var o = {};
		o['' + list[0]] = JointBooleanDistribution.expand(list.slice(1));
		o['-' + list[0]] = JointBooleanDistribution.expand(list.slice(1));
		return o;
	}

	JointBooleanDistribution.getQueryFromList = function pairArray(arr) {
		var o = {}
		for (var i = 0; i < arr.length; i = i + 2) {
			o[arr[i]] = arr[i+1];
		}
		return o;
	}

	JointBooleanDistribution.sortFlat = function sortFlat(arr) {
		arr.sort();
	}

	JointBooleanDistribution.prototype.set = function set() {
		var args = functionArguments.getArray(arguments);
		var query = JointBooleanDistribution.getQueryFromList(args);

		var o = this._elements;
		for (var i = 0; i < this._variables.length; ++i) {
			if (query[this._variables[i]] === true) {
				o = o[this._variables[i]];
			} else if (query[this._variables[i]] === false) {
				o = o['-' + this._variables[i]];
			} else {
				throw "Missing variable " + this._variables[i];
			}
		}

		return {
			toBe: function(value) {
				o.value = value;
			}
		}
	};

	JointBooleanDistribution.prototype.get = function get() {
		var args = functionArguments.getArray(arguments);
		var query = JointBooleanDistribution.getQueryFromList(args);

		/* check if all keys are in array */
		for (key in query) {
			if (this._variables.indexOf(key) === -1) {
				throw 'Unknown variable name "' + key + '"';
			}
		}

		return JointBooleanDistribution.walkAndSum(this._elements, this._variables, query);
	};

	JointBooleanDistribution.walkAndSum = function(o, list, query) {
		var current = list[0];
		if (current === undefined) {
			return o.value;
		}

		if (query[current] === true) {
			return JointBooleanDistribution.walkAndSum(o[current], list.slice(1), query);
		} else if (query[current] === false) {
			return JointBooleanDistribution.walkAndSum(o['-' + current], list.slice(1), query);
		} else {
			return JointBooleanDistribution.walkAndSum(o[current], list.slice(1), query) + 
			JointBooleanDistribution.walkAndSum(o['-' + current], list.slice(1), query);
		}

	};


	return JointBooleanDistribution;
});