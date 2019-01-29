var db = firebase.database();
$(document).ready(function(){
	$("#searchBar").onkeypress = function(event){
		var x = event.which||event.keyCode;
		console.log(x);
		if (x == 13){
			var search = $("#searchBar");
			var key = db.ref("/items/"+search.val());
			key.once("value").then(function(snap){
				var username = snap.val().username;
				var description = snap.val().description;
				var price = snap.val().price;
				var image = snap.val().image;
				if (document.getElementById("itemInfo") == null){
					var div = document.createElement("DIV");
					var id = document.createAttribute("id");
					id.value = "itemInfo";
					div.setAttributeNode(id);
					$("body").append(div);
					/*var blank = document.createElement("P");
					var blankId = document.createAttribute("id");
					blankId.value = "blankSpace";
					blank.setAttributeNode(blankId);
					$("#itemInfo").append(blank);*/
				}
				var itemName = "<h3>"+capFirstLetter(search.val())+"</h3>";
				var nodeUser = "<p>Username: "+username+"</p>"
				var nodeDesc = "<p>Description: "+description+"</p>";
				var nodePrice = "<p>Price: $"+price+"</p>";
				var nodeImage = "<img width='100px' src='"+image+"'>";
				$("#itemInfo").html(itemName + nodeUser + nodeDesc + nodePrice + nodeImage);
			});
		}
	}
	$("#searchSubmit").click(function(){
		var search = $("#searchBar");
		var key = db.ref("/items/"+search.val());
		key.once("value").then(function(snap){
			var username = snap.val().username;
			var description = snap.val().description;
			var price = snap.val().price;
			var image = snap.val().image;
			if (document.getElementById("itemInfo") == null){
				var div = document.createElement("DIV");
				var id = document.createAttribute("id");
				id.value = "itemInfo";
				div.setAttributeNode(id);
				$("body").append(div);
				/*var blank = document.createElement("P");
				var blankId = document.createAttribute("id");
				blankId.value = "blankSpace";
				blank.setAttributeNode(blankId);
				$("#itemInfo").append(blank);*/
			}
			var itemName = "<h3>"+capFirstLetter(search.val())+"</h3>";
			var nodeUser = "<p>Username: "+username+"</p>"
			var nodeDesc = "<p>Description: "+description+"</p>";
			var nodePrice = "<p>Price: $"+price+"</p>";
			var nodeImage = "<img width='100px' src='"+image+"'>";
			$("#itemInfo").html(itemName + nodeUser + nodeDesc + nodePrice + nodeImage);
		});
	});
})