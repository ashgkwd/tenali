angular.module('krishnadevraya', ['TenaliFx'])
	.run(config)
	.controller('mainCtrl', mainCtrl);

config.$inject = ['tenaliCompiler'];
function config(tc) {
	// configure tenaliForm directive
	tc.engine.add("LoDash", _);
	// tc.register(myTemplate); // from test.js
	var myHtmlToTemplate = tc.template.getSetById('fst');
	tc.register(myHtmlToTemplate);
}

mainCtrl.$inject = ['$scope'];
function mainCtrl($scope) {
	$scope.schema = mySchema;
	console.log('mainCtrl', $scope.schema);
}