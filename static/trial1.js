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
        // If result indicates hate or offensive speech, increment the counter
        if (result.result === "Hate Speech" || result.result === "Offensive Speech") {
            // Fetch user details and update the counter
            fetchAndUpdateCounter(name, comment, counter);
        } else {
            // No hate speech detected, simply save the message
            saveMessages(name, comment, counter);
        }
    })
    .catch(error => console.error('Error:', error));
};

const fetchAndUpdateCounter = (name, comment, counter) => {
    var usersRef = UserDetailsDB.child("Users").child(name);

    // Fetch all entries for the given username
    usersRef.once('value', function(snapshot) {
        var highestCounter = counter; // Initialize with current counter
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            highestCounter = Math.max(highestCounter, childData.counter);
        });

        // Increment the counter
        counter = highestCounter + 1;

        // Save the updated message with the incremented counter
        saveMessages(name, comment, counter);

      if (counter >= 3) {
          // Disable the comment text area
          document.getElementById("comment").disabled = true;
          // Show an alert
          alert("Your comments have been blocked due to detection of excessive hate and/or offensive speech");
      }
    });
};


const saveMessages = (name, comment, counter) => {
  var usersRef = UserDetailsDB.child("Users");

  // Push the data to the specified path
  var newUserDetails = usersRef.child(name).push();
  newUserDetails.set({
    name: name,
    comment: comment,
    counter: counter
  });
};


const getElementVal = (id) => {
  return document.getElementById(id).value;
};
