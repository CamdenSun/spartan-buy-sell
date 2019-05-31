$(document).ready(function(){
	var user = window.location.search.split("=");
	user.splice(0, 1);
	var cook = document.cookie.split("; ");
	cook.splice(0, 1);
	var userID = cook.toString();
	console.log(userID);
	function createItem(){
		var name = $("#itemName").val();
		var desc = $("#itemDesc").val();
		var price = $("#itemPrice").val();
		var photo = $("#itemPhoto").val();
		firebase.database().ref("/users/"+userID).once("value").then(function(e){
			var user = e.val();
			var email = user.email;
			var myRef = firebase.database().ref("/items/").push();
			myRef.push({
				user: email,
				display: name,
				desc: desc,
				price: price,
				photo: photo
			});
			firebase.database().ref("/users/").once("value").then(function(snap){
				var userObj = snap.val();
				var myItems = user.itemArr;
				firebase.database().ref("/users/" + user).update({
					itemArr: myItems
				});
			});
		});
		alert("Your submission has been sent.");
	}
	$(".itemInput").on("keyPress", function(event){
		if (event.which||event.keyCode == 13){
			createItem();
		}
	});
	$("#itemSubmit").click(function(){
		createItem();
	});
});