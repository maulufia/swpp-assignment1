// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

// create angular app
var asmApp1 = angular.module('asmApp1', []);

/*========================================
=            GLOBAL VARIABLES            =
========================================*/

var ERROR_CODE_1 = 'The user name should be 5~20 characters long. Please try again.';
var ERROR_CODE_2 = 'The password should be 8~20 characters long. Please try again.';
var ERROR_CODE_3 = 'This user name already exists. Please try again.';
var ERROR_CODE_4 = 'Invalid username and password combination. Please try again.';

var SAY_HELLO = 'Please enter your credentials below';

/*=====  End of GLOBAL VARIABLES  ======*/


// create angular controller
asmApp1.controller('jsController', function($scope, $http, $window) {

	/*======================================
	=            initialization            =
	======================================*/

	$scope.initialType = 'password';
	$scope.flashInfo = SAY_HELLO;
	
	
	/*=====  End of initialization  ======*/
	
	
	// Toggle Password
	$scope.togglePassword = function() {
		if($scope.initialType == 'password')
			$scope.initialType = 'text';
		else 
			$scope.initialType = 'password';
	};

	// [POST] Login
	$scope.loginUser = function() {
		$http.post('/login.json', {
			'username' : $scope.username,
			'password' : $scope.password
		})
		.success(function(data) {
			var msg;
			if(data.error_code == -1) {
				msg = ERROR_CODE_1;
			} else if (data.error_code == -2) {
				msg = ERROR_CODE_2;
			} else if (data.error_code == -3) {
				msg = ERROR_CODE_3;
			} else if (data.error_code == -4) {
				msg = ERROR_CODE_4;
			} else {
				msg = data;
				$window.location.reload();
			}
			//$scope.flashInfo = msg;
			setFlashInfo(msg);
		})
		.error(function(data) {
			console.log(data);
		});
	}

	// [POST] SignUp
	$scope.addUser = function() {
		$http.post('/signup.json', {
			'username' : $scope.username,
			'password' : $scope.password
		})
		.success(function(data) {
			var msg;
			if(data.error_code == -1) {
				msg = ERROR_CODE_1;
			} else if (data.error_code == -2) {
				msg = ERROR_CODE_2;
			} else if (data.error_code == -3) {
				msg = ERROR_CODE_3;
			} else if (data.error_code == -4) {
				msg = ERROR_CODE_4;
			} else {
				msg = data;

				// form clear
				$(function() {
					$('form input').val('');
				});

				// automatic login
				$http.post('/login.json', {
					'username' : $scope.username,
					'password' : $scope.password
				})
				.success(function(data) {
					$window.location.reload();
				});
			}
			setFlashInfo(msg);
		})
		.error(function(data) {
			console.log(data);
		});
	};

	// [GET] Logout
	$scope.logout = function() {
		$http.get('/logout')
		.success(function(data) {
			$window.location.reload();
		});
	};

	function setFlashInfo(msg) {
		$scope.flashInfo = msg;
	}

});

asmApp1.directive('formDrctv', function() {
	return function(scope, el, attrs) {
		scope.$watch("userForm.username.$error", function(newname, oldname) {
			if(newname.minlength || newname.maxlength)
				scope.flashInfo = ERROR_CODE_1;
			else {
				scope.flashInfo = SAY_HELLO;
				scope.$watch("userForm.password.$error", function(newpw, oldpw) {
					if(newpw.minlength || newpw.maxlength)
						scope.flashInfo = ERROR_CODE_2;
					else 
						scope.flashInfo = SAY_HELLO;
				}, true);
			}
		}, true);
	}
});