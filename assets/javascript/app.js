$(document).ready(function() {

    // GLOBAL VARIABLES

    var trivia = [
        {
            question: "What network is Silicon Valley on?",
            answerList: ["Netflix", "Amazon Prime", "HBO", "MTV"],
            correctAnswer: 2
        },
        {
            question: "What is the name of the protagonists' startup?",
            answerList: ['Pied Piper', 'Aviato', 'Snap',  'Google'],
            correctAnswer: 0
        },
        {
            question: "What is the name of T.J. Miller's character?",
            answerList: ['Gilfoyle', 'Big Head', 'Richard',  'Erlich'],
            correctAnswer: 3
        },
        {
            question: "Russ Hanneman is based off of which investor in Shark Tank?",
            answerList: ["Kevin O'Leary", 'Daymond John', 'Mark Cuban',  'Robert Herjavec'],
            correctAnswer: 2
        },
        {
            question: "What is the name of Russ Hanneman's tequila company?",
            answerList: ['Tres Comas', 'Avion', 'Casamigos',  'Kirkland Signature'],
            correctAnswer: 0
        },
    ]


    var startButtonLock = false;
    var answered = false;

    var seconds = 10;
    var interval;

    // CREATE FUNCTIONS FOR TIME COUNTDOWN
    function countdown() {
        $('#time-remaining').html('Time Remaining: ' + seconds);

        interval = setInterval(decrement, 1000);
    }

    function decrement() {
        seconds--;
        $('#time-remaining').html('Time Remaining: ' + seconds);

        if (seconds === 0) {
            stopTime();
        }
    }

    function stopTime() {
        clearInterval(interval);
    }


    // GAME FUNCTIONS
    function startGame() {
        newQuestion();
    }

    function newQuestion() {
        
    }

    // ===== CLICK EVENTS =======

    // WHEN USER CLICKS START BUTTON
        // CALL startGame FUNCTION
    $('#start').click(function() {
        countdown();
        startGame();

    })






})