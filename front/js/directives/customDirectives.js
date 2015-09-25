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

album.directive('photoAlbumFooter', function() {
	return {
		restrict : 'A',
		templateUrl : '/partials/photo_album_footer.html',
		link : function(scope, element, attrs) {
			element.css('outline', '1px solid red');
			element.css('position', 'fixed');
			element.css('bottom', '0px');
			element.css('width', '100%');
			element.css('margin', 'auto');
			element.css('height', '30px');
			element.css('background-color', '#f5f5f5');
		}
	}
});

album.directive('footerContent', function() {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {

			element.css('margin', 'auto');
			element.css('width', '60%');
			element.css('color', 'navy');
			element.css('padding-top', '10px');
			element.css('padding-bottom', '10px');
			element.css('padding-left', '100px');
		}
	}
});

album.directive('datePicker',function(){
	return{
		restrict: 'E',
		scope: {
			ngModel: '=',
			dateOptions: '=',
			opened: '=',
		},
		link: function($scope,element,attrs){
			$scope.open = function(event){
				event.preventDefault();
				event.stopPropagation();
				$scope.opened = true;
			};
			$scope.clear = function(){
				$scope.ngModel = null;
			};
		},
		templateUrl: '/partials/datepicker.html'
	}
});