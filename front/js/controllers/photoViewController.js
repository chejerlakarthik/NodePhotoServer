album.controller('PhotoViewController', PhotoViewController);

function PhotoViewController($scope, $routeParams) {
	
	$scope.photo_album_name = $routeParams.photo_album_name;
	$scope.photo_file_name = $routeParams.photo_file_name;
	
	$scope.photo_description = 'This picture was taken in ' + $routeParams.photo_album_name.toUpperCase();
};