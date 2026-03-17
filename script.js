const startScreen =document.getElementById("start-screen");
const quizScreen =document.getElementById("quiz-screen");
const resultScreen=document.getElementById("result-screen");
const startButton=document.getElementById("start-btn");
const questionText=document.getElementById("question-text");
const answerContainer=document.getElementById("answers-container");
const currentQuestionSpan=document.getElementById("current-question");
const totalQuestionSpan=document.getElementById("total-questions");
const scoreSpan=document.getElementById("score");
const finalScoreSpan=document.getElementById("final-score");
const maxScoreSpan=document.getElementById("max-score");
const resultMessage=document.getElementById("result-message");
const restartButton=document.getElementById("restart-btn");
const progressBar=document.getElementById("progress");
const timerSpan = document.getElementById("timer");

const quizQuestions=[
    {
question: "What is the capital of India?",
answers:
    [
        {text:"London", correct: false},
        {text:"Islamabad", correct: false},
        {text:"Dhaka", correct: false},
        {text:"Delhi", correct: true},
    ],
},
{
    question: "Who is the new PM of Bangladesh?",
answers:
    [
        {text:"Tarek Rahman", correct: true},
        {text:"Hasina", correct: false},
        {text:"Yusuf", correct: false},
        {text:"Yunus", correct: false},
    ],
},
{
    question: "Which Planet is known as the red Planet?",
answers:
    [
        {text:"Venus", correct: false},
        {text:"Jupiter", correct: false},
        {text:"Mars", correct: true},
        {text:"Earth", correct: false},
    ],
},
{
    question: "Which of these is not a programming language?",
answers:
    [
        {text:"Java", correct: false},
        {text:"Python", correct: false},
        {text:"Banana", correct: true},
        {text:"Javascript", correct: false},
    ],
},
{
    question: "What is the chemical symbol for gold?",
answers:
    [
        {text:"Go", correct: false},
        {text:"Au", correct: true},
        {text:"Ag", correct: false},
        {text:"Gd", correct: false},
    ],
},
];
let currentQuestionIndex=0;
let score=0;
let answerDisabled=false;
let timeleft=60;
let timer;

totalQuestionSpan.textContent= quizQuestions.length;
maxScoreSpan.textContent=quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    scoreSpan.textContent=0;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    showQuestion();
}
function startTimer() {
    clearInterval(timer);
    timeLeft = 10;

    timerSpan.textContent = timeLeft; 

    timer = setInterval(() => {
        timeLeft--;
        timerSpan.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestionIndex++;

            if (currentQuestionIndex < quizQuestions.length) {
                showQuestion();
            } else {
                showResults();
            }
        }
    }, 1000);
}
function showQuestion(){
 
    answerDisabled=false
    startTimer();
    const currentQueston = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent=currentQuestionIndex +1;
    const progressPercent =((currentQuestionIndex+1)/quizQuestions.length)*100;
    progressBar.style.width=progressPercent+"%";
    questionText.textContent=currentQueston.question;
    answerContainer.innerHTML="";
    currentQueston.answers.forEach(answer =>{
        const button=document.createElement("button")
        button.textContent=answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct=answer.correct;
        button.addEventListener("click",selectAnswer);
        answerContainer.appendChild(button);
    });
}
function selectAnswer(event){
    if(answerDisabled) return;
    clearInterval(timer);
    answerDisabled=true;
    const selectedButton=event.target;
    const isCorrect=selectedButton.dataset.correct==="true";
    Array.from(answerContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
        button.classList.add("correct");
    } else if (button === selectedButton) {
        button.classList.add("incorrect");  
    }
});
    if(isCorrect){
        score++;
        scoreSpan.textContent=score;   
    }
    setTimeout(()=>{
        currentQuestionIndex++;
        if(currentQuestionIndex<quizQuestions.length){
            showQuestion();
        }
        else{
            showResults();
        }
    }, 1000);
}
function showResults()
{
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScoreSpan.textContent=score;
    const percentage=(score/quizQuestions.length)*100;
    if(percentage===100){
        resultMessage.textContent="Perfect!You're a genius!";
    }
    else if(percentage>=80){
        resultMessage.textContent="Great Job!";
    }
    else if(percentage>=60){
        resultMessage.textContent="Keep Learning";
    }
    else if(percentage>=40){
        resultMessage.textContent="Not Bad!";
    }
    else {
        resultMessage.textContent="Keep Trying";
    }
}
function restartQuiz(){
    resultScreen.classList.remove("active");
    startQuiz();
}

