angular.module('app.controllers', ['app.services'])
  .controller('AppCtrl', function ($scope, $log, Settings) {
    $log.info('AppCtrl Created');
    $scope.settings = Settings;
  })
  .controller('WeatherCtrl', function ($scope, $log, $ionicLoading, $ionicPlatform, $cordovaGeolocation, Location, Weather, Settings) {
    $log.info('WeatherCtrl Created');
  
    $ionicPlatform.ready(function () {
    if (Location.lat == 0) {
      var posOptions = {
        timeout: 10000,
        enableHighAccuracy: false
      };
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          Location.lat = position.coords.latitude;
          Location.long = position.coords.longitude;
          getWeather();
      }, function (err) {
          // error
        });
    }
  });
  
    $scope.haveData = false;
    $ionicLoading.show({
      template: 'Loading...'
    });

    function getWeather() {
      $scope.haveData = false;
      $ionicLoading.show({
        template: 'Loading...'
      });
      Weather.getWeatherAtLocation(Location.lat, Location.long).then(function (resp) {
        $log.info(resp);
        $scope.current = resp.data.currently;
        $scope.highTemp = Math.ceil(resp.data.daily.data[0].temperatureMax);
        $scope.lowTemp = Math.floor(resp.data.daily.data[0].temperatureMin);
        $scope.currentTemp = Math.ceil($scope.current.temperature);
        $scope.haveData = true;
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
      }, function (error) {
        alert('Unable to get current conditions');
        $log.error(error);
      });
    }

    //getWeather();

    $scope.doRefresh = function () {
      getWeather(); 
    }
  
    $scope.$watch(function () {
      return Settings.units
    }, function (newVal, oldVal) {
      if (newVal !== oldVal) {
        getWeather();
      }
    });
  });