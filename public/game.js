const buttonColours = ["red", "blue", "green", "yellow"];
let buttonSequence = [];
let userClickedPattern = [];
let level = 0;
let inputLength = 0;
let gameStarted = false;
let initialKey = 0;


function nextSequence() {
  let randomNum = Math.ceil(Math.random() * 3);
  buttonSequence.push(buttonColours[randomNum]);
  level++;
  $(".score-form").val(level);
  $("#level-title").html("Level " + level);
}

function buttonSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}

function animatePress(colour) {
  $("#" + colour).addClass("pressed");
  buttonSound(colour);
  window.setTimeout(() => {
    $("#" + colour).removeClass("pressed");
  }, 200);
}

function animateSequence(i) {
  if (i < level) {
    setTimeout(
      () => {
        animatePress(buttonSequence[i]);
        animateSequence(i + 1);
      },
      1000
      //level > 5 ? 500 : 1000
    );
  }
}

function resetGame() {
  $(".score-form").html(level);
  document.getElementById("overlay").style.display = "block";
  new Audio("sounds/wrong.mp3").play();
  $('body').addClass('game-over');
  window.setTimeout(()=>
  {
        $('body').removeClass('game-over');
  }, 100)
  buttonSequence = [];
  userClickedPattern = [];
  level = 0;
  inputLength = 0;
  $("#level-title").html("Game Over.");
  $("#level-title-1").html("");
  gameStarted = false;
}

function checkInput(userChosenColour) {  
    if (inputLength == level - 1) {
        if (buttonSequence[inputLength] == userChosenColour) {
          inputLength = 0;
          nextSequence();
          animateSequence(0);
        } else {
          resetGame();
        }
      } else if (inputLength < level) {
        if (buttonSequence[inputLength] == userChosenColour) {
          inputLength++;
        } else {
          resetGame();
        }
      }
}

$('.start-btn').on("click", function (e) {
  if (!gameStarted && document.getElementById("overlay").style.display != "block") {
      nextSequence();
      animateSequence(0);
      gameStarted = true;
      $("#level-title-1").html("");
      $(".start-btn").style.display = "none";
      console.log(gameStarted);
  }
});

$(document).keydown(function (e) {
    if (!gameStarted && document.getElementById("overlay").style.display != "block") {
        nextSequence();
        animateSequence(0);
        gameStarted = true;
        $("#level-title-1").html("");
        $(".start-btn").style.display = "none";
        console.log(gameStarted);
    }
  });

  $(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userChosenColour);
    console.log(buttonSequence);
    console.log(userClickedPattern);
    
    
    checkInput(userChosenColour);
    
  });
  function off() {
    document.getElementById("overlay").style.display = "none";
  }

  // window.onclick =  function(e){   
  //   if (e.target == overlay)
  //     off();
  //   };
  
    KEYCODES = { left: 37, up: 38, right: 39, down: 40, done: 13 };

    $('.cyclic_input').on('keydown',function(ev){
        input = $(this);
        val = $(this).text();
        
        switch (ev.keyCode) {   
          case KEYCODES.right:
            input.next().focus();
            break;
          case KEYCODES.left:
            input.prev().focus();
            break;
          case KEYCODES.up:
            input.text(advanceCharBy(val, 1));
            break;
          case KEYCODES.down:
            input.text(advanceCharBy(val, -1));
            break;
          case KEYCODES.done:
            $(".username-form").val($(".1").text() + $(".2").text() + $(".3").text());
            $(".form").submit();
            break;
          default:
            if (ev.keyCode >= 65 && ev.keyCode <= 65 + 26) {
                input.text(String.fromCharCode(ev.keyCode));
                input.next().focus();
            }
        };
        // ev.preventDefault();
    });
    
    advanceCharBy = function(char, distance) {
        oldCode = char.charCodeAt(0);
        newCode = 65 + (oldCode - 65 + 26 + distance) % 26;
        return String.fromCharCode(newCode);
    };

    $('.done-input').on("click",(ev) => {
      $(".username-form").val($(".1").text() + $(".2").text() + $(".3").text());
      $(".form").submit();
    })

