angular.module('starter.controllers', [])

.controller('ParksCtrl', function ($scope, $log, $http, ParkData) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $log.info('ParksCtrl created');

  $http.get('data/data.json').
  success(function (data, status, headers, config) {

    ParkData.initData(data);
    $scope.parks = ParkData.getParks();
  }).
  error(function (data, status, headers, config) {
    // log error
    $log.info('error' + data);
  })


})

.controller('ParkDetailCtrl', function ($scope, $log, $state, $stateParams, ParkData) {
  $log.info('ParkDetailCtrl created');
  $scope.park = ParkData.getPark($stateParams.parkId);
})

.controller('MapCtrl', function ($scope, $log, $state, ParkData) {
  $log.info('MapCtrl created');

  $scope.mapCenter = {
    lat: 39.833,
    lng: -98.583,
    zoom: 3
  }

  $scope.map = {
    defaults: {
      tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      maxZoom: 18
    }
  };


  var theParksData = ParkData.getParks();
  var markerArray = [];


  for (var i = 0; i < theParksData.length; i++) {
    var theParkData = theParksData[i];
    var parkMarker = {
      lat: theParkData.lat,
      lng: theParkData.long,
      icon: {
        iconUrl: 'img/nps_arrowhead.png',
        iconRetinaUrl: 'img/nps_arrowhead@2x.png',
        iconSize: [32, 42],
        iconAnchor: [16, 42]
      },
      park: theParkData
    };
    markerArray.push(parkMarker);
  }

  $scope.markers = markerArray;

  $scope.$on('leafletDirectiveMarker.click', function (event, args) {
    $state.go('tab.map-details', {
      'parkId': args.model.park.id
    });
  });

});