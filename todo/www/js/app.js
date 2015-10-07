// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase', 'ngCordova'])
.factory('Items', ['$firebaseArray', function($firebaseArray) {
  var itemsRef = new Firebase('https://ADD_SERVER_NAME.firebaseio.com/items');
  return $firebaseArray(itemsRef);
}])
.controller('ListCtrl', function($scope, $ionicListDelegate, $cordovaDialogs, Items) {
  $scope.items = Items;

  $scope.addItem = function () {
	$cordovaDialogs.prompt('What do you need to buy?', 'Grocery Keeper', ['Cancel', 'Add'], '')
	  .then(function (result) {
		if (result.buttonIndex == 2) {
		  $scope.items.$add({
			'name': result.input1
		  });
		}
	  });
	};
  
  $scope.purchaseItem = function(item) {
  var itemRef = new Firebase('https://ADD_SERVER_NAME.firebaseio.com/items/' + item.$id);
  itemRef.child('status').set('purchased');
  $ionicListDelegate.closeOptionButtons();
};
  
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
