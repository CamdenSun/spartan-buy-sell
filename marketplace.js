$(document).ready(function(){
	var db = firebase.database();
	var name = window.location.search.split("=");
	name.splice(0, 1);
	db.ref("items").once("value", function(snap){
		var items = snap.val();
		var arr = Object.keys(items);
		var count = 0;
		for (let i = 0; i < arr.length; i++){
			if (items[arr[i]].display.toLowerCase().includes(name.toString().toLowerCase())||name.includes(items[arr[i]].display)){
				count++;
				var div = $("<div></div>").attr("class", "resultCard").attr("id", arr[i]);
				$("#resultsBox").append(div);
				var img = $("<img>").attr("src", items[arr[i]].photo).attr("class", "resultImage");
				var title = $("<h2></h2>").text(items[arr[i]].display + " $" + items[arr[i]].price).attr("class", "resultName");
				var desc = $("<p></p>").text(items[arr[i]].desc).attr("class", "resultDesc");
				$("#" + arr[i]).append(img, title, desc);
				/*var disp = $("<h3></h3>").text(items[arr[i]].display).attr("id", "iName");
				var user = $("<p></p>").text(items[arr[i]].username).attr("id", "iUser");
				var desc = $("<p></p>").text(items[arr[i]].description).attr("id", "iDesc");
				var price = $("<p></p>").text("$" + items[arr[i]].price).attr("id", "iPrice");
				var img = $("<img>").attr("src", items[arr[i]].image).attr("id", "iImage");
				document.getElementById(arr[i]).append(disp, user, desc, price, img);*/
			}
		}
		document.getElementById("")
		if (count == 0){
			$("#resultsBox").text("No results of " + name + " found.");
		}
	});
});