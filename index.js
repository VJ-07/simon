 var buttonColors = ["green", "red", "yellow", "blue"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

var score = 0;

$(document).keypress( function(){
  if(!started){
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});




$(".btn").click(function(){
  var clickedButton = $(this).attr("id");
  userClickedPattern.push(clickedButton);
  playSound(clickedButton);
  animatePress(clickedButton);

  checkAnswer(userClickedPattern.length - 1);
});



function checkAnswer(currentLevel) {


    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);
        score += 20;
      }

    } else {

      playSound("wrong");
      $("body").addClass("game-over");

      $("#level-title").text("Game Over Your score is " + score + " , Press Any Key to Restart");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 2000);
      startOver();
    }

}


 function nextSequence(){
   userClickedPattern = [];
  level ++;

  $("#level-title").text("level " + level + " score " + score);

   var randomNumber = Math.floor(Math.random() * 4);
   var randomChosenColor = buttonColors[randomNumber];

   gamePattern.push(randomChosenColor);
   $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
   playSound(randomChosenColor);
   animatePress(randomChosenColor);
 }

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function startOver(){
   started = false;
   level = 0;
   gamePattern = [];
   score = 0;

}
