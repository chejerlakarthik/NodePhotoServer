album.controller('My404Controller', My404Controller);

function My404Controller($scope)
{
	$scope.error_description = 'Sorry you have hit the wrong URL. No such page exists.';
};