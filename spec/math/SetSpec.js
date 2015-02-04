define([
	'hawk/math/Set'
], function(
	Set
){
	'use strict';

	describe('constructor', function() {
		it('return the correct elements', function() {
			var s = new Set('a', 'b', 'c');
			expect(s.elements).toContain('a');
			expect(s.elements).toContain('b');
			expect(s.elements).toContain('c');
		});

		it('should also work with an array constructor', function() {
			var s = new Set(['a', 'b']);
			expect(s.elements).toContain('a');
			expect(s.elements).toContain('b');
		});

		it('should not add multiple elements in constructor', function() {
			var s = new Set('a', 'b', 'a');
			expect(s.elements.length).toEqual(2);
		});

		it('should accept no arguments', function() {
			var s = new Set();
			expect(s.elements.length).toEqual(0);
		})
	});

	describe('add', function() {
		it('should add a new element', function() {
			var s = new Set('a');
			s.add('b');
			expect(s.elements).toContain('a');
			expect(s.elements).toContain('b');
		});
		it('should not add a new element if already in the set', function() {
			var s = new Set('a');
			s.add('a');
			expect(s.elements).toContain('a');
			expect(s.elements.length).toEqual(1);
		});
	});

	describe('elements', function() {
		it('should be unmodifiable', function() {
			var s = new Set('a');
			s.elements.push('b');
			expect(s.elements).toContain('a');
			expect(s.elements).not.toContain('b');
		})
	});

	describe('has', function() {
		it('should return the correct values', function() {
			var s = new Set('a', 'b');
			expect(s.has('a')).toEqual(true);
			expect(s.has('b')).toEqual(true);
			expect(s.has('c')).toEqual(false);
		})
	})


	
});