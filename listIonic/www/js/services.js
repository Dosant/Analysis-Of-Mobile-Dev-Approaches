angular.module('listTest.services', [])

.factory('List', function($http, $q) {

  var list = [];

  return {
    all: function() {
      if (list.length) {
        return $q.resolve(list);
      }

      return $http.get('data/data.json').then(function (res) {
          list = list.concat(res.data);
          return res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    },
    remove: function(item) {
      list.splice(list.indexOf(item), 1);
    },
    get: function(id) {
      return list.find(function(item) {
          return item.id === id;
      });
    }
  };
});
