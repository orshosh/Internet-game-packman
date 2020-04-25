var context; // הבריסטול עליו "מציירים" 
var shape = new Object(); // אובייקט דינאמי בו נשמור את המיקום של הפאקמן
var board; // מערך דו מימדי המחזיקה את תמונת המצב
var score; // תוצאת השחקן
var pac_color;// צבע הפקמן
var start_time; //הזמן שהתחלנו
var time_elapsed; // הזמן שנשאר למשחק
var interval; // הרצת פונקציה של עדכון המשחק בצורה מחזורית בהתאם לזמן והפעולות
var imageRight= new Image;
var before;


var left=37;
var right=39;
var up=38;
var down=40;
var balls;

$(document).ready(function() {

	context = canvas.getContext("2d");
	before=4;
	Start();
});

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100; // אחוזים
	food_remain=balls;
	//  food_remain=$('#settings').find('input[name="food"]').val();
	 console.log(food_remain);
	// food_remain=$("#food").val();// אוכל שיהיה במשחק
	var pacman_remain = 1;// כמות הפעמים שמשנים את מקום הפקמן במשחק כמו בוליאני
	start_time = new Date();
	for (var i = 0; i < 10; i++) {  //// השמת קירות
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if ( 
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4; ///  קירות=4
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) { /// אם המספר הרנדומלי הוא מעל אחוז האוכל שנשאר
					food_remain--;
					board[i][j] = 1; //// אוכל =1
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) { 
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
	while (food_remain > 0) { // למקרה ונשאר עוד אוכל לחלק
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
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
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	// $("#up").keyup(function(event){
	// 	window.up=event.keyCode;
	// });
	// $("#down").keyup(function(event){
	// 	window.down=event.keyCode;
	// });
	// $("#left").keyup(function(event){
	// 	window.left=event.keyCode;
	// });
	// $("#right").keyup(function(event){
	// 	window.right=event.keyCode;
	// });
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
	for (var i = 0; i < 10; i++) {
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
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) { // קירות
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
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
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {  // אם זה אוכל נעדכן את הניקוד של המשתמש
		score++;
	}
	board[shape.i][shape.j] = 2; // משנים את מיקום הפקמן במערך
	var currentTime = new Date(); 
	time_elapsed = (currentTime - start_time) / 1000; // כמות הזמן שנשארת
	if (score >= 20 && time_elapsed <= 10) { // הפקמן יהפוך לירוק אם התנאי מתקיים
		pac_color = "green";
	}
	if (score == 50) { ///// סוף המשחק ומאפס את  האינטרוול
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
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
 
//  up=document.getElementById("up").keyCode();
//  alert(up);
 
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
			}
          },
          submitHandler: function(form){
			 balls = $('#settings').find('input[name="food]').val();
			game();
          },
          messages: {
            
          
          },
          errorPlacement: function (error, element) {
              error.insertBefore(element);
            }

   
    });
 

  
    
}
