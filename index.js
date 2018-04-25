let currentScore = 0;
let currentQuestion = 0;

function displayQuestion() {
  if (currentQuestion < STORE.length) {
    $('#questionNumber').text(currentQuestion+1);
    $('.quizBox').empty();
    $('.quizBox').html(`
      <div class='question'>What is the capital of ${STORE[currentQuestion].question}?</div>
        <form>
          <fieldset>
            ${displayPossibleAnswers(STORE[currentQuestion].answers)} 
            <br>
            <button type="submit" class="submitAnswerButton">Submit</button>
          </fieldset>
        </form>
      </div>
    `);   
  } else {
    displayFinalResults();
  }
}

function displayPossibleAnswers(answers) {
  let answerHtml = '';
  for (i=0; i<answers.length; i++) {
    let currentAnswer = 
    `<label class="possibleAnswer">
      <input type="radio" value="${answers[i]}" name="answer" required>
      ${answers[i]}
    </label>`
    answerHtml += currentAnswer;
  }
  return answerHtml;
}

function optionClicked() {
  $('.quizBox').on('click', '.possibleAnswer', function() {
    $('.quizBox').find('.selected').each(function() {
      $(this).removeClass('selected');
    });
    $(this).addClass('selected');
  })
}

function correctOrIncorrect() {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let userAnswer = $('input:checked').val();
    let actualAnswer = STORE[currentQuestion].correctAnswer;
    if (userAnswer === actualAnswer) {
      isCorrectFeedback();
      addPoint();
    } else {
      isIncorrectFeedback();
    }
  })
}

function isCorrectFeedback() {
  $('.quizBox').empty();
  $('.quizBox').html(`
    <h3>THAT'S RIGHT!</h3>
    <img src="${STORE[currentQuestion].photo}">
    <h3>${STORE[currentQuestion].correctAnswer}</h3>
    <p>${STORE[currentQuestion].funFact}</p>
    <button type="submit" id="nextQuestionButton">Next Question</button>
  `);
  
}

function isIncorrectFeedback() {
  $('.quizBox').empty();
  $('.quizBox').html(`
    <h3>Sorry, that's incorrect!</h3>
    <h4>The actual capital of ${STORE[currentQuestion].question} is</h3>
    <img src="${STORE[currentQuestion].photo}">
    <h3>${STORE[currentQuestion].correctAnswer}</h3>
    <p>${STORE[currentQuestion].funFact}</p>
    <button type="submit" id="nextQuestionButton">Next Question</button>
  `);
}

function nextQuestion() {
  $('.quizBox').on('click', '#nextQuestionButton', function (event) {
    currentQuestion++;
    displayQuestion();
    correctOrIncorrect();
  });
}

function addPoint() {
  currentScore++;
  $('#currentScore').text(currentScore);
}

function displayFinalResults() {
  let percentageScore = currentScore * 10;
  $('.quizBox').empty();
  if (currentScore <= 3) {
    $('.quizBox').html(`
      <span class='percentage'>${percentageScore}%</span>
      <p>Wow, you really don't know your state capitals very well at all.  You scored a measly ${currentScore} points.  You better brush up on your US geography as soon as possible!</p>
      <button type="submit" id="restartQuizButton">Try Again</button>`
    );
  } else if (currentScore <=7) {
    $('.quizBox').html(`
      <span class='percentage'>${percentageScore}%</span>
      </p>Meh, you did OK, I guess.  With a score of ${currentScore} you're not going to conquer trivia night or anything, but you'll survive on a road trip.</p>
      <button type="submit" id="restartQuizButton">Try Again</button>`
    );
  } else {
    $('.quizBox').html(`
      <span class='percentage'>${percentageScore}%</span>
      <p>WOW!  You are a US geography ROCKSTAR!  You scored a whopping ${currentScore} points!  You can hold your head up high knowing you are a friggin' genius!</p>
      <button type="submit" id="restartQuizButton">Try Again</button>`
    );
  }
  $('.quizBox').on('click', '#restartQuizButton', function(event) {
    location.reload();
  });
}

function startQuiz() {
  $('.quizBox').on('click', '.startButton', function(event) {
    displayQuestion();
    correctOrIncorrect();
    nextQuestion();
    optionClicked();
  });
}

$(function() {
  startQuiz();
})

