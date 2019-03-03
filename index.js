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
			//I need to fix what is below

	});
});