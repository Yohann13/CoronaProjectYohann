
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCwhWpmHJcvtv0JHfNngfMO08M82RhmSPI",
    authDomain: "yohann-corona-project-new.firebaseapp.com",
    databaseURL: "https://yohann-corona-project-new-default-rtdb.firebaseio.com",
    projectId: "yohann-corona-project-new",
    storageBucket: "yohann-corona-project-new.appspot.com",
    messagingSenderId: "816357415148",
    appId: "1:816357415148:web:d2a5938186a19bdf706dc9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  /*To read or write data in a db you need to create an instance of firebase.database.reference*/



  var UserInputsRef=firebase.database().ref('UserInputs')
  

  document.getElementById('testForm').addEventListener('submit',submitForm);
  function submitForm(e){ //this function is storing the data in variables
    e.preventDefault();

    // var fname=document.getElementById('firstname').value

    var fname =getInputVal('firstname'); //getInputVal()
    var lname =getInputVal('lastname');
    var mobile =getInputVal('mobile');
    var state =getInputVal('state');
    var email =getInputVal('email');
    var profession =getInputVal('profession');
    var dateofbirth =getInputVal('dateofbirth');
    var symptomsList =getSelectedCheckboxValues('symptoms');
    var selectedOption = document.querySelector('input[name = option]:checked').value;

    state=state.toLowerCase();
    readState(state); //this function will have code to fetch data from db

    var emailstatus=validateEmail(); //checks if email is valid, returns a boolean value

    //saveMessages() depending on the email id being valid
    if(emailstatus)
    saveMessages(fname+ " " +lname,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList);
}

//getting data from each input field in the form
function getInputVal(id){
  return document.getElementById(id).value;
}

function getSelectedCheckboxValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  let values = [];
  checkboxes.forEach((checkbox) => {
      values.push(checkbox.value);
  });
  return values;
}



//checks if email is valid, returns a boolean value
function validateEmail() 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(testForm.email.value))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}



//To read data at a path and listen for changes use on()
function readState(state){
    var centers;
    var ref = firebase.database().ref(state);
    ref.on('value', (data) => {
     centers = data.val();
     document.getElementById("result").innerHTML ="<br>" + centers.toUpperCase();
})

}



function saveMessages(name,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList){
   
  var newuserInputsRef = UserInputsRef.push();  
    newuserInputsRef.set({
      Name:name,
      Mobile:mobile,
      Email:email,
      Profession:profession,
      Dateofbirth:dateofbirth,
      SelectedOption:selectedOption,
      State:state, 
      SymptomsList:symptomsList
  })
    alert("Thank you, find the list of centers nearby!  ");
}



