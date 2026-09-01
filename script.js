let currentGrade = 1;
let currentAnswer = 0;
let score = 0;

const bubble = document.getElementById("archie-bubble");
const gradeScreen = document.getElementById("grade-screen");
const gameScreen = document.getElementById("game-screen");
const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer-input");
const scoreElement = document.getElementById("score");

function startGame(grade) {
    currentGrade = grade;
    score = 0;
    scoreElement.innerText = score;
    
    gradeScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    
    bubble.innerText = `Awesome! Let's practice Grade ${grade} math!`;
    generateQuestion();
}

function generateQuestion() {
    answerInput.value = "";
    answerInput.focus();
    
    let num1, num2, operation;
    
    if (currentGrade === 1) {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        operation = Math.random() > 0.5 ? '+' : '-';
        if (operation === '-' && num1 < num2) { [num1, num2] = [num2, num1]; }
        
        currentAnswer = operation === '+' ? num1 + num2 : num1 - num2;
        questionElement.innerText = `${num1} ${operation} ${num2} = ?`;
        
    } else if (currentGrade === 2) {
        operation = ['+', '-', '*'][Math.floor(Math.random() * 3)];
        if (operation === '*') {
            num1 = Math.floor(Math.random() * 5) + 1;
            num2 = Math.floor(Math.random() * 5) + 1;
            currentAnswer = num1 * num2;
            questionElement.innerText = `${num1} × ${num2} = ?`;
        } else {
            num1 = Math.floor(Math.random() * 40) + 10;
            num2 = Math.floor(Math.random() * 20) + 1;
            if (operation === '-' && num1 < num2) { [num1, num2] = [num2, num1]; }
            currentAnswer = operation === '+' ? num1 + num2 : num1 - num2;
            questionElement.innerText = `${num1} ${operation} ${num2} = ?`;
        }
        
    } else {
        operation = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
        if (operation === '/') {
            num2 = Math.floor(Math.random() * 9) + 2;
            currentAnswer = Math.floor(Math.random() * 9) + 1;
            num1 = num2 * currentAnswer;
            questionElement.innerText = `${num1} ÷ ${num2} = ?`;
        } else if (operation === '*') {
            num1 = Math.floor(Math.random() * 10) + 2;
            num2 = Math.floor(Math.random() * 10) + 2;
            currentAnswer = num1 * num2;
            questionElement.innerText = `${num1} × ${num2} = ?`;
        } else {
            num1 = Math.floor(Math.random() * 80) + 20;
            num2 = Math.floor(Math.random() * 80) + 20;
            if (operation === '-' && num1 < num2) { [num1, num2] = [num2, num1]; }
            currentAnswer = operation === '+' ? num1 + num2 : num1 - num2;
            questionElement.innerText = `${num1} ${operation} ${num2} = ?`;
        }
    }
}

function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);
    
    if (isNaN(userAnswer)) return;
    
    if (userAnswer === currentAnswer) {
        score++;
        scoreElement.innerText = score;
        bubble.innerText = "🦅 Archie: Correct! Great job!";
        setTimeout(generateQuestion, 1200);
    } else {
        bubble.innerText = `🦅 Archie: Not quite! The right answer was ${currentAnswer}. Let's try another!`;
        setTimeout(generateQuestion, 2000);
    }
}

// Allow user to press 'Enter' key to submit
answerInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

function resetGame() {
    gameScreen.classList.add("hidden");
    gradeScreen.classList.remove("hidden");
    bubble.innerText = "Hi! I'm Archie! Which grade are you in?";
}
