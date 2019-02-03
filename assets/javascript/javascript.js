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
      console.log(key)
      name = childSnap.val().name
      role = childSnap.val().role
      date = childSnap.val().date
      let monthsWorked = moment().diff(date,"Months");
      rate = childSnap.val().rate
      let totalBilled = monthsWorked * rate;
      $("#table-body").append("<tr id='"+ key + "'><td><button key='" + key + "'class='delete'>X</button></td><td>"+ name +"</td><td>"+ role +"</td><td>"+ date +"</td><td>"+ monthsWorked +"</td><td>"+ rate +"</td><td>"+ totalBilled +"</td>")
    })

function addEmployee(event){
    event.preventDefault()
    let name = $('#name-input').val()
    let role = $('#role-input').val()
    let date = moment($('#date-input').val(),"YYYY-MM-DD").format("MM/DD/YYYY")
    let rate = $('#rate-input').val()    

    console.log(date)

    database.ref().push({
        name,
        role,
        date,
        rate
    })

}

function removeEmployee() {
    let buttonKey = $(this).attr('key')
    database.ref().child(buttonKey).remove();
    $('#'+buttonKey).remove()
}



$(document).on("click", ".delete", removeEmployee);
$("#add-employee").on("click",addEmployee)