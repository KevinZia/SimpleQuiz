function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
  this.numberOfQuestions = 10;
  this.timePerQuestion = 15;
  this.extendTime = 10;
  this.hasTimeBeenExtended = false;
  this.hasFiftyFiftyBeenUsed = false;
  this.questionTimer;

  this.timer(); // Run timer on quiz start
}

Quiz.prototype.timer = function(){
  var that = this; // Must reassign this to that because this inside setInterval refers to this inside it.
  questionTimer = setInterval(function(){
    document.getElementById("time").innerHTML = that.timePerQuestion + " seconds remaining to answer question";
    that.timePerQuestion -= 1; // Decrement with 1 every second

    if(that.timePerQuestion <= 0){ // Swap question and reset timer when time reaches 0
      clearInterval(that.questionTimer);
      that.questionIndex++;
      populate();
      that.timePerQuestion = 15;
    }
    if(quiz.isEnded()){ // If quiz gets ended clear the timer.
      clearInterval(this.questionTimer);
    }
  }, 1000);
}

function getTime() {
  if(quiz.hasTimeBeenExtended == false){ // only execute +10s lifeline if it hasn't been executed before
    quiz.timePerQuestion += quiz.extendTime;
    quiz.hasTimeBeenExtended = true;
    document.getElementById("getTime").hidden = true; // Hide button after click
  }
}

function fiftyFifty() {
    var choices = quiz.getQuestionIndex().choices;
    var wrongChoicesList = choices.filter(choice => choice !== quiz.getQuestionIndex().answer); // Filter out the correct answer and create new list with remaining faulty ones
    var randomChoice = wrongChoicesList.splice(Math.floor(Math.random() * wrongChoicesList.length), 1); // Take one random choice from the wrongChoicesList
    randomChoice.push(quiz.getQuestionIndex().answer); // Push the correct answer for the question to the other faulty choice
    
    // show new options with fiftyFifty
    for(var n = 0; n < choices.length; n++){
      var element = document.getElementById("btn" + n);
      element.innerHTML = ""; // Empty current choices
      element.style.display = "none"; // Hide all current choices
    }    
    for (var i = 0; i < randomChoice.length; i++) {
      var element = document.getElementById("btn" + i);
      element.innerHTML = randomChoice[i]; // Reinstantiate choices with the new remaining choices
      element.style.display = "inline"; // Display new choices
      guess("btn" + i, randomChoice[i]);
    }
    
    quiz.hasFiftyFiftyBeenUsed = true;
    document.getElementById("fiftyFifty").hidden = true; // Hide button after click
}

Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex]; // Get the current question index
}

Quiz.prototype.guess = function(answer) {
  if(this.getQuestionIndex().isCorrectAnswer(answer)) { // If answer is correct, add 1 to score and increase questionIndex with 1 to proceed to next question
      this.score++;
  }
  this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.numberOfQuestions; // Quiz ends when you reach the amount of questions allowed
}

function Question(question, choices, answer){
  this.question = question;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice; // Check if answer equals the choice that's been guessed
}

function populate() {
  if(quiz.isEnded()) {
      showScores(); // If quiz is has reached it's end, show score
  }
  else { // Show current question and its choices
      // show question
      var element = document.getElementById("question");
      element.innerHTML = quiz.getQuestionIndex().question;

      // show options
      var choices = quiz.getQuestionIndex().choices;
      for (var i = 0; i < choices.length; i++) {
        var element = document.getElementById("btn" + i);
        element.innerHTML = choices[i];
        element.style.display = "inline";
        guess("btn" + i, choices[i]);
      }

      showProgress();
  }
};

function guess(id, guess) { 
  var button = document.getElementById(id);
  button.onclick = function() {
      quiz.guess(guess);
      quiz.timePerQuestion = 15; // Reset timePerQuestion to 15 seconds when the user makes a guess.
      populate();
  }
};

function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.numberOfQuestions; // Show how many questions have been done of total
};

function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + " out of " + quiz.numberOfQuestions+ "</h2>"
  gameOverHTML += "<button id='btnRestart' onclick='location.reload();'> PLAY AGAIN </button>"; // "restart" the quiz.
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
};

// Shuffle questions according to FischerYates method for randomness in the questions array
function shuffleQuestions(array) {
  var i = array.length;
  while (i--) {
    const ri = Math.floor(Math.random() * (i + 1));
    [array[i], array[ri]] = [array[ri], array[i]];
  }
  return array;
}

// create questions here
var questions = 
  [
    new Question("What is the capital city of Dubai?", ["Dubai", "Abu Dhabi", "Al Ain", "Ajman"], "Abu Dhabi"),
    new Question("Among the alphabet letters, which makes honey?", ["A", "K", "B", "J"], "B"),
    new Question("What is the oldest continuously inhabited city in the world?", ["Athens", "Damascus","Jerusalem","Istanbul"],"Damascus"),
    new Question("What is the capital city of Latvia?", ["Tallin", "Minsk", "Bratislava", "Riga"], "Riga"),
    new Question("Into which sea does the Nile flow?", ["Mediterranean", "Indian Ocean", "Pacific Ocean", "Atlantic Ocean"], "Mediterranean"),
    new Question("What is the gemstone for September?", ["Diamond", "Jade", "Rubies", "Sapphire"], "Sapphire"),
    new Question("In American currency 10 cents make answer what?", ["Quarter","Dime","Pennie", "Nickel"], "Dime"),
    new Question("What instrument has been nicknamed the 'Mississippi Saxaphone'?", ["Harmonica","Piano","Drums","Violin"], "Harmonica"),
    new Question("Afrikaans was developed from which European language?", ["English","French","Spanish","Dutch"], "Dutch"),
    new Question("What Italian word for 'Scratched Drawing' can be found on walls all over the world?", ["Graffiti","Pittura","Disegno","Corsivo"], "Graffiti"),
    new Question("An Ortanique is answer cross between answer tangerine and what other fruit?", ["Banana","Pineapple","Orange","Mango"], "Orange"),
    new Question("In the United States, how many nickels would you get for answer dime?", ["One","Two","Three","Five"], "Two"),
    new Question("The national flag of the Netherlands bears which three colours?", ["Red, White and Orange","White, Orange and Blue","Blue, Red and Orange","Blue, Red and White"], "Blue, Red and White"),
    new Question("Which is the least used letter in the English language?",["Z","V","Q","J"], "Q"),
    new Question("What is answer John Dory?", ["A Fish","A Cat","A Dog","A Turtle",], "A Fish"),
    new Question("What does answer dermatologist study?", ["Skin","Heart","feet","Ears"], "Skin"),
    new Question("Which American gangster was known as 'Scarface'?", ["Thomas Gambino","Carmine Agnello","Vito Genovese","Al Capone"], "Al Capone"),
    new Question("Two countries have been the most frequent hosts of the Winter Olympics. One is the United States; What is the other?", ["Austria","Russia","France", "Canada"], "France"),
    new Question("From which language is the word ketchup derived?", ["USA","England","France,","China"], "China"),
    new Question("What are made and repaired by answer cobbler?", ["Clothes","Keys","Shoes","Tables"], "Shoes")
  ];

// shuffle questions for better randomness each game
shuffleQuestions(questions);

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();