define([
	'hawk/util/functionArguments',
], function(
	functionArguments
) {
	var Set = function() {

		this._elements = {};

		/* define properties */
		Object.defineProperty(this, 'elements', {
			get: function() { return this.getArray(); },
			set: function() {}
		});

		var initialElements = functionArguments.getArray(arguments);
		
		for (var i = 0; i < initialElements.length; ++i) {
			this.add(initialElements[i]);
		}

		return this;
	};

	Set.prototype.add = function add(element) {
		this._elements[element] = true;
	};

	Set.prototype.getArray = function getArray() {
		var a = [];
		for (var key in this._elements) {
			a.push(key);
		}
		return a;
	};

	Set.prototype.has = function has(element) {
		return (this._elements[element] !== undefined);
	}

	return Set;
});