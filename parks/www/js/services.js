angular.module('starter.services', [])

 .factory('ParkData', function ($log) {
   $log.info('Park Data created');
   var theParkData = [];

   return {
     initData: function (theData) {
       theParkData = theData;
       return null;
     },
     getParks: function () {
       return theParkData;
     },
     getPark: function (parkID) {
       for (var i = 0; i < theParkData.length; i++) {
         if (theParkData[i].id === parseInt(parkID)) {
           return theParkData[i];
         }
       }
       return null;

     }
   };
 });