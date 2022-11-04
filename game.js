var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var start=false; // CHECK WHETEHER GAME STARTED OR NOT
var level=0;

$(".btn").click(function(event){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);// last index of userClickedPattern
})

$(document).keypress(function(){
    if(!start){
        nextSequence();
        start=true;
    }
})

function checkAnswer(currentLevel){  // last index of userClickedPattern
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
      $("#"+currentColour). removeClass("pressed");
    },100);
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomColour=buttonColours[Math.floor(Math.random()*4)];
    gamePattern.push(randomColour);
    $("#"+randomColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColour);
}

function playSound(r){
    var audio = new Audio("sounds/"+r+".mp3");
    audio.play();
}

function startOver(){
    level=0;
    gamePattern=[];
    start=false;
    $("#level-title").text("Press,any key to restart");
}

