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
				$("#message").append("<h3 id=\"iName\"></h3><br><p id=\"iUname\"></p><br><p id=\"iDesc\"></p><br><p id=\"iPrice\"><p><br><img id=\"iImg\" width=\"100px\">");
			}
			//I need to fix what is below
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
			}).catch(function(err){
				console.log(err.code);
				console.log(err.message);
			});
		}
	});
});