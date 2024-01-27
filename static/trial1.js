const firebaseConfig = {
  const mySecret = process.env['FirebaseAccess'],
  //insert FirebaseAccessCredentialsHereFromSecret
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var UserDetailsDB = firebase.database().ref("UserDetails");

document.getElementById("MainContent").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var comment = getElementVal("comment");
  console.log(name, comment);
  saveMessages(name, comment);
  document.getElementById("MainContent").reset();
}

const saveMessages = (name, comment) => {
  var newUserDetails = UserDetailsDB.push();

  newUserDetails.set({
    name: name,
    comment: comment,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
