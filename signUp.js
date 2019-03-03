$(document).ready(function(){
	var db = firebase.database();
	var user = firebase.auth().currentUser;
	function signUp(username, email, password){
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		  console.log(error.code);
		  console.log(error.message);
		});
		user.updateProfile({
			displayName: username
		});
	}
	function logIn(email, password){
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  console.log(error.code);
		  console.log(error.message);
		});
		console.log(user.displayName);
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