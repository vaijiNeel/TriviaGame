var crtAnsCount=0, wrngAnsCount=0, unanswered=0, timer = 30;
var questionCntr=0, n=0, time=0;	
var t, tm;
var chosenAnswer = "", timerOn = false, timedout=false, qCntFlag=false;	
var htmlTags;

TriviaQuestions = [
	{
		question: "What is Harry's patronus?",
		answerChoices:["Horse", "Stag", "Otter", "Swan"],
		correctAnswer: "Stag",
		srcName: "stag.jpg"
	},
	{
		question: "What Hogwart's house is Harry in?",
		answerChoices:["Slytherin", "Ravenclaw", "Hufflepuff", "Gryffindor"],
		correctAnswer: "Gryffindor",
		srcName: "gryffindor.jpg"
	},
	{
		question: "Who is the headmaster of Hogwarts?",
		answerChoices:["Lupin", "Dumbledore", "Lockhart", "Slughorn"],
		correctAnswer: "Dumbledore",
		srcName: "dumbledore.jpg"
	},
	{
		question: "What is the name of Hagrid's hippogriff?",
		answerChoices:["Buckbeak", "Fluffy", "Norbert", "Hedwig"],
		correctAnswer: "Buckbeak",
		srcName: "buckbeak.jpg"
	},
	{
		question: "Who is the winner of the Triward Tournament?",
		answerChoices:["Victor Krum", "Harry Potter", "Fleur Delacour", "Cedric Diggory"],
		correctAnswer: "Harry Potter",
		srcName: "harry.jpg"
	}
];

function createEndGameElements() {
	// $(".questionAnsResDiv").remove();	
	//create result
	var createDiv = $(".questionAnsResDiv");
	var resultElement = $("<h2>");	
	resultElement.html("Game over! Here is your score: ");
	resultElement.addClass("result");
	resultElement.appendTo(createDiv);
	//correct count
	var correctCntElement = $("<p>");
	correctCntElement.html("Correct answers: " + crtAnsCount);
	correctCntElement.addClass("ans");
	correctCntElement.appendTo(createDiv);
	//wrong count
	var wrongCntElement = $("<p>");
	wrongCntElement.html("Wrong answers: " + wrngAnsCount);
	wrongCntElement.addClass("ans");
	wrongCntElement.appendTo(createDiv);
	//unanswered count
	var unansweredCntElement = $("<p>");
	unansweredCntElement.html("Unanswered: " + unanswered);
	unansweredCntElement.addClass("ans");
	unansweredCntElement.appendTo(createDiv);
	//start over?
	var startOverElement = $("<p>");
	startOverElement.html("Start over?");
	startOverElement.addClass("startOver");
	startOverElement.appendTo(createDiv);	
}

function createResultElements(playerResult, resImgSrcName) {	
	// $(".questionAnsResDiv").remove();	
	//create results
	var createDiv = $(".questionAnsResDiv");
	createDiv.empty();
	var resultElement = $("<h2>");
	resultElement.html(playerResult);
	resultElement.addClass("result");
	resultElement.appendTo(createDiv);
	//correct answer
	var correctAnsElement = $("<p>");
	correctAnsElement.html("The correct answer was: " + TriviaQuestions[questionCntr].correctAnswer);
	correctAnsElement.addClass("question");
	correctAnsElement.appendTo(createDiv);
	//image
	var resImgElement = $("<img>");
	resImgElement.attr('src',"assets/images/"+resImgSrcName);
	resImgElement.appendTo(createDiv);	
	setTimeout(nextQuestion, 3000);
}

function nextQuestion() {
	questionCntr++;
	console.log("questionCntr - " + questionCntr);
	if (questionCntr < n) {		
		$(".questionAnsResDiv").empty();
		createQuestAnsElements();		
		startTimer();
	}
	else {
		$(".questionAnsResDiv").empty();
		createEndGameElements();
	}
}

function createQuestAnsElements() {
	htmlTags = "<p class='questionCls'>" + TriviaQuestions[questionCntr].question + 
	"</p><p class='ans'>" + TriviaQuestions[questionCntr].answerChoices[0] +
	"</p><p class='ans'>" + TriviaQuestions[questionCntr].answerChoices[1] +
	"</p><p class='ans'>" + TriviaQuestions[questionCntr].answerChoices[2] +
	"</p><p class='ans'>" + TriviaQuestions[questionCntr].answerChoices[3] + "</p>"
	$(".questionAnsResDiv").html(htmlTags);			
}

function timedOutResult() {
	timedout = true;	
	createResultElements("Out of Time!",TriviaQuestions[questionCntr].srcName);	
	unanswered++;
	console.log("unanswered cnt = " + unanswered);	
}

function stopTimer() {
	clearTimeout(t);
	timerOn = false;	
}

function displayTime() {
	$(".toggleTime").text("Time remaining: " + time + " Seconds");
	time--;
	console.log("time = " + time);
	if(time<0) {			
		stopTimer();
		timedOutResult();			
	}
	else {
		t = setTimeout(displayTime, 1000);
	}
}

function startTimer() {
	time = timer;
	console.log("time = " + time);
    if (!timerOn) {
        timerOn = true;
        displayTime();
    }
}

// ------------------ execution start -------------------

$(document).ready(function() {
	//get object count	
	n = TriviaQuestions.length;
	console.log("n = " + n);
	console.log("questionCntr = " + questionCntr);

	//on click start button
	$(".gameStart, .startOver").on("click", function() {
		$(".gameStart").hide();			
		createQuestAnsElements();
		//start timer
		startTimer();
		return false;
	});

	// display question and answers				
	// $(".ans").on("click", function() {
	$("body").on('click','.ans',function(){
		console.log($(this).text());
		chosenAnswer = $(this).text();
		stopTimer();
		if(!timedout) {			
			if(chosenAnswer === TriviaQuestions[questionCntr].correctAnswer) {
				crtAnsCount++;
				console.log("correct ans cnt = " + crtAnsCount);				
				createResultElements("Correct!",TriviaQuestions[questionCntr].srcName);
			}
			else {
				wrngAnsCount++;
				console.log("wrong ans cnt = " + wrngAnsCount);				
				createResultElements("Nope!",TriviaQuestions[questionCntr].srcName);
			}
		}
		timedout = false;		
		return false;
	});	
	$("body").on('click','.startOver',function() {	
		//initialize all
		questionCntr=0;
		crtAnsCount=0;
		wrngAnsCount=0;
		unanswered=0;
		createQuestAnsElements();
		startTimer();
		return false;
	});	
	
})