var context; // הבריסטול עליו "מציירים" 
var shape = new Object(); // אובייקט דינאמי בו נשמור את המיקום של הפאקמן
var board; // מערך דו מימדי המחזיקה את תמונת המצב
var score; // תוצאת השחקן
var pac_color;// צבע הפקמן
var start_time; //הזמן שהתחלנו
var time_elapsed; // הזמן שנשאר למשחק
var interval; // הרצת פונקציה של עדכון המשחק בצורה מחזורית בהתאם לזמן והפעולות
var before;

var userName;
var left=37;
var right=39;
var up=38;
var down=40;
var food_remain=90;
var mainp= "#7FFFD4";
var middlep="#FF6347";
var lowp="#C0C0C0";
var gameTime=60;
var numMonster=1;
var virusPic=new Image();
var life=5;
var pills=new Image();
var clock=new Image();



function Start() {
	console.log(numMonster);
	board = new Array();
	score = 0;
	pac_color ="yellow";
	var cnt = 100; // אחוזים
	var pacman_remain = 1;// כמות הפעמים שמשנים את מקום הפקמן במשחק כמו בוליאני
	start_time = new Date();
	var monstersLeft=0;
	for (var i = 0; i < 14; i++) {  //// השמת קירות
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if(
				(i == 0 && j == 0) ||
				(i == 0 && j == 9) ||
				(i == 13 && j == 0) ||
				(i == 13 && j == 9) 
				
			){
				if(monstersLeft<numMonster){
					board[i][j]=3;
					monstersLeft++;
				}

			}
			else if ( 
				(i == 8 && j == 0) ||
				(i == 8 && j == 1) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2) ||
				(i==6 && j==8) ||
				(i==5 && j==8)
			) {
				board[i][j] = 4; ///  קירות=4
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) { /// אם המספר הרנדומלי הוא מעל אחוז האוכל שנשאר
					food_remain--;
					var randomColor=Math.random();
					if(randomColor>=0.9){
						board[i][j] = 5; /// lowP
					}else if( randomColor>=0.6 && randomColor<0.9){
						board[i][j] = 6;// middleP
					}
					else{
					board[i][j] = 1; // mainP
					}
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) { 
					/// אם הפקמן עוד לא הוגדר
					shape.i = i; // שמירת מיקום הפקמן
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2; /// מיקום הפקמן = 2
				} else {
					board[i][j] = 0; // חלק ריק
				}
				//cnt--;
			}
		}
	}
	while (food_remain > 0) { // למקרה ונשאר עוד אוכל לחלק
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	for(var i=0; i<2;i++){
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]]=7; //// 7=pills
	}
	for(var i=0; i<2;i++){
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]]=8; //// 8=clock
	}


	keysDown = {}; // מילון שמחזיק listener
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true; // כדי לדעת שמקש נלחץ
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false; // המשתמש עזב את האצבע מהמקש
		},
		false
	);
	interval = setInterval(UpdatePosition, 250); // כל 250 מיל שניות ישנה את מיקום הפקמן
}




function findRandomEmptyCell(board) { // מוצאת תאים רנדומלים ריקים
	var i = Math.floor(Math.random() * 13 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 13 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {

	if (keysDown[up]) {
		return 1;
	}
	if (keysDown[down]) {
		return 2;
	}
	if (keysDown[left]) {
		return 3;
	}
	if (keysDown[right]) {
		return 4;
	}

}

function Draw(y) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score; // עדכון התוצאה
	lblTime.value = time_elapsed; // עדכון הזמן
	for (var i = 0; i < 14; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object(); // איפה מציירים
			center.x = i * 60 + 30; 
			center.y = j * 60 + 30;
			if (board[i][j] == 2) { // אם אנחנו איפה שהפקמן אמור להיות 
				if(y==1){
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.15 * Math.PI-0.5*Math.PI, 1.85 * Math.PI-0.5*Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill(); // מסיים לצייר את הפקמן
					context.beginPath(); /// ציור העין של הפקמן
					context.arc(center.x -15, center.y -5, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
					temp=y;
				}
				else if (y==2){
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.15 * Math.PI+0.5*Math.PI, 1.85 * Math.PI+0.5*Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill(); // מסיים לצייר את הפקמן
					context.beginPath(); /// ציור העין של הפקמן
					context.arc(center.x +15, center.y -5, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				else if(y==3){
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.15 * Math.PI+Math.PI, 1.85 * Math.PI+Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill(); // מסיים לצייר את הפקמן
					context.beginPath(); /// ציור העין של הפקמן
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				else if(y==4) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill(); // מסיים לצייר את הפקמן
					context.beginPath(); /// ציור העין של הפקמן
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}

			
		

			} else if (board[i][j] == 1) { // ציור האוכל
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = mainp; //color
				context.fill();
			} else if (board[i][j] == 4) { // קירות
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}else if(board[i][j] == 5){ /// lowP
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = lowp; //color
				context.fill();
			} else if(board[i][j] == 6){// middle point
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = middlep; //color
				context.fill();
			}
			else if(board[i][j]==3){
				context.drawImage(virusPic,center.x-25,center.y-25,60,60);
			} /// virus
			else if(board[i][j]==7){
				context.drawImage(pills,center.x-25,center.y-25,50,50);
			}
			else if(board[i][j]==8){
				context.drawImage(clock,center.x-25,center.y-25,50,50);
			}
		}
	}
}

function UpdatePosition() {
	foodCount=$("#food").val();
	console.log(foodCount);
	board[shape.i][shape.j] = 0; // מוחקים את פקמן מהמערך
	var x = GetKeyPressed(); //  מושכים את המיקום האחרון של הפקמן ומשנים את המיקום בהתאם
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 13 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {  // אם זה אוכל נעדכן את הניקוד של המשתמש
		score=score+5;
	} else if (board[shape.i][shape.j] == 5) {  // אם זה אוכל נעדכן את הניקוד של המשתמש
		score=score+25;
	}else if (board[shape.i][shape.j] == 6) {  // אם זה אוכל נעדכן את הניקוד של המשתמש
		score=score+15;
	}else if(board[shape.i][shape.j]==3){
		score=score-10;
		life--;
	} else if(board[shape.i][shape.j]==7){
		life++;
		score=score+5;
	}
	else if(board[shape.i][shape.j]==8){
			gameTime=gameTime+30;
	}
	
	board[shape.i][shape.j] = 2; // משנים את מיקום הפקמן במערך
	var currentTime = new Date(); 
	time_elapsed = (currentTime - start_time) / 1000; // כמות הזמן שנשארת
	if(life==0){
		window.clearInterval(interval);
			window.alert("Loser!");
	}
	if(time_elapsed>gameTime){
		if(score<=100){
			window.clearInterval(interval);
			window.alert("Yoa are better than " + score + " points!");
		}
		else{
			window.clearInterval(interval);
			window.alert("Winner!");
		}
		 /// בגלל הזמן
	}
	// if (score >= 20 && time_elapsed <= 10) { // הפקמן יהפוך לירוק אם התנאי מתקיים
	// 	pac_color = "green";
	// }
	// if (score == 50) { ///// סוף המשחק ומאפס את  האינטרוול
	// 	window.clearInterval(interval);
	// 	window.alert("Game completed");
	// }
	 else {
		if(x!=undefined){
			before=x;
			Draw(x);
		}
		else{
			Draw(before);
		}
		 /// אם המשחק לא הסתיים נצייר את המשחק על הקנבס
	}
}
function game() 
{

 $("#open").css("display", "none");
 $("#registerPage").css("display","none");
 $("#loginPage").css("display","none");
 $("#settings").css("display","none");
 $("#gameC").css("display","block");
 context = canvas.getContext("2d");
 before=4;
 setVariables();
 
 
} 


function setVariables(){
	mainp=$("#mainC").val();
	food_remain= $("#food").val();
	userName=$("#userName2").val();
	middlep=$("#middleC").val();
	lowp=$("#lowC").val();
	gameTime=$("#gameTime").val();
	numMonster=$("#monsterNum").val();
	virusPic.src="images/virus1.png";
	pills.src="images/pill.png"
	clock.src="images/clock.png"

	Start();
}

function randomSettings(){
	document.getElementById("food").value=50;
	document.getElementById("mainC").value="#6495ED";
	document.getElementById("middleC").value="#FF69B4";
	document.getElementById("lowC").value="#D3D3D3";
	document.getElementById("monsterNum").value=1;
	document.getElementById("gameTime").value=60;
	game();
}


function checkSetting(){

    $("#settingForm").validate({

        rules: {
            up:{
              required:true,
            } ,
            down: {
              required: true,
			},
			right:{
				required: true,
			},
			left:{
				required: true,
			},
			food:{
				required: true,
			},
			gameTime:{
				required: true,
			}

          },
          submitHandler: function(){
			var inputup = $("#up").val();
			window.up = inputup.charCodeAt()-32;
			var inputdown = $("#down").val();
			window.down = inputdown.charCodeAt()-32;
			var inputleft = $("#left").val();
			window.left = inputleft.charCodeAt()-32;
			var inputright = $("#right").val();
			window.right = inputright.charCodeAt()-32;
			game();
          },
          messages: {
            
          
          },
          errorPlacement: function (error, element) {
              error.insertBefore(element);
            }

   
    });
 

}
    


