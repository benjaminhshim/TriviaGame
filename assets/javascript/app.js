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

    var correctAnswers;
    var wrongAnswers;

    // THIS VARIABLE WILL REPRESENT THE INDEX OF THE QUESTIONS IN THE ARRAY
    var currentQuestion = 0;

    // DECLARE VARIABLES FOR TIME COUNTDOWN
    var seconds;
    var interval;

    // CREATE FUNCTIONS FOR TIME COUNTDOWN
    function countdown() {
        seconds = 10;
        $('#time-remaining').html('Time Remaining: ' + seconds);
         
        clearInterval(interval);
        interval = setInterval(decrement, 1000);
    }

    function decrement() {
        seconds--;
        $('#time-remaining').html('Time Remaining: ' + seconds);

        if (seconds === 0) {
            stopTime();
            answerPage();
        }
    }

    function stopTime() {
        clearInterval(interval);
    }



    // WHEN USER CLICKS START BUTTON
        // DISPLAY QUESTION AND ANSWERS
        // START TIME COUNTDOWN
    $('#start').click(function() {
        $('#start').hide();
        newQuestion();
        countdown();


    })
    

    function newQuestion() {
        $('#message').empty();


        // DISPLAY QUESTION TO THE WINDOW
        $('#question').html(trivia[currentQuestion].question);

        answerDiv = $('#answers');

        // SORT THROUGH THE CHOICES IN THE ARRAY OF ANSWERS AND APPEND THEM TO EACH OTHER TO #answers IN WINDOW
        for (var i = 0; i < 4; i++) {
            choices = $('<li>');
            choices.addClass('answer');
            choices.attr('index', i);
            choices.html(trivia[currentQuestion].answerList[i]);
            answerDiv.append(choices);
        }

        countdown();


        $('.answer').click(function() {
            // STORE THE CLICKED ANSWER INTO user AND GIVE IT AN ATTRIBUTE OF index TO CHECK IF IT IS THE CORRECT ANSWER
            user = $(this).attr('index');
            clearInterval(interval);
            answerPage();
        })

    } 


    // THE answerPage IS DISPLAYED AFTER EVERY ANSWER, EITHER RIGHT OR WRONG
        // TO TELL USER IF THEY GOT THE ANSWER RIGHT OR WRONG
    function answerPage() {
        
        // REMOVE THE QUESTION, ANSWERS AND COUNTDOWN FROM THE WINDOW
        $('#question').empty();
        $('#answers').empty();
        $('#time-remaining').empty();


        // CREATE A VARIABLE REPRESENTING THE INDEX OF answerList WITH THE RIGHT NUMBER VALUE
        var correctAnswerIndex = trivia[currentQuestion].correctAnswer;

        // CREATE A VARIABLE DISPLAY THE STRING OF THE CORRECT ANSWER
        var correctAnswerString = trivia[currentQuestion].answerList[trivia[currentQuestion].correctAnswer];

        // REPLACE QUESTION AND ANSWERS WITH MESSAGE AND IMAGE
        if (user == correctAnswerIndex) {
            $('#message').html('Correct');
        } else if (user != correctAnswerIndex) {
            $('#message').html('The answer is ' + correctAnswerString);
        } else {
            $('#message').html('out of time. the answer was ' + correctAnswerString);
        }

        currentQuestion++;
        setTimeout(newQuestion, 3000);

    }





})