angular.module('krishnadevraya', ['TenaliFx'])
	.run(config)
	.controller('mainCtrl', mainCtrl);

config.$inject = ['tenaliCompiler'];
function config(tc) {
	// configure tenaliForm directive
	tc.register(myTemplate); // from test.js
	tc.engine.add("LoDash", _);
}

mainCtrl.$inject = ['$scope'];
function mainCtrl($scope) {
	$scope.schema = mySchema;
	console.log('mainCtrl', $scope.schema);
}