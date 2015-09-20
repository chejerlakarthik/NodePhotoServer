album.controller('AlbumViewController', AlbumViewController);

function AlbumViewController($scope, $routeParams, albumProvider) {
	$scope.album_name = $routeParams.album_name;
	$scope.load_error_message = "";

	albumProvider
			.getPhotosForAlbum(
					$scope.album_name,
					function(error, photos) {
						if (error) {
							$scope.load_error_message = "Could not find an album with that name";
						} else {
							$scope.photos = photos;
						}
					});
};

