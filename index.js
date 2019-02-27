$(document).ready(function(){
	var db = firebase.database();
	$("#searchbar").on("keydown", function(e){
		var x = e.which||event.keyCode;
		if (x == 13){
			var search = $("#searchbar").val();
			var itemRef = db.ref("/items/" + search.toLowerCase());
			if (document.getElementById("message") == null){
				var div = "<div id=\"message\" class=\"info\"></div>";
				$("#searchbardiv").append(div);
				var disp = $("<h3></h3>").attr("id", "iName");
				var user = $("<p></p>").attr("id", "iUname");
				var desc = $("<p></p>").attr("id", "iDesc");
				var price = $("<p></p>").attr("id", "iPrice");
				var img = $("<img>").attr("id", "iImg");
				$("#message").append(disp, user, desc, price, img);
			}
			//I need to fix what is below
			itemRef.once("value", function(snap){
				item = snap.val();
				if (item != null){
					$("#iName").text(item.display);
					$("#iUname").text("Owner: " + item.username);
					$("#iDesc").text("Description: " + item.description);
					$("#iPrice").text("Price: $" + item.price);
					$("#iImg").attr("src", item.image).attr("style", "width: 50px");
				} else {
					alert("Item not found");
					$("#iName").text("ITEM NOT FOUND");
					$("#iDesc").text("If you\'re searching for something, it\'s not here");
				}
			}).catch(function(err){
				console.log(err.code);
				console.log(err.message);
			});
		}
	});
});