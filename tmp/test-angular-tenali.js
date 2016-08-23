angular.module('krishnadevraya', ['TenaliFx'])
	.run(config)
	.controller('mainCtrl', mainCtrl);

config.$inject = ['tenaliCompiler'];
function config(tc) {
	// configure tenaliForm directive
	tc.engine.add("LoDash", _);
	tc.register(tc.template.getSetById('foundation-apps-tenali'));
}

mainCtrl.$inject = ['$scope'];
function mainCtrl($scope) {
	$scope.schema = mySchema;
	$scope.myModel = {name: "Cha"};
	console.log('mainCtrl', !!$scope.schema);
}