album.service('albumProvider', albumProvider);

function albumProvider($http) {

	this.newAlbum = {};
	this.albumName = '';
	
	this.getAlbums = function(callback) {
		$http.get("/v1/albums.json")
		.success(function(data,status,headers,conf){
			callback(null,data);
		})
		.error(function(data,status,headers,conf){
			callback(data);
		})
	};

	this.getPhotosForAlbum = function(albumName,callback) {
		$http.get("/v1/albums/"+ albumName + "/photos.json")
		.success(function(data,status,headers,conf){
			callback(null,data);
		})
		.error(function(data,status,headers,conf){
			callback(data);
		});
	};

	this.addAlbum = function(newAlbum, callback) {

		if (!newAlbum.title) {
			return callback({
				code : "missing_title"
			});
		} else if (!newAlbum.date){
			return callback({
				code : "missing_date"
			});
		} else if(!is_valid_date(newAlbum.date)){
			return callback({
				code : "bad_date"
			});
		} else if (!newAlbum.name) {
			return callback({
				code : "missing_name"
			});
		}else if (!newAlbum.description) {
			return callback({
				code : "missing_description"
			});
		} else {
			$http.put("/v1/albums.json", newAlbum).success(
					function(data, status, headers, conf) {
						callback(null, data);
					}).error(function(data, status, headers, conf) {
				callback(data);
			});
		}
	};

	function is_valid_date(inputDate) {
		if (inputDate.match(/^\d{4}[.\/-]\d{2}[.\/-]\d{2}$/)) {
			console.log("Valid date format. Check if its really a valid date");
			var d = new Date(inputDate);
			if (isNaN(d.getTime())) {
				return false;
				// throw new Error("Invalid date");
			} else {
				// If we get till here, the date is good
				return true;
			}
		}
		return false;
	};

}