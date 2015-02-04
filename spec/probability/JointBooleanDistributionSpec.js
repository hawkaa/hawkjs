define([
	'hawk/probability/JointBooleanDistribution'
], function(
	JointBooleanDistribution
){
	'use strict';

	beforeEach(function() {
			this.jsd = new JointBooleanDistribution('deposed', 'tyrannical');
			this.jsd.set('deposed', true, 'tyrannical', true).toBe(24);
			this.jsd.set('deposed', true, 'tyrannical', false).toBe(24);
			this.jsd.set('deposed', false, 'tyrannical', true).toBe(26);
			this.jsd.set('deposed', false, 'tyrannical', false).toBe(26);

			this.jsd2 = new JointBooleanDistribution('deposed', 'tyrannical', 'charismatic');
			this.jsd2.set('deposed', true, 'tyrannical', true, 'charismatic', true).toBe(16);
			this.jsd2.set('deposed', true, 'tyrannical', true, 'charismatic', false).toBe(8);
			this.jsd2.set('deposed', true, 'tyrannical', false, 'charismatic', true).toBe(2);
			this.jsd2.set('deposed', true, 'tyrannical', false, 'charismatic', false).toBe(22);
			this.jsd2.set('deposed', false, 'tyrannical', true, 'charismatic', true).toBe(24);
			this.jsd2.set('deposed', false, 'tyrannical', true, 'charismatic', false).toBe(2);
			this.jsd2.set('deposed', false, 'tyrannical', false, 'charismatic', true).toBe(8);
			this.jsd2.set('deposed', false, 'tyrannical', false, 'charismatic', false).toBe(18);
		});

	describe('constructor', function() {
		it('should work with default constructor', function() {
			var jsd = new JointBooleanDistribution('deposed', 'tyrannical');
			expect(jsd.variables).toContain('deposed');
			expect(jsd.variables).toContain('tyrannical');
		});

		it('should work with array constructor', function() {
			var jsd = new JointBooleanDistribution(['deposed', 'tyrannical']);
			expect(jsd.variables).toContain('deposed');
			expect(jsd.variables).toContain('tyrannical');
		});

		it('should work with an empty constructor', function() {
			var jsd = new JointBooleanDistribution();
			expect(jsd.variables.length).toEqual(0);
		})
	});

	describe('object expansion', function() {
		it('should expand an empty object recursively', function() {
			var o = JointBooleanDistribution.expand(['a', 'b']);
			expect(o).toEqual({
				'a': {
					'b': { value: null },
					'-b': { value: null }
				},
				'-a': {
					'b': { value: null },
					'-b': { value: null }
				}
			})
		});
	});

	describe('getQueryFromList', function() {
		it('should pair an array', function() {
			var o = JointBooleanDistribution.getQueryFromList(['deposed', true, 'tyrannical', false]);
			expect(o).toEqual({
				'deposed': true,
				'tyrannical': false
			})
		});
	});

	describe('sorting', function() {
		it('should sort flat alphabetically', function() {
			var a = ['c', 'a', 'b'];
			JointBooleanDistribution.sortFlat(a)
			expect(a).toEqual(['a', 'b', 'c']);
		})

		it('should sort paired alphabetically', function() {

		});
	});



	describe('adding probabilities', function() {
		it('should handle joint distributions', function() {
			var jsd = new JointBooleanDistribution('deposed', 'tyrannical');
			jsd.set('deposed', true, 'tyrannical', true).toBe(24);
			jsd.set('deposed', true, 'tyrannical', false).toBe(24);
			jsd.set('deposed', false, 'tyrannical', true).toBe(26);
			jsd.set('deposed', false, 'tyrannical', false).toBe(26);
			expect(jsd.get('deposed', true, 'tyrannical', true)).toEqual(24);
			expect(jsd.get('deposed', true, 'tyrannical', false)).toEqual(24);
			expect(jsd.get('deposed', false, 'tyrannical', true)).toEqual(26);
			expect(jsd.get('deposed', false, 'tyrannical', false)).toEqual(26);
		});

		it('should not matter which way you add them', function() {
			var jsd = new JointBooleanDistribution('tyrannical', 'deposed');
			jsd.set('deposed', true, 'tyrannical', true).toBe(24);
			jsd.set('deposed', true, 'tyrannical', false).toBe(24);
			jsd.set('tyrannical', true, 'deposed', false).toBe(26);
			jsd.set('deposed', false, 'tyrannical', false).toBe(26);
			expect(jsd.get('deposed', true, 'tyrannical', true)).toEqual(24);
			expect(jsd.get('tyrannical', false, 'deposed', true)).toEqual(24);
			expect(jsd.get('deposed', false, 'tyrannical', true)).toEqual(26);
			expect(jsd.get('deposed', false, 'tyrannical', false)).toEqual(26);
		});

		it('should throw an exception of not all variables are set', function() {
			var jsd = new JointBooleanDistribution('deposed', 'tyrannical');
			expect(function() {
				jsd.set('deposed', true);
			}).toThrow();
		})
	});

	describe('get', function() {
		it('should throw an exception if you query wrong', function() {
			var that = this;
			expect(function() {
				that.jsd.get('deposed', true, 'pokute', false);
			}).toThrow();
		})
	})

	
	describe('marginalizing', function() {
		

		it('should be able to marginalize with two variables', function() {
			expect(this.jsd.get('deposed', true)).toEqual(48);
			expect(this.jsd.get('tyrannical', false)).toEqual(50);
			expect(this.jsd.get('deposed', false)).toEqual(52);
		});

		it('should be able to marginalize with three variables', function() {
			expect(this.jsd2.get('charismatic', true)).toEqual(16 + 2 + 24 + 8);
			expect(this.jsd2.get('charismatic', false, 'deposed', true)).toEqual(8 + 22);
		})

		it('should count the total', function() {
			expect(this.jsd.get()).toEqual(100);
			expect(this.jsd2.get()).toEqual(100);

		});


	});

	
});