function AlbumsListController($scope,$location,albumProvider,$modal) {

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

	$scope.openAddAlbumDialog = function () {
        var addAlbumDialog = $modal.open({
            size: "lg",
            templateUrl: 'myModalContent.html',
            controller: AddAlbumDialogController,
            resolve: {
            }
        });

        addAlbumDialog.result.then(function (album_name) {
            $location.path("/album/" + album_name)
        }, function () {
            console.info('Modal dismissed at: ' + new Date());
        });
    };
    
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

album.controller('AlbumsListController', AlbumsListController);

function AddAlbumDialogController ($scope, $location, $modalInstance, albumProvider) {
    $scope.add_album_error = "";
    $scope.adding_album = {};
    
    //Date picking control
    $scope.adding_album = {};
    $scope.adding_album.date = new Date();
    $scope.dt = new Date();
    $scope.opened = false;
    
    $scope.today = new Date();

    $scope.dateOptions = {
      'year-format': "'yy'",
      startingDay: 1,
      'show-weeks': true,
      	initDate: $scope.adding_album.date,
      	minDate: '2015-01-01'
    };
      
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    
    $scope.open = function($event) {
  	    $scope.opened = true;
  	    $scope.adding_album.date = new Date();
    };
    
    //To add a new album
    $scope.addAlbum = function (new_album) {
        albumProvider.addAlbum(new_album, function (err, album) {
            if (err) {
                if (err.code == "missing_title")
                    $scope.add_album_error = "You need to give a title";
                else if (err.code == "missing_description")
                    $scope.add_album_error = "You need to give a description";
                else if (err.code == "missing_date")
                    $scope.add_album_error = "You need to give a date";
                else if (err.code == "missing_name")
                    $scope.add_album_error = "You need to give a name";
                else if (err.code == "bad_date")
                    $scope.add_album_error = "That doesn't look like a good date.";
                else if (err.code == "duplicate_album_name")
                    $scope.add_album_error = "An album of that name already exists!";
                else 
                    $scope.add_album_error = "A completely unexpected error occurred: " + err.code + " " + err.message;
            } else {
                $modalInstance.close($scope.adding_album.name);
            }
        });
    };

    $scope.ok = function () {
        $scope.addAlbum($scope.adding_album);
    };
    
    $scope.reset = function(){
    	$scope.adding_album = {};
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

album.controller("AddAlbumDialogController", AddAlbumDialogController);