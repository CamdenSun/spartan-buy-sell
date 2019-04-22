$(document).ready(function(){
	var db = firebase.database();
	var user = firebase.auth().currentUser;
	function signUp(username, email, password){
		db.ref("/users/").once("value").then(function(snap){
			var users = snap.val();
			var arr = Object.keys(users);
			for (let i = 0; i < arr.length; i++){
				if (users[arr[i]].email == email||users[arr[i]].username == username){
					console.log("Email or Username already exists. Please enter another one or sign in.");
				} else {
					db.ref("/users/").push({
						email: email,
						username: username,
						password: password
					});
				}
			}
		});	
	}
	function logIn(email, password){
		db.ref("/users/").once("value").then(function(snap){
			var users = snap.val();
			var arr = Object.keys(users);
			for (let i = 0; i < arr.length; i++){
				if ((users[arr[i]].email == email || users[arr[i]].username.toLowerCase() == email.toLowerCase()) && users[arr[i]].password == password){
					document.getElementById("logIn").submit();
				}
			}
		}).error(function(error){
			alert(error.message);
		});
	}
	$("#suSubmit").click(function(){
		var username = $("suUser").val();
		var email = $("#suEmail").val();
		var password = $("suPass").val();
		console.log(password);
		signUp(username, email, password);
		logIn(email, password);
	});
	$("#suInput").on("keyPress", function(event){
		if (event.which||event.keyCode == 13){
			var username = $("suUser").val();
			var email = $("#suEmail").val();
			var password = $("suPass").val();
			signUp(username, email, password);
			logIn(email, password);
		}
	});
	$("#liSubmit").click(function(){
		var email = $("#suEmail").val();
		var password = $("suPass").val();
		logIn(email, password);
	});
	$("#liInput").on("keyPress", function(event){
		if (event.which||event.keyCode == 13){
			var email = $("#suEmail").val();
			var password = $("suPass").val();
			logIn(email, password);
		}
	});
});