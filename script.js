
var questionArea = document.getElementById('questions');
var answerArea   = document.getElementById('answers');
var reRunArea = document.getElementById('rerun');
var current = 0;
var numOfRight = 0;



var questions = new Array();

createQuestion('What is Canadas national animal?' , ['Beaver', 'Duck', 'Horse'], 0);
createQuestion( 'What is converted into alcohol during brewing?' , ['Grain', 'Sugar' , 'Water'], 1);
createQuestion( 'In what year was Prince Andrew born? ' , ['1955', '1960', '1970'], 1);


// constructor function
function Question(question, alternatives, correct){
    this.question = question;
    this.alternatives = alternatives;
    this.correct = correct;
}
// returns the question
Question.prototype.getQuestion = function() {
	return this.question;
};

// returns the correct alternative
Question.prototype.getCorrect = function(){
	return this.alternatives[this.correct];
};

// returns the alternatives
Question.prototype.getAlternatives = function() {
	return this.alternatives;
};


function createQuestion(question, alternatives, correct){
	var instance = new Question(question, alternatives, correct);
	questions.push(instance);
}

function loadQuestion(curr) {
  // This function loads all the question into the questionArea
  // It grabs the current question based on the 'current'-variable
  
    var question = questions[curr].getQuestion();

    questionArea.innerHTML = '';
    questionArea.innerHTML = question;    
  }


function loadAnswers(curr){
	var answers = questions[curr].getAlternatives();

	answerArea.innerHTML ="";
	for(i = 0; i<answers.length; i++){
		
		var createDiv = document.createElement('div');
		var text = document.createTextNode(answers[i]);
	
		createDiv.appendChild(text);

		createDiv.className ="waves-effect waves-light btn blue lighten-2"; 
		createDiv.addEventListener("click", checkGuess(i, questions[curr]));

		answerArea.appendChild(createDiv);
	}
};


function checkGuess(guess,question){
	
	return function(){
		var givenAnswer = question.getAlternatives()[guess];
		var correctAnswer = question.getCorrect();
		console.log(givenAnswer);
		console.log(correctAnswer);
		if(givenAnswer === correctAnswer){
			numOfRight +=1;
			console.log("Du hade rätt");
			console.log(numOfRight);
		}
		else{
			console.log("du hade fel");
		}
		if (current <questions.length-1){
			current +=1;
			loadQuestion(current);
			loadAnswers(current);
		}
		else{
			questionArea.innerHTML = "Done";
			answerArea.innerHTML = "You answered correctly on " + numOfRight + " questions";

			var reRunButton = document.createElement('a');

			reRunArea.className = "waves-effect waves-light btn-large center-align"
			var reRunText = document.createTextNode("Rerun");


			reRunButton.appendChild(reRunText);
			reRunButton.addEventListener("click",reset() );
			reRunArea.appendChild(reRunButton);


	}
	}
	
};

function reset(){

	return function(){
	reRunArea.innerHTML = "";
	reRunArea.className = "";
	current = 0;
	numOfRight =0;

	startUp();
}

}


function startUp(){

	loadQuestion(current);
	loadAnswers(current);

};
	
