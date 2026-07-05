const sampleTexts = [
    "النجاح ليس مفتاح السعادة بل السعادة هي مفتاح النجاح إذا كنت تحب ما تفعل فستكون ناجحاً بلا شك.",
    "تعتبر القراءة من أهم الوسائل التي تساعد الإنسان على توسيع آفاقه الفكرية واكتساب المعارف الجديدة باستمرار.",
    "العمل الجاد والمستمر هو الطريق الوحيد لتحقيق الأهداف الكبيرة وتحويل الأحلام إلى واقع ملموس يعود بالنفع على الجميع."
];

let timer = 60;
let timeLeft = timer;
let timeElapsed = 0;
let timerInterval = null;
let isTypingStarted = false;

const textDisplay = document.getElementById('textDisplay');
const textInput = document.getElementById('textInput');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');
const timerEl = document.getElementById('timer');
const resetBtn = document.getElementById('resetBtn');

function initTest() {
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    textDisplay.innerHTML = '';
    randomText.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        textDisplay.appendChild(span);
    });
    textInput.value = '';
    clearInterval(timerInterval);
    timeLeft = timer;
    timeElapsed = 0;
    isTypingStarted = false;
    timerEl.innerText = timeLeft;
    wpmEl.innerText = 0;
    accuracyEl.innerText = "100%";
    textInput.disabled = false;
}

textInput.addEventListener('input', () => {
    if (!isTypingStarted) {
        isTypingStarted = true;
        startTimer();
    }
    
    const arrayQuote = textDisplay.querySelectorAll('span');
    const arrayValue = textInput.value.split('');
    let correctChars = 0;
    let errors = 0;
    
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if (character == null) {
            characterSpan.className = '';
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
            correctChars++;
        } else {
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct');
            errors++;
        }
    });

    // حساب الدقة
    let totalTyped = arrayValue.length;
    let accuracy = totalTyped > 0 ? Math.round(((totalTyped - errors) / totalTyped) * 100) : 100;
    accuracyEl.innerText = `${accuracy}%`;

    // حساب سرعة الكتابة WPM
    let words = totalTyped / 5; 
    let minutes = timeElapsed / 60;
    if (minutes > 0) {
        let wpm = Math.round(words / minutes);
        wpmEl.innerText = wpm;
    }
});

function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timeElapsed++;
            timerEl.innerText = timeLeft;
        } else {
            clearInterval(timerInterval);
            textInput.disabled = true;
        }
    }, 1000);
}

resetBtn.addEventListener('click', initTest);
window.onload = initTest;
