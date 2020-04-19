var userName;
var name;
var password;
var email;
var varifiedPassword;
var birthday;

function saveInputs() 
   {
      userName=document.getElementsByName("userName");
      localStorage.getItem("userName",userName.values);
      name=document.getElementsByName("name");
      password=document.getElementsByName("psw");
      varifiedPassword=document.getElementsByName("psw-repeat");
      email=document.getElementsByName("email");
      birthday=document.getElementsByName("birthday");
      checkInput();

   }  

function checkInput(){
    if(userName.getItem == undefined|| name.getItem==undefined || password.getItem==undefined || varifiedPassword.getItem==undefined || email.getItem==undefined || birthday.getItem==undefined){
        alert("worng");
        
    }
}
