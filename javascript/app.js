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
        var nTrain = (snapshot.val().name);
        var nDestination = (snapshot.val().destination);
        var nFirstTrain = (snapshot.val().firstTrain);
        var nFrequency = (snapshot.val().frequency);

        // Time for first train is also in military time hh:mm
        var startTime = moment(nFirstTrain, "hh:mm");

        // Stating the current time
        var currentTime = moment();

        // Calculating the difference between the first train and now
        var diffTime = moment().diff(moment(startTime), "minutes");

        // Time remaining = difference divided by train frequency
        var timeRemain = diffTime % nFrequency;

        // Calculating the time (minutes) the next available train will be
        var minutesAway = nFrequency - timeRemain;

        // Next train = current time + minutes the next train will arrive 
        var nextTrain = moment().add(minutesAway, "minutes");

        // Time that the train will arrive is formatted to military time.
        var trainArrive = moment(nextTrain).format("hh:mm");

        var appendTr = $("<tr>");
        var nameTd = $("<td>").text(snapshot.val().name);
        var destinationTd = $("<td>").text(snapshot.val().destination);
        var frequencyTd = $("<td>").text(snapshot.val().frequency);
        // var nextArrivalTd = $("<td>").text()
        var minutesAwayTd = $("<td>").text(minutesAway);
    });

})