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
				$("#message").append("<h3 id=\"iName\"></h3><br><p id=\"iUname\"></p><br><p id=\"iDesc\"></p><br><p id=\"iPrice\"><p><br><img id=\"iImg\" width=\"100px\">");
			}
			//I need to fix what is below
			itemRef.once("value", function(snap){
				item = snap.val();
				if (item != null){
					var disp = item.display;
					var user = item.username;
					var desc = item.description;
					var price = item.price;
					var img = item.image;
					console.log("disp");
					
					$("#iName").text(disp);
					$("#iUname").text(user);
					$("#iDesc").text(desc);
					$("#iPrice").text("$" + price);
					//console.log($("#iImg"));
					document.getElementById("iImg").setAttribute("src", img);
				
				} else {
					alert("Item not found");
					$("#iName").text("ITEM NOT FOUND");

				}
			}).catch(function(err){
				console.log(err.code);
				console.log(err.message);
			});
		}
	});
});