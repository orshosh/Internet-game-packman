var context; // הבריסטול עליו "מציירים" 
var shape = new Object(); // אובייקט דינאמי בו נשמור את המיקום של הפאקמן
var board; // מערך דו מימדי המחזיקה את תמונת המצב
var score; // תוצאת השחקן
var pac_color;// צבע הפקמן
var start_time; //הזמן שהתחלנו
var time_elapsed; // הזמן שנשאר למשחק
var interval; // הרצת פונקציה של עדכון המשחק בצורה מחזורית בהתאם לזמן והפעולות
var before;
var interval2;

var userName;
var left=37;
var right=39;
var up=38;
var down=40;
var food_remain=50;
var mainp= "#7FFFD4";
var middlep="#FF6347";
var lowp="#C0C0C0";
var gameTime=60;
var numMonster=1;
var virusPic=new Image();
var life=5;
var pills=new Image();
var clock=new Image();
var randomSet = false;

var upName="ArrowUp";
var downName="ArrowDown";
var rightName="ArrowRight";
var leftName="ArrowLeft";

var monsterArray= new Array();
monsterArray[0] = new Object();
monsterArray[1] = new Object();
monsterArray[2] = new Object();
monsterArray[3] = new Object();

var wasFood=new Array();
wasFood[0]=0;
wasFood[1]=0;
wasFood[2]=0;
wasFood[3]=0;

var monsterStart= new Array();
monsterStart[0] = new Object();
monsterStart[1] = new Object();
monsterStart[2] = new Object();
monsterStart[3] = new Object();

var alcogel=new Object();
var alco=new Image();
var alcoFood=0;
var wasEaten=false;

var music=new Audio("images/music.mp3");

function Start() {
	life=5;
	board = new Array();
	wasEaten=false;
	score = 0;
	setMovingMonsterArray();
	pac_color ="yellow";
	var cnt = 140; // אחוזים
	var pacman_remain = 1;// כמות הפעמים שמשנים את מקום הפקמן במשחק כמו בוליאני
	start_time = new Date();
	var monstersLeft=0;
	var foodCount=food_remain;
	for (var i = 0; i < 14; i++) {  //// השמת קירות
		board[i] = new Array();
		for (var j = 0; j < 8; j++) {

			if((i == 13 && j == 7 && numMonster<4) ){
				board[i][j]=9; //// alcogel
				alcogel.x=i;
				alcogel.y=j;
			}
			else if(//monsters
				(i == 0 && j == 0) ||
				(i == 0 && j == 7) ||
				(i == 13 && j == 0) ||
				(i == 13 && j == 7) 
				
			){
				if(monstersLeft<numMonster){
					board[i][j]=3;
					monsterArray[monstersLeft].x=i;
					monsterArray[monstersLeft].y=j;
					monstersLeft++;

				}

			}
			else if((i == 13 && j == 6 && numMonster==4) ){
				board[i][j]=9; //// alcogel
				alcogel.x=i;
				alcogel.y=j;
			}
		
			else if ( 
				(i == 8 && j == 0) ||
				(i == 8 && j == 1) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2) ||
				(i==6 && j==7) ||
				(i==5 && j==7) ||
				(i==12 && j==6)||
				(i==12 && j==7)||
				(i==13 && j==2)||
				(i==12 && j==2)||
				(i==11 && j==2)||
				(i==11 && j==3)||
				(i==2 && j==0)||
				(i==2 && j==1)||
				(i==3 && j==1)||
				(i==1 && j==7) ||
				(i==1 && j==6)||
				(i==1 && j==5)||
				(i==8 && j==4)
		
			) {
				board[i][j] = 4; ///  קירות=4
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * foodCount) / cnt) { /// אם המספר הרנדומלי הוא מעל אחוז האוכל שנשאר
					foodCount--;
					var randomColor=Math.random();
					if(randomColor>=0.9){
						board[i][j] = 5; /// lowP
					}else if( randomColor>=0.6 && randomColor<0.9){
						board[i][j] = 6;// middleP
					}
					else{
					board[i][j] = 1; // mainP
					}
				} else if (randomNum < (1.0 * (pacman_remain + foodCount)) / cnt) { 
					/// אם הפקמן עוד לא הוגדר
					shape.i = i; // שמירת מיקום הפקמן
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2; /// מיקום הפקמן = 2
				} else {
					board[i][j] = 0; // חלק ריק
				}
				cnt--;
			}
		}
	}
	while (foodCount > 0) { // למקרה ונשאר עוד אוכל לחלק
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		foodCount--;
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
			e.preventDefault();
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false; // המשתמש עזב את האצבע מהמקש
			e.preventDefault();
		},
		false
	);
	if(shape.i == undefined || shape.j == undefined){
		shape.i =4;
		shape.j = 4;
	}
	interval=setInterval(UpdatePosition,250);
	
}

function setMovingMonsterArray(){
	monsterStart[0].x=0;
	monsterStart[0].y=0;
	monsterStart[1].x=0;
	monsterStart[1].y=7;
	monsterStart[2].x=13;
	monsterStart[2].y=0;
	monsterStart[3].x=13;
	monsterStart[3].y=7;
}


function findRandomEmptyCell(board) { // מוצאת תאים רנדומלים ריקים
	var i = Math.floor(Math.random() * 13 + 1);
	var j = Math.floor(Math.random() * 7 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 13 + 1);
		j = Math.floor(Math.random() * 7 + 1);
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
// function welcomeDrow(){
// 	openCanvas.width = openCanvas.width;
// 	context.beginPath();
// 	context.arc(0, 0, 30, 0.15 * Math.PI+0.5*Math.PI, 1.85 * Math.PI+0.5*Math.PI); // half circle
// 	context.lineTo(0, 0);
// 	context.fillStyle = yellow; //color
// 	context.fill(); // מסיים לצייר את הפקמן
// 	context.beginPath(); /// ציור העין של הפקמן
// 	context.arc(0 +15, 0 -5, 5, 0, 2 * Math.PI); // circle
// 	context.fillStyle = "black"; //color
// 	context.fill();
// }

function Draw(y) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score; // עדכון התוצאה
	lblTime.value =parseInt(gameTime-time_elapsed); 
	if(lblTime.value <= 10){
		$("#lblTime").css("color","red");
		$("#lblTime").css("font-weight","bold");
	}else{
		$("#lblTime").css("color","black");
		$("#lblTime").css("font-weight","normal");

	}
	playerName.value=userName;
	lives.value=life;
	monster.value=numMonster;
	numFood.value=food_remain;
	highP.value=lowp;
	mediumP.value=middlep;
	lowP.value=mainp;
	upButton.value=upName;
	downButton.value=downName;
	leftButton.value=leftName;
	rightButton.value=rightName;
	for (var i = 0; i < 14; i++) {
		for (var j = 0; j < 8; j++) {
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
			else if(board[i][j]==7){/// pills
				context.drawImage(pills,center.x-25,center.y-25,50,50);
			}
			else if(board[i][j]==8){ /// timr
				context.drawImage(clock,center.x-25,center.y-25,50,50);
			}
			else if(board[i][j]==9){
				context.drawImage(alco,center.x-25,center.y-25,50,50);
			}
		}
	}
}

function randomMove(){
	var rand=Math.floor(Math.random() * 4 + 1);
	return rand;
}

function updateMonsters(){
	for( var i=0; i<numMonster; i++){
	var tempx=monsterArray[i].x;
	var tempy= monsterArray[i].y;
	var move=randomMove();
	board[monsterArray[i].x][monsterArray[i].y] = 0;
	if (move == 1) {
		if (monsterArray[i].y > 0 && board[monsterArray[i].x][monsterArray[i].y-1] != 4
			&& board[monsterArray[i].x][monsterArray[i].y-1] != 3 &&board[monsterArray[i].x][monsterArray[i].y-1] != 9) {
			monsterArray[i].y--;
		}
	}
	if (move == 2) {
		if (monsterArray[i].y < 7 && board[monsterArray[i].x][monsterArray[i].y + 1] != 4 &&
			board[monsterArray[i].x][monsterArray[i].y + 1] != 3 && board[monsterArray[i].x][monsterArray[i].y + 1] != 9) {
			monsterArray[i].y++;
		}
	}
	if (move == 3) {
		if (monsterArray[i].x > 0 && board[monsterArray[i].x - 1][monsterArray[i].y] != 4
			&& board[monsterArray[i].x - 1][monsterArray[i].y] != 3 && board[monsterArray[i].x - 1][monsterArray[i].y] != 9) {
			monsterArray[i].x--;
		}
	}
	if (move == 4) {
		if (monsterArray[i].x < 13 && board[monsterArray[i].x + 1][monsterArray[i].y] != 4
			&&board[monsterArray[i].x + 1][monsterArray[i].y] != 3 &&board[monsterArray[i].x + 1][monsterArray[i].y] != 9) {
			monsterArray[i].x++;
		}
	}
	
	board[tempx][tempy]=wasFood[i];
	

	wasFood[i]=board[monsterArray[i].x][monsterArray[i].y];


	board[monsterArray[i].x][monsterArray[i].y] = 3;
	
}
}

function moveAlco(){
		var tempx=alcogel.x;
		var tempy= alcogel.y;
		var move=randomMove();
		board[alcogel.x][alcogel.y] = 0;
		if (move == 1) {
			if (alcogel.y > 0 && board[alcogel.x][alcogel.y-1] != 4
				&& board[alcogel.x][alcogel.y-1] != 3) {
					alcogel.y--;
			}
		}
		if (move == 2) {
			if (alcogel.y < 7 && board[alcogel.x][alcogel.y + 1] != 4 &&
				board[alcogel.x][alcogel.y + 1] != 3) {
					alcogel.y++;
			}
		}
		if (move == 3) {
			if (alcogel.x > 0 && board[alcogel.x - 1][alcogel.y] != 4
				&& board[alcogel.x - 1][alcogel.y] != 3) {
					alcogel.x--;
			}
		}
		if (move == 4) {
			if (alcogel.x < 13 && board[alcogel.x + 1][alcogel.y] != 4
				&&board[alcogel.x + 1][alcogel.y] != 3) {
					alcogel.x++;
			}
		}
		
		board[tempx][tempy]=alcoFood;
		alcoFood=board[alcogel.x][alcogel.y];
	
		board[alcogel.x][alcogel.y] = 9;
		
	
}


function UpdatePosition() {
	board[shape.i][shape.j] = 0; // מוחקים את פקמן מהמערך
	var x = GetKeyPressed(); //  מושכים את המיקום האחרון של הפקמן ומשנים את המיקום בהתאם
	
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 7 && board[shape.i][shape.j + 1] != 4) {
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
	if(wasEaten==false){
		moveAlco();
	}

	updateMonsters();
	if (board[shape.i][shape.j] == 1) {  // אם זה אוכל נעדכן את הניקוד של המשתמש
		score=score+5;
	} else if (board[shape.i][shape.j] == 5) {  // אם זה אוכל נעדכן את הניקוד של המשתמש
		score=score+25;
	}else if (board[shape.i][shape.j] == 6) {  // אם זה אוכל נעדכן את הניקוד של המשתמש
		score=score+15;
	}else if(board[shape.i][shape.j]==3){ /// מפלצת
		score=score-10;
		life--;
		shape.i=4;
		shape.j=4;
		for( var n=0; n<numMonster;n++){
			board[monsterArray[n].x][monsterArray[n].y]=0;
			monsterArray[n].x=monsterStart[n].x;
			monsterArray[n].y=monsterStart[n].y;
			board[monsterStart[n].x][monsterStart[n].y]=3;
		}
		

	} else if(board[shape.i][shape.j]==7){
		life++;
		score=score+5;
	}
	else if(board[shape.i][shape.j]==8){
			gameTime=Number(gameTime)+30;
	}else if(board[shape.i][shape.j]==9){
		score=score+50;
		wasEaten=true;
}


	
	board[shape.i][shape.j] = 2; // משנים את מיקום הפקמן במערך
	var currentTime = new Date(); 
	time_elapsed = (currentTime - start_time) / 1000; // כמות הזמן שנשארת
	
	if(life==0){
		window.clearInterval(interval);
		music.pause();
		$("#loser").css("display","block");
	}
	if(time_elapsed>gameTime){
		if(score<=100){
			window.clearInterval(interval);
			timeEnd();
		}
		else{
			window.clearInterval(interval);
			music.pause();
			$("#win").css("display","block");
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
function timeEnd(){
	timeDialog.innerText="Yoa are better than " + score + " points!";
	music.pause();
	$("#timeout").css("display","block");
}
function game() 
{
$("#timeout").css("display","none");
$("#win").css("display","none");
$("#loser").css("display","none");
 $("#open").css("display", "none");
 $("#registerPage").css("display","none");
 $("#loginPage").css("display","none");
 $("#settings").css("display","none");
 $("#gameC").css("display","block");
 $("footer").css("display","none");
 context = canvas.getContext("2d");
 before=4;
setVariables();
 
} 


function setVariables(){
	window.clearInterval(interval);
	mainp=$("#mainC").val();
	food_remain= $("#food").val();
	userName=$("#userName2").val();
	middlep=$("#middleC").val();
	lowp=$("#lowC").val();
	gameTime=$("#gameT").val();
	numMonster=$("#monsterNum").val();
	virusPic.src="images/virus1.png";
	pills.src="images/pill.png";
	clock.src="images/clock.png";
	alco.src="images/alco.png";
	music.currentTime=0;
	music.play();
	// music.setAttribute("src","images/music.mp3");
	
	Start();
}

function randomSettings(){
	document.getElementById("food").value=50;
	document.getElementById("mainC").value="CornflowerBlue";
	document.getElementById("middleC").value="HotPink";
	document.getElementById("lowC").value="LightGray";
	document.getElementById("monsterNum").value=1;
	document.getElementById("gameT").value=60;
	game();
}

function getKeyboard(){

		$("#up").click(function(){
			$("#keyMassege").fadeIn();
		})
		$("#up").keyup(function(event){
			if(event.keyCode == 32){
				$("#up").attr('value','space');
				upName="space";
			}else{
				$("#up").attr('value',event.key);
				upName=event.key;
			}
		
			window.up = event.keyCode;
			$("#keyMassege").fadeOut();

		});

		$("#left").click(function(){
			$("#keyMassege").fadeIn();
		})
		$("#left").keyup(function(event){
			if(event.keyCode == 32){
				$("#left").attr('value','space');
				leftName="space";
			}else{
				$("#left").attr('value',event.key);
				leftName=event.key;
			}
			
			window.left = event.keyCode;
			$("#keyMassege").fadeOut();

		});

		$("#right").click(function(){
			$("#keyMassege").fadeIn();
		})
		$("#right").keyup(function(event){
			if(event.keyCode == 32){
				$("#right").attr('value','space');
				rightName="space";
			}else{
				$("#right").attr('value',event.key);
				rightName=event.key;
			}
		
			window.right = event.keyCode;
			$("#keyMassege").fadeOut();

		});

		$("#down").click(function(){
			$("#keyMassege").fadeIn();
		})
		$("#down").keyup(function(event){
			if(event.keyCode == 32){
				$("#down").attr('value','space');
				downName="space";
			}else{
				$("#down").attr('value',event.key);
				downName=event.key;
			}
		
			window.down = event.keyCode;
			$("#keyMassege").fadeOut();
		});

}


function checkSetting(){
	
    $("#settingForm").validate({

        rules: {
			food:{
				required: true,
			},
			gameT:{
				required: true,
			},
			monsterNum:{
				required:true,
			}

          },
          submitHandler: function(){
			game();
          },
          messages: {
            
          
          },
          errorPlacement: function (error, element) {
              error.insertAfter(element);
            }

   
    });
}
    


