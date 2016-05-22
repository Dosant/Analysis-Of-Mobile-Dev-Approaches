// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('maps', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('map', {
    url: '/',
    templateUrl: 'tpls/map.html',
    controller: 'MapCtrl'
  });

  $urlRouterProvider.otherwise("/");

})

.controller('MapCtrl', function ($scope, $state, $cordovaGeolocation) {
        var options = { timeout: 10000, enableHighAccuracy: true };
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
        var map;

        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            $scope.currentPosition = latLng;
            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
            directionsDisplay.setMap($scope.map);
             google.maps.event.addListenerOnce($scope.map, 'idle', function(){
              var marker = new google.maps.Marker({
                  map: $scope.map,
                  animation: google.maps.Animation.DROP,
                  position: latLng
              });

              var infoWindow = new google.maps.InfoWindow({
                  content: "Here I am!"
              });

              google.maps.event.addListener(marker, 'click', function () {
                  infoWindow.open($scope.map, marker);
              });
        });

        }, function (error) {
            console.log("Failed to get location");
        });


        $scope.goToWork = function () {
          var request = {
            origin: $scope.currentPosition,
            destination: new google.maps.LatLng(53.927690, 27.683296),
            travelMode: google.maps.TravelMode.DRIVING
          };

           directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(result);
            }
          });
        }

})
