const db = firebase.database();

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id = profile.getId();
  var name = profile.getName();
  var image = profile.getImageUrl();
  var email = profile.getEmail();

  console.log('ID: ' + id); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + name);
  console.log('Image URL: ' + image);
  console.log('Email: ' + email); // This is null if the 'email' scope is not present.
  db.ref("users/" + id).set({
  	name: name,
  	image: image,
  	email: email
  });
}