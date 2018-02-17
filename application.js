var app = angular.module('StarterApp', ['ngMaterial']); 

app.controller('AppCtrl', ['$scope','$http', function($scope,$http){
  $scope.toggleSearch = false;
  $scope.headers = [
    {
      name:'Ф.И.О.', 
      field: 'name'
    },
    {
      name:'Module #1',  
      field: 'm1'
    },
    {
      name: 'Module #2', 
      field: 'm2'
    }
  ];
  
  $scope.content = [];
  $scope.title = ""
  var parseQueryString = function() {

      var str = window.location.search;
      var objURL = {};

      str.replace(
          new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
          function( $0, $1, $2, $3 ){
              objURL[ $1 ] = $3;
          }
      );
      return objURL;
  };

  var database_path = parseQueryString().db
  if (!database_path) alert("Не указан путь к бд")
  $http.get(database_path)
  .then(function(response){
    $scope.content = $scope.$$childHead.orderBy(response.data.members,'name',false);
    console.log($scope.$$childHead)
    $scope.$$childHead.order('name',true);
    $scope.title = response.data.title
  })
  .catch(function(error){
    alert("Файл "+database_path+" не найден или некорректен (код "+error.status+")")
  })
  
  $scope.custom = {name: 'bold', description:'grey',last_modified: 'grey'};
  $scope.sortable = ['name', 'm1', 'm2'];
  $scope.count = 25;
}]);

app.directive('mdTable', function () {
  return {
    restrict: 'E',
    scope: { 
      headers: '=', 
      content: '=', 
      sortable: '=', 
      filters: '=',
      customClass: '=customClass',
      count: '=' 
    },
    controller: function ($scope,$filter,$window) {
      var orderBy = $filter('orderBy');
      $scope.orderBy = $filter('orderBy');

      $scope.tablePage = 0;
      $scope.nbOfPages = function () {
        return Math.ceil($scope.content.length / $scope.count);
      },
      $scope.handleSort = function (field) {
          if ($scope.sortable.indexOf(field) > -1) { return true; } else { return false; }
      };
      $scope.order = function(predicate, reverse) {
          $scope.content = orderBy($scope.content, predicate, reverse);
          $scope.predicate = predicate;
      };
      $scope.order($scope.sortable[0],false);
      $scope.getNumber = function (num) {
                return new Array(num);
      };
      $scope.goToPage = function (page) {
        $scope.tablePage = page;
      };
      $scope.goToHref = function(url){
        location = url;
      };
    },
    template: angular.element(document.querySelector('#md-table-template')).html()
  }
});

app.directive('showFocus', function($timeout) {
  return function(scope, element, attrs) {
    scope.$watch(attrs.showFocus, 
      function (newValue) { 
        $timeout(function() {
            newValue && element.focus();
        });
      },true);
  };    
});

app.filter('startFrom',function (){
  return function (input,start) {
    start = +start;
    return input.slice(start);
  }
});
