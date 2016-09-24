var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var assert = chai.assert;
var templates = require('./templates.json');
var tenali = require('../src/tenali');

describe('tenali', function () {
	describe('Tenali()', function () {
		it('should be a function', function () {
			tenali.should.be.a('function');
		});

		it('should return an object', function () {
			(new tenali()).should.have.property('register');
		});

		it('should register templates', function () {
			expect(new tenali().register(templates)).to.be.undefined;
		});

		it('should return a store object', function () {
			var tenaliInstance = new tenali()
			tenaliInstance.register(templates);
			expect(tenaliInstance.list()).to.satisfy(storeHash);

			function storeHash(store) {
				return store[templates[0].input][templates[0].variant][templates[0].engine] === templates[0].template;
			}
		});

		it('should return a template array', function () {
			var tenaliInstance = new tenali();
			tenaliInstance.register(templates);
			expect(tenaliInstance.get(templates)).to.include(templates[0].template);
		});
	})
})