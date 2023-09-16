
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let playerPattern = [];
let paternIndex = 0;


function getRandomNumber(){
    return Math.floor(Math.random() * 4);
};

function nextColor(){
    let randomColor = buttonColours[getRandomNumber()]
    gamePattern.push(randomColor)
};

function playButton(color){
    let audio = new Audio(`./sounds/${color}.mp3`);
    audio.play();
    $( "#" + color).fadeOut(100).fadeIn(100);
};

function playGamePattern(){

    $("h1").text("Computer Playing");
    $(".btn").attr("disabled", true);

    for (let i=0; i<gamePattern.length; i++){
        setTimeout(function(){ 
            playButton(gamePattern[i]);
        }, 1000 * i);
    }

    setTimeout(function(){ 
        $("h1").text("Your Turn");
        $(".btn").attr("disabled", false);
    }, 1000 * gamePattern.length);

}

function nextSequence(){
    nextColor();
    playGamePattern();
    playerPattern = [];
    paternIndex = 0;
}

function checkAnswer(color){
    if (color == gamePattern[paternIndex] 
        && paternIndex < gamePattern.length){

        paternIndex += 1
        if (playerPattern.length >= gamePattern.length){
            setTimeout(nextSequence, 1500);
        }

    }
    else{
        gameOver()
    }

}

function startGame(){
    $("#start-btn").attr("disabled", true);
    setTimeout(nextSequence, 1000);
}

function gameOver(){
    gamePattern = [];
    playerPattern = [];
    paternIndex = 0;

    $(".btn").attr("disabled", true);
    $("h1").text("Wrong answer");

    setTimeout(() => {
        $("h1").text("Simon Game");
        $("#start-btn").attr("disabled", false);
    }, 1500);

}


$(".btn").click(function(){
    playButton(this.id);
    playerPattern.push(this.id);
    checkAnswer(this.id)
});

$(".btn").attr("disabled", true);

$("#start-btn").click(startGame);