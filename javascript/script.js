$(document).ready(function(){
  
  //initialize the firebase app
  var conf = {
    apiKey: "AIzaSyA27T5BtrS0Q4xC1QL-HlfDG4-HekbgLFg",
     authDomain: "login-d55e2.firebaseapp.com",
    databaseURL: "https://login-d55e2.firebaseio.com",
    projectId: "login-d55e2",
    storageBucket: "login-d55e2.appspot.com",
    messagingSenderId: "1029851881657",
    appId: "1:1029851881657:web:abac5cb4c80c4664"
  };
  firebase.initializeApp(conf);

  //create firebase references
  var Auth = firebase.auth(); 
  var dbRef = firebase.database();
  var usersRef = dbRef.ref('users')
  var auth = null;

  //Register
  $('#registerForm').on('submit', function (e) {
e.preventDefault();
    $('#registerModal').modal('hide');
  
    $('#messageModalLabel').html(spanText('<i class="fa fa-cog fa-spin"></i>', ['center', 'info']));
    $('#messageModal').modal('show');
    var data = {
      email: $('#registerEmail').val(), //get the email from Form
      firstName: $('#registerFirstName').val(), // get firstName
      lastName: $('#registerLastName').val(), // get lastName
    };
    var passwords = {
      password : $('#registerPassword').val(), //get the pass from Form
      cPassword : $('#registerConfirmPassword').val(), //get the confirmPass from Form
    }
    if( data.email != '' && passwords.password != ''  && passwords.cPassword != '' ){
      if( passwords.password == passwords.cPassword ){
        //create the user
        
        firebase.auth()
          .createUserWithEmailAndPassword(data.email, passwords.password)
          .then(function(user) {
            return user.updateProfile({
              displayName: data.firstName + ' ' + data.lastName
            })
          })
          .then(function(user){
            //now user is needed to be logged in to save data
            auth = user;
            //now saving the profile data
            usersRef.child(user.uid).set(data)
              .then(function(){
                console.log("User Information Saved:", user.uid);
              })
            $('#messageModalLabel').html(spanText('Success!', ['center', 'success']))
            
            $('#messageModal').modal('hide');
          })
          .catch(function(error){
            console.log("Error creating user:", error);
            $('#messageModalLabel').html(spanText('ok'))
          });
      } else {
        //password and confirm password didn't match
        $('#messageModalLabel').html(spanText("ERROR: Passwords didn't match", ['danger']))
      }
    }  
  });

  //Login
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();
    $('#loginModal').modal('hide');

    $('#messageModalLabel').html(spanText('<i class="fa fa-cog fa-spin"></i>', ['center', 'info']));
    $('#messageModal').modal('show');

    if( $('#loginEmail').val() != '' && $('#loginPassword').val() != '' ){
      //login the user
      var data = {
        email: $('#loginEmail').val(),
        password: $('#loginPassword').val()
      };
      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(function(authData) {
          auth = authData;
          $('#messageModalLabel').html(spanText('Success!', ['center', 'success']))
          $('#messageModal').modal('hide');
        }) .then(function() {  window.location.href = "firstPage.html";})
        .catch(function(error) {
          console.log("Login Failed!", error);
          $('#messageModalLabel').html(spanText('ERROR: '+error.code, ['danger']))
        });
    }
  });
//logout
  $('#logout').on('click', function(e) {
    e.preventDefault();
    firebase.auth().signOut()
    window.location.href = "index.html";
  });

 

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      auth = user;
    
      $('body').removeClass('auth-false').addClass('auth-true');
      usersRef.child(user.uid).once('value').then(function (data) {
        var info = data.val();
        if(user.photoUrl) {
          $('.user-info img').show();
          $('.user-info img').attr('src', user.photoUrl);
          $('.user-info .user-name').hide();
        } else if(user.displayName) {
 
          $('.user-info img').hide();
          $('.user-info').append('<span class="user-name">'+user.displayName+'</span>');
       
        } else if(info.firstName) {
         
          $('.user-info img').hide();
          $('.user-info').append('<span class="user-name">'+info.firstName+'</span>');
        
        }
      });
     
    } else {
      // No user is signed in.
   //   $('body').removeClass('auth-true').addClass('auth-false');
  
      auth = null;
    }
  });
});


 

//message that shows error or success
function spanText(textStr, textClasses) {
  var classNames = textClasses.map(c => 'text-'+ c).join(' ');
  return '<span class="'+classNames+'">'+ textStr + '</span>';
}

