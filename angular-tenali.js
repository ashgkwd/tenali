(function() {
	'use strict';
	angular.module('Tenali', [])
	.directive('tenaliForm', tenaliForm)
	.service('tenaliCompiler', tenaliCompiler);

	tenaliForm.$inject = ['$compile', 'tenaliCompiler'];

	function tenaliForm($compile, tc) {
		var directive = {
			restrict: 'E',
			replace: true,
			scope: {
				schema: '=from',
				variant: '@for',
				engine: '@using',
				to: '=to'
			},
			compile: getForm
		}

		return directive;

		function postLink(scope, iElem, iAttrs) {
			scope.$watch(watchSchema, handleSchemaChange);

			function watchSchema(scope) {
				return scope.$eval(iAttrs.from);
			}

			function handleSchemaChange(schema, oldSchema) {
				console.log('handleSchemaChange', scope.schema, oldSchema,  !scope.schema);
				if(!scope.schema) return;

				iElem.replaceWith(
					$compile(
						['<form name="'+ (iAttrs.name || 'tenaliForm') +'">'].concat(
							tc.compile(scope.schema, scope.variant, scope.engine)
						).concat(
							['</form>']
						).join('')
					)(scope)
				);
			}
		}

		function getForm(iElem, iAttrs) {
			return postLink;
		}
	}

	function tenaliCompiler() {
		var service = {};
		var tenaliInstance = new Tenali();

		service.register = register;
		service.list = list;
		service.compile = compile;
		service.engine = {add: add};
		service.template = {
			getById: getById,
			getSetById: getSetById
		}

		return service;

		function register(templates) {
			tenaliInstance.register(templates);
		}

		function list() {
			return tenaliInstance.list();
		}

		function compile(schema, variant, engine) {
			return tenaliInstance.get(schema.map(function(item) {
				item.variant = item.variant || variant;
				item.engine = item.engine || engine;
				return item;
			}))
		}

		function add(name, instance) {
			tenaliInstance.engine.add(name, instance);
		}

		function getById(id) {
			return tenaliInstance.template.getById(id);
		}

		function getSetById(id) {
			return tenaliInstance.template.getSetById(id);
		}
	}
})();