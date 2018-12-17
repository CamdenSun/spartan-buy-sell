const db = firebase.database()
async function createUser(){
	let uName = document.getElementById('suName').value;
	let email = document.getElementById('suEmail').value;
	let password = document.getElementById('suPass').value;
	console.log(uName);
	if (required(uName, "Username", "suName") && required(email, "Email", "suEmail") && required(password, "Password", "suPass")){
		if (letAndNum(uName) && mvla(email)){
			if (uName.length < 20 && uName.length > 6 && password.length > 8){
				let thisUser = db.ref('users/' + uName);
				let realAcc = await thisUser.once('value');
				if (realAcc.val() == null){
					thisUser.set({
						email: email,
						password: password,
					})
					alert('Your submission was sent');	
				} else {
					alert('This username already exists')
				}
				/*firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		        var errorCode = error.code;
		        var errorMessage = error.message;
		        if (errorCode == 'auth/weak-password') {
		          alert('The password is too weak.');
		        } else {
		          alert(errorMessage);
		        }
		        console.log*/
		    }
		}
	}
}
async function logIn(){
	let uName = document.getElementById('liName').value;
	let password = document.getElementById('liPass').value;
	let realPass = await db.ref('users/' + uName + '/password/').once('value');
	console.log("REALPASS: ", realPass.val());
	console.log(password)
	if (realPass.val() == password){
		alert('Logged in as ' + uName);
		window.location.replace("file:///C:/Users/Camden/Documents/GitHub/nou/src/homePage/home.html")
	} else {
		alert('Incorrect username or password');
	}
}