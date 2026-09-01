let streakCount = 0;
let streakActiveToday = false;

const motivationalPhrases = [
    "🦅 Archie: 'Fantastic work! Keep pushing your boundaries!'",
    "🦅 Archie: 'Brilliant! You are sharper than an eagle's eye today!'",
    "🦅 Archie: 'Incredible! Every correct answer makes your brain stronger!'",
    "🦅 Archie: 'Boom! You've got the mind of a math champion!'",
    "🦅 Archie: 'Sensational! Your math skills are soaring high today!'"
];

let currentGrade = 1;
let currentAnswer = 0;
let score = 0;
let timerInterval = null;
let timeLeft = 30;

const bubble = document.getElementById("archie-bubble");
const gradeScreen = document.getElementById("grade-screen");
const gameScreen = document.getElementById("game-screen");
const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer-input");
const scoreElement = document.getElementById("score");
const timerContainer = document.getElementById("timer-container");
const timerElement = document.getElementById("timer");

function startGame(grade) {
    currentGrade = grade;
    score = 0;
    scoreElement.innerText = score;
    
    gradeScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    
    bubble.innerText = `Awesome! Let's practice Grade ${grade} math!`;
    generateQuestion();
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timerContainer.classList.add("hidden");
    timerContainer.classList.remove("urgent");
    
    // Grade 1 has NO timer. Grade 2 gets 30s. Grade 3+ gets 20s.
    if (currentGrade === 1) return;
    
    timeLeft = currentGrade === 2 ? 30 : 20;
    timerElement.innerText = timeLeft;
    timerContainer.classList.remove("hidden");
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        
        if (timeLeft <= 5) {
            timerContainer.classList.add("urgent");
        }
        
        if (timeLeft <= 0) {
            endGameByTimeout();
        }
    }, 1000);
}

function generateQuestion() {
    answerInput.value = "";
    answerInput.disabled = false;
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
    if (timeLeft <= 0 && currentGrade !== 1) return; 
    
    const userAnswer = parseInt(answerInput.value);
    if (isNaN(userAnswer)) return;
    
    if (userAnswer === currentAnswer) {
        score++;
        scoreElement.innerText = score;
        
        // --- STREAK LOGIC BLOCK ---
        if (!streakActiveToday) {
            streakActiveToday = true;
            streakCount++;
            
            // Save data locally
            localStorage.setItem("numbr_streak_count", streakCount);
            localStorage.setItem("numbr_last_streak_date", new Date().toDateString());
            
            // UI Updates
            document.getElementById("streak-count").innerText = streakCount;
            document.getElementById("streak-flame").className = "flame-lit";
            
            // Archie chooses a random motivational phrase!
            const randomPhrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
            bubble.innerText = randomPhrase;
        } else {
            bubble.innerText = "🦅 Archie: Correct! Great job!";
        }
        // ---------------------------
        
        startTimer();
        setTimeout(generateQuestion, 1200);
    } else {
        bubble.innerText = `🦅 Archie: Not quite! The right answer was ${currentAnswer}. Let's try another!`;
        startTimer();
        setTimeout(generateQuestion, 1800);
    }
}


function endGameByTimeout() {
    clearInterval(timerInterval);
    answerInput.disabled = true;
    bubble.innerText = `🦅 Archie: Time's up! You scored ${score} points! Click 'Change Grade' to play again.`;
}

answerInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

function resetGame() {
    clearInterval(timerInterval);
    gameScreen.classList.add("hidden");
    gradeScreen.classList.remove("hidden");
    bubble.innerText = "Hi! I'm Archie! Which grade are you in?";
}
function loadStreak() {
    const savedStreak = localStorage.getItem("numbr_streak_count");
    const lastDateString = localStorage.getItem("numbr_last_streak_date");
    
    if (savedStreak) {
        streakCount = parseInt(savedStreak);
    }
    
    const todayString = new Date().toDateString();
    
    if (lastDateString === todayString) {
        // Player already earned their streak today
        streakActiveToday = true;
        document.getElementById("streak-flame").className = "flame-lit";
    } else if (lastDateString) {
        // Check if they missed a day to reset the streak
        const lastDate = new Date(lastDateString);
        const today = new Date(todayString);
        const differenceInTime = today.getTime() - lastDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        
        if (differenceInDays > 1.5) { 
            // Missed more than a day, reset streak back to 0
            streakCount = 0;
            localStorage.setItem("numbr_streak_count", 0);
        }
    }
    
    document.getElementById("streak-count").innerText = streakCount;
}

// Automatically load the streak data whenever the webpage loads
window.onload = loadStreak;
