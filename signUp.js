$(document).ready(function(){
	/*function comparePush(ref, keyName, info){
		firebase.database().ref(ref).once("value").then(function(snap){
			var obj = snap.val();
			var objArr = Object.keys(obj);
			for (var i = 0; i < objArr.length; i++){
				if (obj[objArr[i]][keyName] == info){
					return obj[objArr[i]];
				}
			}
		})
	}*/
	document.cookie = null;
	// Create a callback which logs the current auth state
	var db = firebase.database();
	//checkUser();
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
	function onSignIn(googleUser) {
	  console.log("HELLO");
	  var profile = googleUser.getBasicProfile();
	  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	  console.log('Name: ' + profile.getName());
	  console.log('Image URL: ' + profile.getImageUrl());
	  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
	}
	/*function logIn(email, password){
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
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		  console.log(error.code);
		  console.log(error.message);
		});
	}
	$("#suSubmit").click(function(){
		var username = $("#suUser").val();
		var email = $("#suEmail").val();
		var password = $("#suPass").val();
		signUp(username, email, password);
		logIn(email, password);
	});
	$(".suInput").on("keyPress", function(event){
		if (event.which||event.keyCode == 13){
			var username = $("#suUser").val();
			var email = $("#suEmail").val();
			var password = $("#suPass").val();
			signUp(username, email, password);
			logIn(email, password);
		}
	});
	$("#liSubmit").click(function(){
		var email = $("#liEmail").val();
		var password = $("#liPass").val();
		logIn(email, password);
	});
	$(".liInput").on("keyPress", function(event){
		var x = event.which||event.keyCode;
		if (x == 13){
			var email = $("#liEmail").val();
			var password = $("#liPass").val();
			logIn(email, password);
		}
	});*/
});