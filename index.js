$(document).ready(function(){
	function strOccur(word1, word2){
		var str1, str2;
		if (word1.length < word2.length){
			str1 = word1;
			str2 = word2;
		} else {
			str1 = word2;
			str2 = word1;
		}
		return str1.split(str2).length - 1;
	}
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
			db.ref("items").once("value", function(snap){
				var items = snap.val();
				var arr = Object.keys(items);
				for (let i = 0; i < arr.length; i++){
					console.log(items[arr[i]].desc);
				}
				var count = 0;
				for (let i = 0; i < arr.length; i++){
					if (strOccur(search, items[arr[i]].display) != 0){
						count++;
						var disp = $("<h3></h3>").text(items[arr[i]].display).attr("id", "iName");
						var user = $("<p></p>").text(items[arr[i]].username).attr("id", "iUser");
						var desc = $("<p></p>").text(items[arr[i]].description).attr("id", "iDesc");
						var price = $("<p></p>").text("$" + items[arr[i]].price).attr("id", "iPrice");
						var img = $("<img>").attr("src", items[arr[i]].image).attr("id", "iImage");
						$("#searchbardiv").append(disp, user, desc, price, img);
					}
				}
				if (count == 0){
					$("#iName").text("Item Not Found");
				}
			}
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