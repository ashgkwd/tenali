(function() {
	'use strict';
	angular.module('TenaliFx', [])
	.directive('tenaliForm', tenaliForm)
	.service('tenaliCompiler', tenaliCompiler);

	tenaliForm.$inject = ['tenaliCompiler'];

	function tenaliForm(tc) {
		var directive = {
			restrict: 'E',
			replace: true,
			scope: {
				schema: '=from',
				variant: '=for',
				engine: '=using',
				formModel: '=as'
			},
			link: postLink
		}

		return directive;

		function updateForm(scope, iElem) {
			return function(schema, oldSchema) {
				if(scope.schema==oldSchema || !scope.schema) return;

				var formElements = tc.compile(scope.schema, scope.variant, scope.engine);
				var formStart = '<form name="tenaliForm">';
				var formEnd = '</form>';
				(function() {
					iElem.html([formStart].concat(formElements).concat([formEnd]).join(' '));
				})()
			}
		}

		function postLink(scope, iElem, iAttrs) {
			iAttrs.$observe('from', updateForm(scope, iElem));
		}
	}

	function tenaliCompiler() {
		var service = {};
		var tenaliInstance = new Tenali();

		service.register = register;
		service.list = list;
		service.compile = compile;
		service.engine = {add: add};

		return service;

		function register(templates) {
			tenaliInstance.register(templates);
		}

		function list() {
			return tenaliInstance.list();
		}

		function compile(schema, variant, engine) {
			return tenaliInstance.get(schema.map(function(item) {
				if(!item.variant)
					item.variant = variant;
				if(!item.engine)
					item.engine = engine;
				return item;
			}))
		}

		function add(name, instance) {
			tenaliInstance.engine.add(name, instance);
		}
	}
})();