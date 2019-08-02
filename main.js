var firebaseConfig = {
  apiKey: "AIzaSyD2vlzUQI__PzzGTG9WQQP8d_7ik9T7PTY",
  authDomain: "trainscheduler-83f65.firebaseapp.com",
  databaseURL: "https://trainscheduler-83f65.firebaseio.com",
  projectId: "trainscheduler-83f65",
  storageBucket: "",
  messagingSenderId: "121462351943",
  appId: "1:121462351943:web:25327f48539a3a25"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();


// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var empName = $("#employee-name-input")
    .val()
    .trim();
  var empRole = $("#role-input")
    .val()
    .trim();
  var empStart = 
    $("#start-input")
      .val()
      .trim();
      
  var empRate = $("#rate-input")
    .val()
    .trim();
    

  // Creates local "temporary" object for holding employee data
  var newEmp = {
    name: empName,
    role: empRole,
    rate: empRate,
    start: empStart
  };

  // Uploads employee data to the database
  database.ref().push(newEmp);

  // Logs everything to console
  console.log(newEmp.name);
  console.log(newEmp.role);
  console.log(newEmp.start);
  console.log(newEmp.rate);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var empName = childSnapshot.val().name;
  var empRole = childSnapshot.val().role;
  var empStart = childSnapshot.val().start;
  var empRate = childSnapshot.val().rate;

  // Employee Info
  console.log(empName);
  console.log(empRole);
  console.log(empStart);
  console.log(empRate);

  // Prettify the employee start
  // var empStartPretty = moment.unix(empStart).format("HH:mm");
  var firstTimeConverted = moment(empStart, "HH:mm").subtract(1, "minutes");
  console.log(firstTimeConverted);
  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % empRate;
  var tMinutesTillTrain = empRate - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var empTimeAway = moment(nextTrain).format("hh:mm");
  console.log(empTimeAway);

  // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(empName),
    $("<td>").text(empRole),
    $("<td>").text(empRate),
    $("<td>").text(firstTimeConverted),
    $("<td>").text(empTimeAway),
    // $("<td>").text(empBilled)
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});
