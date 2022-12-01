const loginElement = document.querySelector('#login-form');
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector('#user-details');
const authBarElement = document.querySelector("#authentication-bar");

// Elements for sensor readings
const chartElement = document.getElementById("charti");
const voltElement = document.getElementById("volt");
const currElement = document.getElementById("curr");
const ledElement = document.getElementById("led");
const potElement = document.getElementById("pot");
const kwhElement = document.getElementById("kwh");

var dbPathLed;

// MANAGE LOGIN/LOGOUT UI
const setupUI = (user) => {
  if (user) {
    //toggle UI elements
    loginElement.style.display = 'none';
    contentElement.style.display = 'block';
    authBarElement.style.display ='block';
    userDetailsElement.style.display ='block';
    userDetailsElement.innerHTML = user.email;

    if (user.email == "carlanuza0038@gmail.com"){
      userDetailsElement.innerHTML = 'Carlos Lanuza';
    }
    

    // get user UID to get data from database
    var uid = user.uid;
    console.log(uid);

    // Database paths (with user UID)
    var dbPathchart = 'UsersData/' + uid.toString() + '/chart';
    var dbPathvoltaje = 'UsersData/' + uid.toString() + '/voltaje';
    var dbPathcorriente = 'UsersData/' + uid.toString() + '/corriente';
    var dbPathpotencia = 'UsersData/' + uid.toString() + '/potencia';
    var dbPathkwh = 'UsersData/' + uid.toString() + '/kwh';
    dbPathLed = 'UsersData/' + uid.toString() + '/led';


    // Database references
    var dbRefchart = firebase.database().ref().child(dbPathchart);
    var dbRefvoltaje = firebase.database().ref().child(dbPathvoltaje);
    var dbRefcorriente = firebase.database().ref().child(dbPathcorriente);
    var dbRefpotencia = firebase.database().ref().child(dbPathpotencia);
    var dbRefkwh = firebase.database().ref().child(dbPathkwh);
    //var dbPathLed = firebase.database().ref().child(dbPathLed);

    // Update page with new readings
    dbRefchart.on('value', snap => {

      tempElement.innerText = snap.val().toFixed(2);
      var x = (new Date()).getTime(),
      y= parseFloat(snap.val().toFixed(2));

         // y = parseFloat(this.responseText);
      //console.log(this.responseText);
      if(chartT.series[0].data.length > 40) {
        chartT.series[0].addPoint([x, y], true, true, true);
      } else {
        chartT.series[0].addPoint([x, y], true, false, true);
      }
    
    });

    dbRefvoltaje.on('value', snap => {
      voltElement.innerText = snap.val().toFixed(2);
    });

    dbRefcorriente.on('value', snap => {
      currElement.innerText = snap.val().toFixed(2);
    });

    dbRefpotencia.on('value', snap => {
      potElement.innerText = snap.val().toFixed(2);
    });

    dbRefkwh.on('value', snap => {
      kwhElement.innerText = snap.val().toFixed(2);
    });

  // if user is logged out
  } else{
    // toggle UI elements
    loginElement.style.display = 'block';
    authBarElement.style.display ='none';
    userDetailsElement.style.display ='none';
    contentElement.style.display = 'none';
  }
}
function toggleLed() {
  console.log("Toggle");
  if (ledElement.checked) 
  {
    console.log("led ON");
    firebase.database().ref(dbPathLed).set("ON");
  }
  else{
    console.log("led OFF");
    firebase.database().ref(dbPathLed).set("OFF");
  }
}

/*setInterval(function ( ) {
 
      var x = (new Date()).getTime(),
      y=5;
         // y = parseFloat(this.responseText);
      //console.log(this.responseText);
      if(chartT.series[0].data.length > 40) {
        chartT.series[0].addPoint([x, y], true, true, true);
      } else {
        chartT.series[0].addPoint([x, y], true, false, true);
      }
    
 
 
}, 1000 ) ;*/