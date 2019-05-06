$(document).ready(function(){
	var db = firebase.database();
	
	db.ref("/users/").once("value").then(function(e){
		var users = e.val();

	})
});