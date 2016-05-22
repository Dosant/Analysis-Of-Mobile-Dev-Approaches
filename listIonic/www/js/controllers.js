angular.module('listTest.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ListCtrl', function($scope, List, $timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.list = [];
  List.all()
    .then(function(list) {
        $scope.list = list;
    });
  $scope.remove = function(id) {
    $scope.list = $scope.list.filter(function (item) {
      return item.id !== id;
    })
  };
})

.controller('DetailCtrl', function($scope, $stateParams, List) {
  $scope.item = List.get(+$stateParams.itemId);
})

