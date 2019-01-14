const db = firebase.database();
var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;
if (user != null) {
  	name = user.displayName;
  	email = user.email;
  	photoUrl = user.photoURL;
  	emailVerified = user.emailVerified;
  	uid = user.uid;
  	document.getElementById("headerBtn").innerHTML = '<nav class="mdl-navigation"><a class="mdl-navigation__link" href="#">Hello' + email + '!</a></nav>';
}
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    console.log(error.code);
    console.log(error.message);
});
function createUser(){
	//let suuName = document.getElementById('suName').value;
	let suemail = document.getElementById('suEmail').value;
	let supassword = document.getElementById('suPass').value;
	/*if (required(uName, "Username", "suName") && required(email, "Email", "suEmail") && required(password, "Password", "suPass")){
		if (letAndNum(uName) &&mvla(email)){
			if (uName.length < 20 && uName.length > 6 && password.length > 8){*/
				/*let thisUser = db.ref('users/' + uName);
				let realAcc = await thisUser.once('value');
				if (realAcc.val() == null){
					thisUser.set({
						email: email,
						password: password,
					})
					alert('Your submission was sent');	
				} else {
					alert('This username already exists')
				}*/
	firebase.auth().createUserWithEmailAndPassword(suemail, supassword).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
    });
    alert("Account Created")
}
function logIn(){
	let liemail = document.getElementById('liEmail').value;
	let lipassword = document.getElementById('liPass').value;
	//let realPass = await db.ref('users/' + uName + '/password/').once('value');
	firebase.auth().signInWithEmailAndPassword(liemail, lipassword).catch(function(error) {
	  	console.log(error.code);
	  	console.log(error.message);
	});
	var user = firebase.auth().currentUser;
	var name, email, photoUrl, uid, emailVerified;
	if (user != null) {
	  	name = user.displayName;
	  	email = user.email;
	  	photoUrl = user.photoURL;
	  	emailVerified = user.emailVerified;
	  	uid = user.uid;
	  	document.getElementById("headerBtn").innerHTML = '<nav class="mdl-navigation"><a class="mdl-navigation__link" href="#">Hello' + email + '!</a></nav>';
	}
	console.log(name + ", " + email + ", " + uid);
	/*console.log("REALPASS: ", realPass.val());
	console.log(password)
	if (realPass.val() == password){
		alert('Logged in as ' + uName);
		window.location.replace("file:///C:/Users/Camden/Documents/GitHub/nou/src/homePage/home.html")
	} else {
		alert('Incorrect username or password');
	}*/
}
function logOut(){
	firebase.auth().signOut().then(function() {
  		// Sign-out successful.
	}).catch(function(error) {
  		// An error happened.
	});
	var user = firebase.auth().currentUser;
	if (user == null){
		document.getElementById("headerBtn").innerHTML = "<a class='mdl-button mdl-js-button mdl-button--raised mdl-button--accent' href='#'>Sign Up</a> <a class='mdl-button mdl-js-button' href='#'>Log In</a>"
	}
}