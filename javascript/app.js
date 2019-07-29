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
        console.log(snapshot.val());
        console.log(snapshot.val().name);
        console.log(snapshot.val().destination);
        console.log(snapshot.val().firstTrain);
        console.log(snapshot.val().frequency);
    })


})