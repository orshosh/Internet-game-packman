var userName;
var name;
var password;
var email;
var varifiedPassword;
var birthday;

function save() 
   {
      userName=document.getElementById("userName");
      name=document.getElementById("name");
      password=document.getElementById("psw");
      varifiedPassword=document.getElementById("psw-repeat");
      email=document.getElementById("email");
      birthday=document.getElementById("birthday");
    checkInput();

   }  

function checkInput(){
    if(user==null || name==null || password==null || varifiedPassword==null || email==null || birthday==null){
        alert("wronggggg");
    }
}
