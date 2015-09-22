/**
 * 
 */
album.directive('photoAlbum', function(){
	return{
		restrict: 'E',
		templateUrl: '/partials/photo_album_partial.html'
	}
});


album.directive('newAlbumForm',function(){
	return{
		restrict: 'E',
		templateUrl: '/partials/new_album_form.html'
 	}
});
