var album = angular.module('albumApp',['ngRoute','ui.bootstrap']);
album.config(function ($routeProvider){
	$routeProvider
	.when("/albums", {controller: AlbumsListController, templateUrl: "partials/album_list_partial.html"})
	.when("/album/:album_name", {controller: AlbumViewController, templateUrl: "partials/album_view_partial.html"})
	.when("/album/:photo_album_name/:photo_file_name", {controller: PhotoViewController, templateUrl: "partials/photo_view_partial.html"})
	.when("/404", {controller: My404Controller, templateUrl: "partials/404_page.html"})
	.when("/", {redirectTo: "/albums"})
	.otherwise( {redirectTo: "/404"} );
});

album.constant("userName","Karthik");