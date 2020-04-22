var users = new Array();
var passwords = new Array();
var uName;
var uPass;

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
            

        },
          email: {
            required: true,
            email: true
          },
          psw: {
            required: true,
            minlength: 6,
            lettersAndNumbers: true,
            
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

      uName = $("#userName").val();
      localStorage.setItem("uName",uName);
      // users.push(uName);
      uPass = $("#psw").val();
      localStorage.setItem("uPass",uPass);
      passwords.push(uPass);
      
      // let value1 = $("#userName").val(); 
      // users.insert(1,value1);
      // let password2 = $("#psw").val();
      // passwords,insert(1,password2);
      

      
    
}

function checkUser(){
    
    
    $("#logR").validate({

                // required: true
                // //  params: ["#psw2"],   
                // // userExists: params

        rules: {
            userName2:{
              required:true,
              userExists: ['psw2']

            } ,
            psw2: {
              required: true,

            }
          },
          messages: {
            userName2: {
              required:"Please enter your user name",
            },
            psw2: {
              required: "Please provide a password",
            }

          },
          errorPlacement: function (error, element) {
              error.insertBefore(element);
            }
    });
    
    
}

function welcome(){
  $("#registerPage").css("display","none");
  $("#loginPage").css("display","none");
  $("#gameWindow").css("display","none");
  $("#open").css("display", "initial");
}

function register() 
{

 $("#open").css("display", "none");
 $("#loginPage").css("display","none");
 $("#gameWindow").css("display","none");
 $("#registerPage").css("display","initial");
}   

function logIn() 
{
 $("#open").css("display", "none");
 $("#registerPage").css("display","none");
 $("#gameWindow").css("display","none");
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


$.validator.addMethod('userExists',function(value,element,param){
    users[1]=localStorage.getItem("uName");
    passwords[1]=localStorage.getItem("uPass");

    if(!users.includes(value)){
        return false;
    }
    let index = users.indexOf(value);
    let pass = $('#'+param[0]).val();
    if(pass!=(passwords[index])){
        return false;
    }
    return true;
},
'Wrong user name or password')


function openDialog() { 
  // document.getElementById("about").showModal(); 
 
    // $( "#about" ).dialog();

    $("#modelBox").css("display","block");
    

}

function closeDialog(){
  $("#modelBox").css("display","none");
}




