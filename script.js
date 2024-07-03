// Define arrays for different levels of questions
const mathQuestions = [];
const randomQuestions = [
    { question: 'ما هي عاصمة العراق؟', answers: ['كويت', 'كربلاء', 'بصرة', 'بغداد'], correct: 'بغداد' },
    { question: 'بمن تثق اكثر؟', answers: ['ولد الجنوب', 'ولد البصرة', 'ولد بغداد', 'سليم'], correct: 'سليم' },
    { question: 'افضل لعبة موبايل؟', answers: ['ببجي', 'بوبجي', 'بابج', 'بوبج'], correct: 'ببجي' },
];
const customQuestions = [
    { question: 'لو انت نايم بين رونالدو وجورجينا, لمين راح تعطي ظهرك؟', answers: ['رونالدو', 'ككلوب', 'جورجينا', 'سليم'], correct: 'سليم' },
    { question: 'لو واحد قلك كلام ما عرفت معناه, كيف ترد؟', answers: ['شنو معنى كلامك', 'تحياتي لكل (كلامه)', 'فقص ترا اعرف معناها', 'ذي سبة؟'], correct: 'تحياتي لكل (كلامه)' },
    { question: 'من هي افضل شخصية من الاتي', answers: ['السيد', 'جوبلت', 'ككلوب', 'سليم'], correct: 'سليم' },
];

// Initialize variables
let currentLevel = 0;
let questionIndex = 0;
let questions = mathQuestions;
let timer;
const levelInfo = [
    'المستوى الاول: اسئلة الرياضيات كبدي',
    'المستوى الثاني: اسئلة ثقافية',
    'المستوى الثالث: اسئلة ككلوبية',
];

// DOM elements
const questionElement = document.getElementById('question');
const answerButtons = [
    document.getElementById('answer1'),
    document.getElementById('answer2'),
    document.getElementById('answer3'),
    document.getElementById('answer4'),
];
const resultElement = document.getElementById('result');
const timerElement = document.getElementById('timer');
const levelInfoElement = document.getElementById('level-info');
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const endScreen = document.getElementById('end-screen');
const startButton = document.getElementById('start-button');
const tryAgainButton = document.getElementById('try-again-button');
const endMessage = document.getElementById('end-message');

// Event listeners
startButton.addEventListener('click', startGame);
tryAgainButton.addEventListener('click', startGame);

// Function to start the game
function startGame() {
    currentLevel = 0;
    questionIndex = 0;
    generateMathQuestions(); // Generate math questions for level 1
    levelInfoElement.textContent = levelInfo[currentLevel];
    resultElement.textContent = '';
    document.body.style.backgroundColor = '#f0f0f0';
    startScreen.style.display = 'none';
    endScreen.style.display = 'none';
    questionScreen.style.display = 'block';
    loadQuestion();
}

// Function to generate math questions dynamically
function generateMathQuestions() {
    mathQuestions.length = 0; // Clear previous questions
    for (let i = 0; i < 5; i++) {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const correctAnswer = num1 + num2;
        const incorrectAnswers = [
            correctAnswer - 1,
            correctAnswer + 1,
            correctAnswer + 2
        ].map(answer => answer.toString());
        
        // Shuffle answers array
        const answers = shuffleArray([
            correctAnswer.toString(),
            ...incorrectAnswers
        ]);
        
        const question = {
            question: `What is ${num1} + ${num2}?`,
            answers: answers,
            correct: correctAnswer.toString(),
        };
        mathQuestions.push(question);
    }
}

// Function to shuffle array elements (Fisher-Yates shuffle algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to load a question
function loadQuestion() {
    clearInterval(timer); // Clear any existing timer
    document.body.style.backgroundColor = '#f0f0f0';
    
    if (questionIndex >= questions.length) {
        advanceLevel();
        return;
    }

    const question = questions[questionIndex];
    questionElement.textContent = question.question;
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].textContent = question.answers[i];
        answerButtons[i].onclick = () => checkAnswer(question.answers[i], question.correct);
    }

    startTimer();
}

// Function to start the timer
function startGame() {
    questionIndex = 0; // Reset question index
    resultElement.textContent = '';
    document.body.style.backgroundColor = '#f0f0f0';
    startScreen.style.display = 'none';
    endScreen.style.display = 'none';
    questionScreen.style.display = 'block';

    if (currentLevel === 0) {
        generateMathQuestions(); // Generate math questions for level 1
        questions = mathQuestions;
    } else if (currentLevel === 1) {
        questions = randomQuestions;
    } else if (currentLevel === 2) {
        questions = customQuestions;
    }

    levelInfoElement.textContent = levelInfo[currentLevel]; // Update level information
    loadQuestion();
}

// Function to check the selected answer
function checkAnswer(answer, correctAnswer) {
    if (answer === correctAnswer) {
        questionIndex++;
        if (questionIndex < questions.length) {
            loadQuestion(); // Load next question if available
        } else {
            advanceLevel(); // Advance to next level if no more questions in current level
        }
    } else {
        endGame('lose');
    }
}

// Function to advance to the next level
function advanceLevel() {
    currentLevel++;
    if (currentLevel === 1) {
        questions = randomQuestions;
    } else if (currentLevel === 2) {
        questions = customQuestions;
    } else {
        endGame('win');
        return;
    }
    levelInfoElement.textContent = levelInfo[currentLevel];
    questionIndex = 0;
    loadQuestion();
}

// Function to start the timer
function startTimer() {
    let timeLeft = 15; // Set timer to 15 seconds initially
    timerElement.textContent = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            endGame('lose');
        }
    }, 1000);
}


// Function to end the game
function endGame(result) {
    clearInterval(timer);
    questionScreen.style.display = 'none';
    endScreen.style.display = 'block';
    if (result === 'win') {
        document.body.style.backgroundColor = 'green';
        endMessage.textContent = 'تحياتي لكل ادجاوي حر';
    } else {
        document.body.style.backgroundColor = 'red';
        endMessage.textContent = '😢 لقد قمت بادجاء شده ';
    }
    levelInfoElement.textContent = levelInfo[currentLevel]; // Update level information after losing or winning
}
