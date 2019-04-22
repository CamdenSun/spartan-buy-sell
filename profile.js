$(document).ready(function(){
	var user = window.location.search.split("=");
	user.splice(0, 1);
	firebase.database().ref("/users/" + user + "/items/").once("value").then(function(snap){
		var items = snap.val();
		var arr = Object.keys(items);
		for (let i = 0; i < arr.length; i++){
			var tr = $("<tr></tr>").attr("id", arr[i]);
			var photo = $("<td></td>").html("<img src=\"" + items[arr[i]].photo + ">").attr("class", "photo");
			var nameTD = $("<td></td>").text(items[arr[i]].display).attr("class", "name");
			var descTD = $("<td></td>").text(items[arr[i]].desc).attr("class", "description");
			var priceTD = $("<td></td>").text(items[arr[i]].price).attr("class", "price");
			$("#itemsTable").append(tr);
			$("#" + arr[i]).append(photo, nameTD, descTD, priceTD);
		}
	});
	function createItem(){
		var name = $("#itemName").val();
		var desc = $("#itemDesc").val();
		var price = $("#itemPrice").val();
		var photo = $("#itemPhoto").val();
		firebase.database().ref("/users/items/").push({
			display: name,
			desc: desc,
			price: price,
			photo: photo
		});
	}
	$(".itemInput").on("keyPress", function(event){
		if (event.which||event.keyCode == 13){
			createItem();
		}
	});
	$("#itemSubmit").click(function(){
		createItem();
	});
	firebase.database().ref("spartanbuysell").set({
		back: "Hello",
		potato: "World"
	});
	firebase.database().ref("spartanbuysell/back").once("value").then(function(snap){
		var stuff = snap.val();
		console.log(stuff);
	});
});