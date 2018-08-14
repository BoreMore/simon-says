var prevButtons = [];
var playerButton = [];
var game = false;
var prevPicked;
var round = 0;
var soundInt = undefined;

//initiates game
$("#startGameBtn").on("click", function () {
    if (soundInt !== undefined) {
    clearInterval(soundInt);
    }
    round = 0;
    prevButtons = [];
    playerButton = [];
    game = false;
    prevPicked;
    $("#menu").css("display", "block");
    $("#startGame").css("display", "none");
    $("#buttons").css("display", "block");
    $("#scoreDisplay").css("display", "block");
    $("#scoreDisplay").text("Prepare for game start");
    //$(".footer").css("position", "relative");
    setTimeout(function() {
        //$("#nextRoundNotif").css("display", "none");
        newRound();
    }, 1000)
})

//chooses random number/random button to light up
function newRound() {
    round++;
    $("#scoreDisplay").text("Round: " + round);
    playerButton = [];
    random = Math.floor(Math.random()*4);
    if (random === prevPicked) {
        while (random === prevPicked) {
            random = Math.floor(Math.random()*4);
        }
    }
    prevButtons.push(random);
    prevPicked = random;
    console.log(prevButtons);
    init();
}


//shows the button sequence to player
function init() {
    game = false;
    var i = 0;
    var moves = setInterval(function() {
        switch(prevButtons[i]) {
            case 0:
            document.getElementById("0").style.backgroundColor = "#b30000";
            mySound = new Audio("assets/sounds/sound0.mp3");
            mySound.play();
            setTimeout(function() {document.getElementById("0").style.backgroundColor = ""; mySound.pause();}, 600);
            break;
            case 1:
            document.getElementById("1").style.backgroundColor = "#006600";
            mySound = new Audio("assets/sounds/sound1.mp3");
            mySound.play();
            setTimeout(function() {document.getElementById("1").style.backgroundColor = ""; mySound.pause();}, 600);
            break;
            case 2:
            document.getElementById("2").style.backgroundColor = "#0000ff";
            mySound = new Audio("assets/sounds/sound2.mp3");
            mySound.play();
            setTimeout(function() {document.getElementById("2").style.backgroundColor = ""; mySound.pause();}, 600);
            break;
            case 3:
            document.getElementById("3").style.backgroundColor = "#b38600";
            mySound = new Audio("assets/sounds/sound3.mp3");
            mySound.play();
            setTimeout(function() {document.getElementById("3").style.backgroundColor = ""; mySound.pause();}, 600);
            break;
        }
        i++;
        if (i >= prevButtons.length) {
            clearInterval(moves);
            game = true;
        } 
    }, 700);
}


//listens to player input and activates function
$(document).on("click", ".inputButton", function() {
    if (game === true) {
    var id = $(this).attr("id");
    playerButton.push(parseInt(id));
    mySound = new Audio("assets/sounds/sound" + id + ".mp3")
    mySound.play();
    myFunc();
    }
});

//compares player input array to correct sequence array
function myFunc() {
    if (playerButton[playerButton.length - 1] === prevButtons[playerButton.length - 1]) {
        if (playerButton.length === prevButtons.length) {
            game = false;
            //$("#nextRoundNotif").css("display", "block");
            $("#scoreDisplay").text("Good move! Prepare for next round");
            setTimeout(function() {
                //$("#nextRoundNotif").css("display", "none");
                newRound();
            }, 750)
        }
    } else {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
            $(".footer").css("position", "fixed")
        } else {
            $(".footer").css("position", "fixed");
        }
        game = false;
        //$("#buttons").css("display", "none");
        $("#playAgainDiv").css("display", "block");
        $("#scoreDisplay").text("You made it to round " + round);
    }
}

$("#playAgainBtn").on("click", function() {
    $("#playAgainDiv").css("display", "none");
    $("#buttons").css("display", "block");
    prevButtons = [];
    round = 0;
    random = undefined;
    //game = false;
    //$("#nextRoundNotif").css("display", "block");
    $("#scoreDisplay").text("Prepare for new game");
    //$(".footer").css("position", "relative");
    setTimeout(function() {
        //$("#nextRoundNotif").css("display", "none");
        newRound();
    }, 1000)
})
$("#menu").on("click", function() {
    $("#pause").css("display", "block");
    $("#menu").css("display", "none");
    $("#buttons").css("display", "none");
    $("#scoreDisplay").css("display", "none");
    if ($("#playAgainDiv").css("display") === "block") {
    $("#playAgainDiv").css("display", "none");
    marker = 1;
    }
})
$("#resume").on("click", function() {
    $("#pause").css("display", "none");
    $("#menu").css("display", "block");
    $("#buttons").css("display", "block");
    $("#scoreDisplay").css("display", "block");
    if (marker === 1) {
        $("#playAgainDiv").css("display", "block");
        marker = 0;
    }
})
$("#exit").on("click", function() {
    soundInt = setInterval(function() {
        mySound.pause();
    }, 1)
    $("#pause").css("display", "none");
    $("#startGame").css("display", "block");
    $("#creditsDiv").css("display", "none");
    $("#howToPlayDiv").css("display", "none");
})
$("#credits").on("click", function() {
    if ($("#creditsDiv").css("display") === "none") {
        $("#creditsDiv").css("display", "block");
        if ($("#howToPlayDiv").css("display") === "block") {
            $("#howToPlayDiv").css("display", "none");
        }
    } else {
        $("#creditsDiv").css("display", "none");
    }
})
$("#howToPlay").on("click", function() {
    if ($("#howToPlayDiv").css("display") === "none") {
        $("#howToPlayDiv").css("display", "block");
        if ($("#creditsDiv").css("display") === "block") {
            $("#creditsDiv").css("display", "none");
        }
    } else {
        $("#howToPlayDiv").css("display", "none");
    }
})