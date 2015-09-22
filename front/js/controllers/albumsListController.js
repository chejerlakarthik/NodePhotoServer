album.controller('AlbumsListController', AlbumsListController);

function AlbumsListController($scope,$location,albumProvider) {

	$scope.newAlbum = {};
	$scope.validation_error_message = "";
	$scope.page_load_error = "";
	$scope.pageLoadCompleted = false;

	albumProvider.getAlbums(function(error, albums) {
		if (error) {
			$scope.page_load_error = "Unexpected page load error : "
					+ error.message;
		} else {
			// Use this loop if you want to see how the page content is disabled
			// until we receive a response from the remote server
			/*for (var i = 0; i < 1000000000; i++) {
			}*/
			$scope.pageLoadCompleted = true;
			$scope.albums = albums;
		}
	});

	$scope.addAlbum = function(newAlbum) {
		
		newAlbum.imgUrl = '/img/' + newAlbum.name + '.jpg';
		newAlbum.albumName = newAlbum.name;
		newAlbum.photos = [{
			filename : newAlbum.name + '-01.jpg',
			description : 'Description-1'
		}, {
			filename : newAlbum.name + '-02.jpg',
			description : 'Description-2'
		}]
		
		albumProvider.addAlbums(newAlbum, function(error, album) {
			if (error) {
				$scope.validation_error_message = error.code;
			} else {
				$location.path("/album/" + newAlbum.name);
			}
		});
	};
};