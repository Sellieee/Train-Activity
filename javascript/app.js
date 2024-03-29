$(document).ready(function () {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBFNQUsOpMK3CSNrfbBqyh28qfMG27ULBw",
        authDomain: "project-2-618f5.firebaseapp.com",
        databaseURL: "https://project-2-618f5.firebaseio.com",
        projectId: "project-2-618f5",
        storageBucket: "",
        messagingSenderId: "212863931586",
        appId: "1:212863931586:web:0d52e932ab280d42"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();
    $("#form-submit").on("click", function (event) {
        event.preventDefault();

        // Grabbing the user input from the form and removing the spaces before and after
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#trainTime").val().trim();
        var frequency = $("#frequency").val().trim();

        database.ref().push({
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
        });
    });

    database.ref().on("child_added", function (snapshot) {
        // Test to see if the input values from the form are displaying correctly in console.log
        // console.log(snapshot.val().name);
        // console.log(snapshot.val().destination);
        // console.log(snapshot.val().firstTrain);
        // console.log(snapshot.val().frequency);
        var name = (snapshot.val().name);
        var destination = (snapshot.val().destination);
        var firstTrain = (snapshot.val().firstTrain);
        var frequency = (snapshot.val().frequency);


        // Stating the current time
        var currentTime = moment();

        // First Train in military time
        var firstTrainMilitary = moment(snapshot.val().firstTrain, "HH:mm A").subtract(1, "years");

        // Calculating the difference between the first train and now
        var diffTime = currentTime.diff(moment(firstTrainMilitary), "minutes");

        // Time remaining = difference divided by train frequency
        var remaining = diffTime % parseInt(snapshot.val().frequency, 10);

        // Calculating the time (minutes) the next available train will be
        var minutesAway = parseInt(snapshot.val().frequency, 10) - remaining;

        // Next train = current time + minutes the next train will arrive 
        var arrive = currentTime.add(minutesAway, "minutes").format("HH:mm");

        // Appending the user inputs to the rows in #schedule
        $("#schedule").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrive +
            "</td><td>" + minutesAway + "</td></tr>")
    });

})