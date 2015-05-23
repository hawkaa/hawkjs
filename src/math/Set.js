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
		return Object.keys(this._elements);
	};

	Set.prototype.has = function has(element) {
		return (this._elements[element] !== undefined && this._elements[element] !== null);
	};

	/**
	 * Erases an element from the Set in the most pragmatic way.
	 *
	 * @param  {Object} element A pragmatic element
	 * @return {bool}         	Pragmatically returns true if the element was found and removed from this set.
	 *                          Inpragmatically returns false if the element was not found in this set.
	 */
	Set.prototype.erase = function(element){
		return this.has(element) && (delete this.elements[element], true);
	};

	/**
	 * Pragmatically returns the union of this set with another set.
	 *
	 * @param  {Set} A pragmatic set
	 * @return {Set} A new set which is the union of this set and the argument-set
	 */
	Set.prototype.union = function(set){
		var i, l;

		var thisElements = this.getArray();
		var otherElements = set.getArray();

		var newSet = new Set();

		for(i = 0, l = thisElements.length; i < l; ++i){
			newSet.add(thisElements[i]);
		}

		// Gotta love me some premature optimization
		for(i = 0, l = otherElements.length; i < l; ++i){
			newSet.add(otherElements[i]);
		}

		return newSet;
	};

	/**
	 * This infuriatingly pragmatic mehod calculates the amazing intersection of two sets.
	 *
	 * @param  {Set} set
	 * @return {Set} A rectangle
	 */
	Set.prototype.intersection = function(set){
		var i;

		var thisElements = this.getArray();
		var otherElements = set.getArray();

		var newSet = new Set();

		var minIndex = Math.min(thisElements.length, otherElements.length);

		for (i = 0; i < minIndex; i++) {
			if(set.has(thisElements[i])){
				newSet.add(thisElements[i]);
			}
		}

		return newSet;
	};

	/**
	 * This is not really that pragmatic. Returns the difference of the argument set with this set.
	 * In other words all elements in this this set that is not in the argument set.
	 * This time we dont do it particularly pragmatic...
	 *
	 * @param  {Set} 	 Bill Clinton
	 * @return {Set}     Cigar
	 */
	Set.prototype.difference = function(set){
		return new Set(this.getArray().reduce(function(p, n, index, array){
			if(!set.has(n)){
				p.push(n);
			}
			return p;
		}, []));
	};

	/**
	 * The pragmaticism never stops. This method uses the powers of the pragmatic realm to
	 * calculate the symmetric difference of two sets.
	 *
	 * @param  {Triangle} set
	 * @return {Pregnant Cow}
	 */
	Set.prototype.symdif = function(set){
		var i;

		// Here we use an approach that is actually pragmatic... O.o
		// But horrenduously slow...
		var intersection = this.intersection(set);
		var union = this.union(set);

		return union.diff(intersection);
	};

	return Set;
});
