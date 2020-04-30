const buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var hasStarted = false;
var level = 0;

// listens for a key press to start
$(document).keypress(function() {
  if (!hasStarted) {
    nextSequence();
    hasStarted = true;

    // once the game starts, listens for user clicks on the buttons
    $(".btn").click(function() {

      //get the button that was clicked
      var userChosenColor = $(this).attr("id");
      userClickedPattern.push(userChosenColor);

      // animation and sound for selected color
      playSound(userChosenColor);
      animatePress(userChosenColor);

      // check if correct
      checkAnswer(userClickedPattern.length - 1);
    });
  }
})

/*
  Adds a new color to the sequence.
*/
function nextSequence() {

  // reset the user input
  userClickedPattern = [];

  // randomize next color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);

  // animation and sound for selected color
  var button = $("#" + randomColor);
  button.fadeOut(300).fadeIn(300);
  playSound(randomColor);

  // next level
  level++;
  $("#level-title").text("Level " + level);
}

/*
  Play a sound.
*/
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/*
  Check next button pressed by the user.
*/
function checkAnswer(currentLevel) {
  // check if sequence is right
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // if it is, check if user finished the sequence
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        // get another sequence and reset user inputs
        nextSequence();
      }, 1000);
    }
  } else {
    // if it's not, game over
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

/*
  Animate buttons pressed by the user.
*/
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

/*
  Start a new game.
*/
function startOver() {
  gamePattern = [];
  level = 0;
  hasStarted = false;
}
