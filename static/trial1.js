const firebaseConfig = {
  const mySecret = process.env['apiKey']
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
  sendDataToFlaskAndFirebase(name, comment, counter);
  document.getElementById("MainContent").reset();
}

const sendDataToFlaskAndFirebase = (name, comment, counter) => {
    // Send data to Flask server for hate speech detection
    fetch('/detect-hate-speech', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: name,
            text: comment
        })
    })
    .then(response => response.json())
    .then(result => {
        // Save the data to Firebase
        saveMessages(name, comment, counter);
    })
    .catch(error => console.error('Error:', error));
};

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
