const firebaseConfig = {
  const mySecret = process.env['FirebaseAccess']
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
  var counter=0;
  console.log(name, comment, counter);
  saveMessages(name, comment, counter);
  document.getElementById("MainContent").reset();
}

const saveMessages = (name, comment, counter) => {
  var newUserDetails = UserDetailsDB.push();

  newUserDetails.set({
    name: name,
    comment: comment,
    counter: counter
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
