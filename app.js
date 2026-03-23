let loadingscreen = document.getElementById("loading-screen");
let quizcontainer = document.getElementById("quiz-container");
let lastscreen = document.getElementById("result-screen");
let questionsnumber = document.getElementById("question");
let options = document.querySelectorAll(".option-btn");
let next = document.getElementById("next-btn");
let scoreElement = document.getElementById("score");
let finalscore = document.getElementById("final-score");
let restartbutton = document.getElementById("restart-btn");
let questioncounter = document.getElementById("question-counter");
let progressBar = document.querySelector('#quizProgress .progress-bar');
let timerElement = document.getElementById("timer");
let score = 0;
let currentQuestionIndex = 0;
let hasSelectedAnswer = false;
let timeLeft;
let timer;

const questions = [
    { question: 'What is 2 + 2', answers: [{ text: '4', correct: true }, { text: '2', correct: false }, { text: '22', correct: false }, { text: '8', correct: false }] },
    { question: 'What is 3 + 3', answers: [{ text: '4', correct: false }, { text: '6', correct: true }, { text: '22', correct: false }, { text: '8', correct: false }] },
    { question: 'What is 4 + 4', answers: [{ text: '4', correct: false }, { text: '6', correct: false }, { text: '22', correct: false }, { text: '8', correct: true }] },
    { question: 'What is 5 + 5', answers: [{ text: '4', correct: false }, { text: '10', correct: true }, { text: '22', correct: false }, { text: '6', correct: false }] },
    { question: 'What is 6 + 6', answers: [{ text: '4', correct: false }, { text: '6', correct: false }, { text: '22', correct: false }, { text: '12', correct: true }] },
    { question: 'What is 7 + 7', answers: [{ text: '4', correct: false }, { text: '6', correct: false }, { text: '22', correct: false }, { text: '14', correct: true }] }
];

// ---------------- Load Question ----------------
function loadQuestion() {

    hasSelectedAnswer = false;           
    next.disabled = true;

    clearInterval(timer);   
    timeLeft = 10;
    timerElement.innerText = timeLeft;

    
    options.forEach(button => {
        button.classList.remove("btn-success");
        button.classList.remove("btn-danger");
        button.disabled = false;
    });

    timer = setInterval(()=>{

    timeLeft --;
    timerElement.innerText = timeLeft;

    if (timeLeft <= 0) {

        clearInterval(timer);
        timerElement.innerText = "Time's up!";

        const currentQuestion = questions[currentQuestionIndex]; 

        options.forEach((button, index) => {  

            button.disabled = true;
            if (currentQuestion.answers[index].correct) {
                button.classList.add("btn-success");
            }

        });

        next.disabled = false;
    }

},1000);


    const currentQuestion = questions[currentQuestionIndex];

    questionsnumber.innerText = currentQuestion.question;

    let percentage = ((currentQuestionIndex + 1) / questions.length) * 100;

    progressBar.style.width = percentage + "%";
    progressBar.innerText = Math.round(percentage) + "%";

    questioncounter.textContent = 
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    currentQuestion.answers.forEach((answer, index) => {
        options[index].innerText = answer.text;
        options[index].disabled = false; 
    });

}

// ---------------- Select Answer ----------------
function selectAnswer() {
    options.forEach((button, index) => {
        button.addEventListener("click", function () {
            if (hasSelectedAnswer) return; 
            clearInterval(timer);

            hasSelectedAnswer = true;
            next.disabled = true; 

            const currentQuestion = questions[currentQuestionIndex];
            options.forEach(btn => btn.disabled = true);
            if (currentQuestion.answers[index].correct) {
                button.classList.add("btn-success");
                score++;
                scoreElement.innerText = "Score: " + score;
            }
            else{
                 button.classList.add("btn-danger");
                 currentQuestion.answers.forEach((answer, i) => {
        if (answer.correct) {
            button.classList.remove("btn-outline-primary");
            options[i].classList.add("btn-success");
        }
        
    });
    
        
            }
            next.disabled = false;
        });
    });
    

}
function animateScore(finalScoreNumber) {
    let displayedScore = 0;
    let intervalId = setInterval(() => {
        displayedScore++;
        finalscore.innerText = displayedScore + " / " + questions.length;

        if(displayedScore === finalScoreNumber) {
            clearInterval(intervalId);
        }
    }, 1000); 
}


    


// ---------------- Next Button ----------------
function nextButton() {
    next.addEventListener("click", function () {

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            loadQuestion(); 
        } else {
            quizcontainer.classList.add("d-none");
            lastscreen.classList.remove("d-none");
            animateScore(score);
        }
    });
}


// ---------------- Restart Quiz ----------------
function restart() {
    restartbutton.addEventListener("click", function () {
        score = 0;
        currentQuestionIndex = 0;
        scoreElement.innerText = "Score: 0";
        lastscreen.classList.add("d-none");
        quizcontainer.classList.remove("d-none");
        loadQuestion();
    });
}

// ---------------- Initial Load ----------------
questionsnumber.innerText = "Quiz is loading...";
options.forEach(btn => btn.disabled = true); 
setTimeout(() => {
    loadingscreen.classList.add("d-none");
    quizcontainer.classList.remove("d-none");
    loadQuestion();
}, 2000);

selectAnswer();
nextButton();
restart();
