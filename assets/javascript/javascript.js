// get difference in time between the start time (input) and current time. 
// convert that difference into minutes = duration
// duration mod frequency to get TimeRemainder

// 
// duration = difference in CurrentTime and Start Time(input)
// timeRemainder = duration mod frequency.
// Minutes Away = (frequency - timeRemainder)
// Next Arrival = Current Time + Minutes Away


var config = {
    apiKey: "AIzaSyCV9lE2mZCUls3-92WCQpqSXS0YESTxw0Y",
    authDomain: "trainscheduler-48e20.firebaseapp.com",
    databaseURL: "https://trainscheduler-48e20.firebaseio.com",
    projectId: "trainscheduler-48e20",
    storageBucket: "trainscheduler-48e20.appspot.com",
    messagingSenderId: "67603613531"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  database.ref().on("value", function(snapshot) {
    // Print the initial data to the console.
    console.log(snapshot.val());
  });


  database.ref().on("child_added",function(childSnap){
      let key = childSnap.key;
      
      name = childSnap.val().name
      destination = childSnap.val().destination
      time = childSnap.val().time
      frequency = childSnap.val().frequency

    let first = moment(time, "HH:mm");

    let currentTime = moment();
    console.log("current time: " + currentTime);

    let duration = moment.duration(currentTime.diff(first));
    // let duration = currentTime.diff(moment(timeMinutes), "minutes");
    console.log("duration: " + duration);

    let timeMinutes = duration.asMinutes();
    // let timeMinutes = moment(time, "HH:mm").subtract(1, "years");
    console.log("Time in Minutes: " + timeMinutes);

    let timeRemainder = timeMinutes % frequency;
    console.log(timeRemainder);
    

    let minutesAway = Math.floor(frequency - timeRemainder);
    console.log(minutesAway + " Minutes Away");

    let nextArrival = currentTime.add(minutesAway, "minutes").format("hh:mm a");
    console.log("Next Arrival Time: " + nextArrival);


      $("#table-body").append("<tr id='"+ key + "'><td><button key='" + key + "'class='delete'>X</button></td><td>"+ name +"</td><td>"+ destination +"</td><td>"+ frequency +"</td><td>"+ nextArrival +"</td><td>"+ minutesAway +"</td>")
    })

function addEmployee(event){
    event.preventDefault()
    let name = $('#name-input').val();
    let destination = $('#destination-input').val();
    let time = $('#time-input').val();
    let frequency = $('#frequency-input').val();  

    database.ref().push({
        name,
        destination,
        time,
        frequency
    })

}

function removeEmployee() {
    let buttonKey = $(this).attr('key')
    database.ref().child(buttonKey).remove();
    $('#'+buttonKey).remove()
}



$(document).on("click", ".delete", removeEmployee);
$("#add-employee").on("click",addEmployee)