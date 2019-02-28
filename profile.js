$(document).ready(function(){
	var user = firebase.auth().currentUser;
	function createItem(){
		var name = $("#itemName").val();
		var desc = $("#itemDesc").val();
		var price = $("#itemPrice").val();
		var photo = $("#itemPhoto").val();
		firebase.database().ref("/items/").push({
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
});