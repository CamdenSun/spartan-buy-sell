$(document).ready(function(){
	var db = firebase.database();
	function checkOccurance(str1, str2){
		var word1, word2;
		if (str1.length > str2.length){
			word1 = str1;
			word2 = str2;
		} else {
			word1 = str2;
			word2 = str1;
		}
		return word1.split(word2).length - 1;
	}
	$("#searchbar").on("keydown", function(e){
		var x = e.which||event.keyCode;
		if (x == 13){
			var search = $("#searchbar").val();
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
			db.ref("/items/").once("value", function(snap){
				var items = snap.val();
				for (var item in items){
					if (){
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
				}
			}).catch(function(err){
				console.log(err.code);
				console.log(err.message);
			});
		}
	});
});