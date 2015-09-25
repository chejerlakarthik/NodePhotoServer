album.controller('DateController', DateController);

function DateController($scope, $http) {

  $scope.adding_album = {};
  $scope.adding_album.date = new Date();
  $scope.opened = false;

  //Datepicker
  $scope.dateOptions = {
    'year-format': "'yy'",
    startingDay: 1,
    'show-weeks': true
  };
  
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  
  $scope.open = function($event) {
	    $scope.opened = true;
  };
}