$(document).ready(function() {

    // GLOBAL VARIABLES

    var trivia = [
        {
            question: "What network is Silicon Valley on?",
            answerArray: ["NETFLIX", "AMAZON PRIME", "HBO", "MTV"],
            correctAnswer: 2,
            gif: 'assets/images/answer-1.gif'
        },
        {
            question: "What is the name of the Richard's startup?",
            answerArray: ['PIED PIPER', 'AVIATO', 'SNAP',  'GOOGLE'],
            correctAnswer: 0,
            gif: 'assets/images/pied-piper.gif'
        },
        {
            question: "What is the name of T.J. Miller's character?",
            answerArray: ['GILFOYLE', 'BIG HEAD', 'RICHARD',  'ERLICH'],
            correctAnswer: 3,
            gif: 'assets/images/erlich.gif'
        },
        {
            question: "Russ Hanneman is based off of which investor in Shark Tank?",
            answerArray: ["KEVIN O'LEARY", 'DAYMOND JOHN', 'MARK CUBAN',  'ROBERT HERJAVEC'],
            correctAnswer: 2,
            gif: 'assets/images/russ.gif'
        },
        {
            question: "What is the name of Russ Hanneman's Tequila company?",
            answerArray: ['TRES COMAS', 'AVION', 'CASAMIGOS',  'KARKLAND SIGNATURE'],
            correctAnswer: 0,
            gif: 'assets/images/tres-comas.jpg'

        },
        {
            question: "Who is the found of SeeFood?",
            answerArray: ['JARED', 'JIAN-YANG', 'MONICA',  'ERLICH'],
            correctAnswer: 1,
            gif: 'assets/images/jian-yang.gif'
        },
        {
            question: "What is the name of Erlich's startup",
            answerArray: ['PIED PIPER', 'HOOLI', 'AVIATO',  'GOOGLE'],
            correctAnswer: 2,
            gif: 'assets/images/aviato.gif'
        },
        {
            question: "Who was the only other CEO of Pied Piper?",
            answerArray: ['JACK BARKER', 'GAVIN BELSON', 'PETER GREGORY',  'LAURIE BREAM'],
            correctAnswer: 0,
            gif: 'assets/images/jack-barker.gif'
        },
        {
            question: "Who is the CEO of Hooli?",
            answerArray: ['JACK BARKER', 'GAVIN BELSON', 'PETER GREGORY',  'LAURIE BREAM'],
            correctAnswer: 1,
            gif: 'assets/images/gavin-belson.gif'
        }
    ]

 
    var $music = $('#music');
    
    function playMusic () {
        $music[0].volume = 0.5;
        $music[0].play();
    }

    playMusic();

    function stopMusic () {
        $music[0].pause();
        $music[0].currentTime = 0;
    }

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 0;
    var answerLock = false;

    // THIS VARIABLE WILL REPRESENT THE INDEX OF THE QUESTIONS IN THE ARRAY
    var currentQuestion = 0;

    // DECLARE VARIABLES FOR TIME COUNTDOWN
    var seconds;
    var interval;

    var restart = $('#restart');
    restart.hide();
    // var gif = $('#gif');
    // gif.hide();

    // CREATE FUNCTIONS FOR TIME COUNTDOWN
    function countdown() {
        seconds = 10;
        $('#time-remaining').html('<span id="seconds">' + seconds + '<span>');
        
        clearInterval(interval);
        interval = setInterval(decrement, 1000);
    }

    function decrement() {
        seconds--;
        $('#time-remaining').html('<span id="seconds">' + seconds + '<span>');
        if (seconds === 0) {
            clearInterval(interval);
            answerLock = true;
            transitionPage();
        }
    }




    // WHEN USER CLICKS START BUTTON
        // DISPLAY QUESTION AND ANSWERS
        // START TIME COUNTDOWN
    $('#start').click(function() {
        $('#start').hide();
        newQuestion();
        countdown();
        //stopMusic();
        //$music[0].volume = 0.3;
    })
    

    function newQuestion() {
        $('#message').empty();
        $('#gif').empty();

        $('#question').show();
        $('#answers').show();
        $('#time-remaining').show();
        $('#message').show();
        $('#gif').show();

        // DISPLAY QUESTION TO THE WINDOW
        // for (var i = 0; i < trivia.length; i++) {
        //     $('#question').html(trivia[i].question);
        // }
        $('#question').html(trivia[currentQuestion].question);

        answerDiv = $('#answers');

        // SORT THROUGH THE CHOICES IN THE ARRAY OF ANSWERS AND APPEND THEM TO EACH OTHER TO #answers IN WINDOW
        for (var i = 0; i < 4; i++) {
            choices = $('<li>');
            choices.addClass('answer');
            choices.attr('index', i);
            choices.html(trivia[currentQuestion].answerArray[i]);
            answerDiv.append(choices);
        }

        countdown();

        $('.answer').click(function() {
            // STORE THE CLICKED ANSWER INTO user AND GIVE IT AN ATTRIBUTE OF index TO CHECK IF IT IS THE CORRECT ANSWER
            if (answerLock === false) {
                user = $(this).attr('index');
                clearInterval(interval);
                transitionPage();
            }

        })

    } 


    // THE transitionPage IS DISPLAYED AFTER EVERY ANSWER, EITHER RIGHT OR WRONG
        // TO TELL USER IF THEY GOT THE ANSWER RIGHT OR WRONG
    function transitionPage() {
        
        // REMOVE THE QUESTION, ANSWERS AND COUNTDOWN FROM THE WINDOW
        $('#question').empty();
        $('#answers').empty();
        $('#time-remaining').empty();


        // CREATE A VARIABLE REPRESENTING THE INDEX OF answerArray WITH THE RIGHT NUMBER VALUE
        var correctAnswerIndex = trivia[currentQuestion].correctAnswer;

        // CREATE A VARIABLE DISPLAY THE STRING OF THE CORRECT ANSWER
        var correctAnswerString = trivia[currentQuestion].answerArray[trivia[currentQuestion].correctAnswer];

        // REPLACE QUESTION AND ANSWERS WITH MESSAGE AND IMAGE
        if (user == correctAnswerIndex && (answerLock === false)) {
            correctAnswers++;
            $('#message').html('Correct');
            $('#gif').html('<img src="'+ trivia[currentQuestion].gif + '" id="gif">');


        } else if (user != correctAnswerIndex && (answerLock === false)) {
            incorrectAnswers++;
            $('#message').html('The answer is <span id="wrong-message">' + correctAnswerString + '</span>');
            $('#gif').html('<img src="assets/images/wrong-answer.gif" id="gif">');

        } else {
            unanswered++;
            $('#message').html('out of time. the answer was <span id="unanswered-message">' + correctAnswerString + '</span>');
            $('#gif').html('<img src="assets/images/out-of-time.gif" id="gif">');

            answerLock = false;

        }

        if (currentQuestion == 8) {
            setTimeout(results, 5000);
        } else {
            currentQuestion++;
            setTimeout(newQuestion, 5000);
        }



    }

    function results() {
        $('#question').hide();
        $('#answers').hide();
        $('#time-remaining').hide();
        $('#message').hide();
        $('#gif').hide();

        $('#correct-total').show();
        $('#incorrect-total').show();
        $('#unanswered-total').show();

        $('#correct-total').html('Correct Answers: <span id="correct-count">' + correctAnswers + '</span>');
        $('#incorrect-total').html('Incorrect Answers: <span id="incorrect-count">' + incorrectAnswers + '</span>');
        $('#unanswered-total').html('Unanswered: <span id="unanswered-count">' + unanswered + '</span>');
        restart.show();

    }

    $('#restart').click(function() {
        restart.hide();
        newGame();
    })

    function newGame() {
        $('#correct-total').hide();
        $('#incorrect-total').hide();
        $('#unanswered-total').hide();

        currentQuestion = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;

        newQuestion();
        $music[0].play();
        

    }



})