// Global variables
var time = 60;
var timePenalty = 5
var countDownTimer;
var index = 0


// Query Selector///////////////////////////////////////////////
// header container
var headerContainer = document.querySelector("#headerContainer");
// Timer
var countdownTimerEl = document.querySelector("#countdownTimer");
// Start
var startContainer = document.querySelector("#startContainer");
var startBtn = document.querySelector("#start");
// Questions
var questionContainer = document.querySelector("#questionContainer");
var questionTitle = document.querySelector("#questionTitle");
var questionChoices = document.querySelector("#questionChoices");
// Game Over
var gameoverContainer = document.querySelector("#gameoverContainer");
var finalScore = document.querySelector("#finalScore");
var userInitials = document.querySelector("#userInitials")
var submitInitialsBtn = document.querySelector("#submitBtn");
// Highscores container
var highscoresContainer = document.querySelector("highscoresContainer");
var list = document.querySelector("list");
// Questions to Display//////////////////////////////////////////////////
// Quiz Cards strings
var stringQuizCards = [
    {
        question: "question 1",
        choices: ['choice 1', "choice 2", "choice 3", "choice 4"],
        answer: "choice 1"
    },
    {
        question: "question 2",
        choices: ['choice 1', "choice 2", "choice 3", "choice 4"],
        answer: "choice 1"
    },
    {
        question: "question 3",
        choices: ['choice 1', "choice 2", "choice 3", "choice 4"],
        answer: "choice 1"
    },
    {
        question: "question 4",
        choices: ['choice 1', "choice 2", "choice 3", "choice 4"],
        answer: "choice 1"
    }
];

// Functions

// Starting Quiz Handler/////////////
function startQuiz() {
    // make the Start quiz card disapear
    startContainer.setAttribute("class", "hide");
    // make quiz cars container appear
    questionContainer.removeAttribute('class');
    // Timmer Start 
    countDownTimer = setInterval(startTimer, 1000);
    countdownTimerEl.textContent = time;
    // Call function
    showQuestion();
};

// Display Timer //
function startTimer() {
    time--;
    countdownTimerEl.textContent = time
    if (time <= 0) {
        alert('game over')
        startQuiz();
        // Missing something here
    }

};

function showQuestion() {
    console.log(index);
    var currentQuestion = stringQuizCards[index];

    questionTitle.textContent = currentQuestion.question;
    questionChoices.innerHTML = "";

    
    for (var i = 0; i < currentQuestion.choices.length; i++) {

        var button = document.createElement('button');
        button.setAttribute('value', currentQuestion.choices[i]);
        button.textContent = currentQuestion.choices[i];

        button.onclick = checkAnswer;

        questionChoices.append(button);

    };
};
function checkAnswer() {
    // Check if the correct button was clicked 
    if (this.value === stringQuizCards[index].answer) {
        console.log(this.value);
        console.log(stringQuizCards[index].answer);
        console.log("correct")
    } else {
        console.log('wrong');
        time = time - timePenalty;
        console.log(time);
    }
    // 
    // go to next index question 
    index++;

    if (index === stringQuizCards.length) {
        console.log("Game Over");
        gameoverDisplay();
    } else {
        showQuestion();
    }
};
// Display get Initials
function gameoverDisplay() {
    // hide the questions and Header
    headerContainer.setAttribute("class", "hide");
    questionContainer.setAttribute("class", "hide");
    // function to stop timer
    clearInterval(countDownTimer)
    // show Scores and Initials imput
    gameoverContainer.removeAttribute("class");
    finalScore.textContent = time;
};

// Highscores Display
function highscoresDisplay() {
    var highscores = JSON.parse(localStorage.getItem('highscores')) || []

    // capture the content of the users initials and the score and set into local storage
    var initials = userInitials.value
    var userScore = {
        initials: initials,
        score: time
    }
    highscores.push(userScore)
    localStorage.setItem('highscores', JSON.stringify(highscores))

    //call function to append list of highscores
    window.location.href = 'highscoresdisplay.html'
};


startBtn.onclick = startQuiz;

// retrive Initials
submitInitialsBtn.onclick = highscoresDisplay;