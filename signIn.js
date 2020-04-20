var users = new Array();
var passwords = new Array();

$(document).ready(function() {
    users[0]="p";
    passwords[0]="p";

    
});



function checkInput(){
    $("#formR").validate({
        rules: {
          name:{
              required: true,
              onlyLetters:true
          },
          userName: "required",
          email: {
            required: true,
            email: true
          },
          psw: {
            required: true,
            minlength: 6,
            lettersAndNumbers: true
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

      let value1 = $("#userName").val(); 
      users[1]=value1;
      let password2 = $("#psw").val();
      passwords[1]=password2;
    
}

function checkUser(){
    
    $("#logR").validate({
        rules: {
            userName2:{
                // params: ["#psw2"],   
                userExists: ["userName2","#psw2"]
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
