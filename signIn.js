var users = new Array();
var passwords = new Array();

$(document).ready(function() {
    users[0]="p";
    passwords[0]="p";
    $("registerPage").urlParams.append('page',1);

    
});



function checkInput(){
    $("#formR").validate({
        rules: {
          name:{
              required: true,
              onlyLetters:true
          },
          userName: {
              required: true,
              enterValueToArray: true
          },
          email: {
            required: true,
            email: true
          },
          psw: {
            required: true,
            minlength: 6,
            lettersAndNumbers: true,
            enterPassToArray: true
          },
          psw_repeat: {
              required: true,
              minlength:6,
              equalTo: "#psw"

          },
          birthday: "required"

        },
        messages: {
          name: {
              required: "Please enter your name",
          },
          userName: "Please enter your user name",
          psw: {
            required: "Please provide a password",
            minlength: "Your password must be at least 6 characters long"
          },
          email: "Please enter a valid email address",
          birthday: " Please enter a valid date",
        psw_repeat:{
                equalTo: "Please enter the same password again",
                required: "Please enter your password"
        } 
        },
        errorPlacement: function (error, element) {
            error.insertBefore(element);
          }
    
      });
    
}

function checkUser(){

    var p2 = document.getElementsByName("psw2");
    $("#logR").validate({
        rules: {
            userName2:{
                userExists: ["pr"]
            }
        },
    
        errorPlacement: function (error, element) {
            error.insertBefore(element);s
          }
    });
    
    
}

function register() 
{

 $("#open").css("display", "none");
 $("#loginPage").css("display","none");
 $("#registerPage").css("display","initial");
}   

function logIn() 
{
 $("#open").css("display", "none");
 $("#registerPage").css("display","none");
 $("#loginPage").css("display","initial");
 
 
} 

$.validator.addMethod('onlyLetters',function(value,elemnt){
    return this.optional(elemnt) || (value.match(/[a-zA-Z]/) && !value.match(/[0-9]/));
},
'Name must contains only letters');

$.validator.addMethod('lettersAndNumbers',function(value,element){
    return /[a-z].*[0-9]|[0-9].*[a-z]/i.test(value); 
},
'Password must contains letters and numbers')


$.validator.addMethod('userExists',function(value,element,params){
    if(!users.includes(param[0])){
        return false;
    }
    let index = users.indexOf(param[0]);
    if(!params[0].equalTo(passwords[index])){
        return false;
    }
    return true;
},
'Wrong user name or password')

$.validator.addMethod('enterValueToArray',function(value,elemnt){
    users.push(value);
   
});
$.validator.addMethod('enterPassToArray',function(value,elemnt){
    passwords.push(value);
});