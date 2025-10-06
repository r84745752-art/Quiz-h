/* script.js - quiz logic */

// === QUESTIONS ===
// This example uses 10 questions (same as earlier). 
// You can replace this array with your full set of questions if you want.
const questions = [
  {
    id: 1001,
    text: "खीरे के पौधों पर इथ्रेल के छिड़काव की किस मात्रा से मादा फूलों की संख्या बढ़ती है तथा फल भी अधिक मात्रा में लगते हैं?",
    options: ["200 पी.पी. एम", "800 पी.पी.एम", "1400 पी.पी.एम", "2000 पी.पी.एम"],
    correct_option: "1",
    solution: "सही उत्तर: 200 पी.पी.एम"
  },
  {
    id: 1002,
    text: "ईपिकोटाइल ग्राफ्टिंग मुख्य रूप से किस फल में की जाती हैं?",
    options: ["आम", "अनार", "बेर", "अमरूद"],
    correct_option: "1",
    solution: "सही उत्तर: आम"
  },
  {
    id: 1003,
    text: "चिकन एन्ड हेन डिसऑर्डर (दैहिक व्याधि) किस फल में होती हैं?",
    options: ["किन्नों", "अंगूर", "खजूर", "आंवला"],
    correct_option: "2",
    solution: "सही उत्तर: अंगूर"
  },
  {
    id: 1004,
    text: "अनार के फलों के जूस में औसतन कुल घुलनशील पदार्थ (T.S.S) डिग्री ब्रिक्स होता है।",
    options: ["5", "10", "15", "20"],
    correct_option: "3",
    solution: "सही उत्तर: 15"
  },
  {
    id: 1005,
    text: "खजूर का पौधा लगाने के लिए ऑफशूट का वजन होना चाहिए",
    options: ["6 किग्रा.", "12 किग्रा.", "18 किग्रा.", "24 किग्रा."],
    correct_option: "2",
    solution: "सही उत्तर: 12 किग्रा."
  },
  {
    id: 1006,
    text: "डिप्लोडिआ स्टेम एन्ड रॉट किस फल का रोग हैं?",
    options: ["खजूर", "अंगूर", "बेल", "आम"],
    correct_option: "4",
    solution: "सही उत्तर: आम"
  },
  {
    id: 1007,
    text: "केले की पनामा व उखटा रोगरोधी किस्म है",
    options: ["पूवन", "रोबस्टा", "लालकेला", "सफेद बेलची"],
    correct_option: "1",
    solution: "सही उत्तर: पूवन"
  },
  {
    id: 1008,
    text: "अमरूद की 'ललित' किस्म कहाँ से निकाली गयी हैं?",
    options: ["आई.ए.आर.आई., नई दिल्ली", "आई.आई.एच.आर. हैसरगट्टा, बैंगलोर", "जी.बी.पंत. कृषि एंव प्रोद्योगिकी विश्वविद्यालय, पंतनगर, नैनीताल", "सें्ट्रल इन्स्टीट्यूट ऑफ हॉर्टीकल्चर रिसर्च, रहमानखेडा, लखनऊ"],
    correct_option: "4",
    solution: "सही उत्तर: सेन्ट्रल इन्स्टीट्यूट ऑफ हॉर्टीकल्चर रिसर्च, रहमानखेडा, लखनऊ"
  },
  {
    id: 1009,
    text: "'रत्ना' तथा 'अल्फान्सो' के संकरण से आम की कौन-सी किस्म निकाली गयी हैं?",
    options: ["सिन्धु", "रत्ना", "निलेशान", "निलफान्सों"],
    correct_option: "1",
    solution: "सही उत्तर: सिन्धु"
  },
  {
    id: 1010,
    text: "आम की 'केसर' किस्म निम्न में से किस प्रदेश में प्रमुखता से उगाई जाती हैं?",
    options: ["उत्तर प्रदेश", "बिहार", "मध्य प्रदेश", "गुजरात"],
    correct_option: "4",
    solution: "सही उत्तर: गुजरात"
  }
];

// === EXAM INFO ===
const examInfo = { test_duration: 20, test_total_question: questions.length, test_total_marks: questions.length };

// === STATE ===
let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
let quizSubmitted = false;
let timeRemaining = examInfo.test_duration * 60;
let timerInterval = null;

// --- DOM helpers
const quizContent = document.getElementById('quiz-content');
const questionCountEl = document.getElementById('question-count');
const progressBar = document.getElementById('progress-bar');
const timeDisplay = document.getElementById('time-display');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const statQuestions = document.getElementById('stat-questions');
const statMarks = document.getElementById('stat-marks');
const statTime = document.getElementById('stat-time');

// initialize info
statQuestions.textContent = questions.length;
statMarks.textContent = questions.length;
statTime.textContent = examInfo.test_duration;
document.getElementById('info-questions').textContent = questions.length;
document.getElementById('info-marks').textContent = questions.length;
document.getElementById('info-time').textContent = examInfo.test_duration;

// === FUNCTIONS ===

function startQuiz() {
  document.getElementById('welcome-screen').style.display = 'none';
  document.getElementById('quiz-interface').style.display = 'block';
  startTimer();
  showQuestion(0);
}

function startTimer() {
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay();
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      alert('Time is up! Quiz will be submitted automatically.');
      submitQuiz(true);
    }
  }, 1000);
}

function updateTimerDisplay() {
  const m = Math.floor(timeRemaining / 60);
  const s = timeRemaining % 60;
  timeDisplay.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function showQuestion(index) {
  if (index < 0 || index >= questions.length) return;
  currentQuestion = index;
  const q = questions[index];

  let html = `<div class="question">
    <div class="question-text">${index + 1}. ${q.text}</div>
    <ul class="options">`;
  for (let i = 0; i < q.options.length; i++) {
    const optNo = i + 1;
    const selected = userAnswers[index] === String(optNo) ? 'selected' : '';
    html += `<li class="option ${selected}" onclick="selectOption(${optNo})">${q.options[i]}</li>`;
  }
  html += `</ul></div>`;

  quizContent.innerHTML = html;
  questionCountEl.textContent = `Question ${index + 1}/${questions.length}`;
  updateProgress();
  updateNavigation();
}

function selectOption(optionNumber) {
  if (quizSubmitted) return;
  userAnswers[currentQuestion] = String(optionNumber);
  showQuestion(currentQuestion);
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) showQuestion(currentQuestion + 1);
}

function prevQuestion() {
  if (currentQuestion > 0) showQuestion(currentQuestion - 1);
}

function updateNavigation() {
  prevBtn.disabled = currentQuestion === 0;
  if (currentQuestion === questions.length - 1) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'inline-block';
  } else {
    nextBtn.style.display = 'inline-block';
    submitBtn.style.display = 'none';
  }
}

function updateProgress() {
  const pct = ((currentQuestion + 1) / questions.length) * 100;
  progressBar.style.width = pct + '%';
}

function submitQuiz(auto=false) {
  if (!auto) {
    if (!confirm('Are you sure you want to submit your quiz? / क्या आप वाकई में सबमिट करना चाहते हैं?')) return;
  }
  quizSubmitted = true;
  if (timerInterval) clearInterval(timerInterval);
  document.getElementById('quiz-interface').style.display = 'none';
  calculateScore();
}

function calculateScore() {
  let correct = 0, incorrect = 0, skipped = 0;
  for (let i = 0; i < questions.length; i++) {
    const ua = userAnswers[i];
    if (ua === null) skipped++;
    else if (ua === questions[i].correct_option) correct++;
    else incorrect++;
  }

  document.getElementById('score').textContent = `${correct}/${questions.length}`;
  document.getElementById('correct-count').textContent = correct;
  document.getElementById('incorrect-count').textContent = incorrect;
  document.getElementById('skipped-count').textContent = skipped;

  const percent = (correct / questions.length) * 100;
  let msg = '';
  if (percent >= 90) msg = 'Outstanding! Excellent performance!';
  else if (percent >=80) msg = 'Great job! Very good performance!';
  else if (percent >=70) msg = 'Good work! Keep practicing!';
  else if (percent >=60) msg = 'Fair performance. More practice needed.';
  else msg = 'Keep studying and practicing to improve your score.';

  document.getElementById('result-message').textContent = msg;
  showDetailedResults();
  document.getElementById('result-container').style.display = 'block';
  document.getElementById('result-container').scrollIntoView({behavior:'smooth'});
}

function showDetailedResults() {
  const container = document.getElementById('detailed-questions');
  let html = '';
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const ua = userAnswers[i];
    const ca = q.correct_option;
    const skipped = (ua === null);
    const isCorrect = (!skipped && ua === ca);
    const statusClass = skipped ? 'status-skipped' : (isCorrect ? 'status-correct' : 'status-incorrect');
    const statusText = skipped ? 'Skipped' : (isCorrect ? 'Correct' : 'Incorrect');

    html += `<div class="result-question">
      <div class="result-question-text"><strong>Q${i+1}:</strong> ${q.text} <span class="result-status ${statusClass}">${statusText}</span></div>`;
    if (!skipped) {
      html += `<div class="answer-section user-answer"><strong>Your Answer:</strong> ${q.options[parseInt(ua)-1]}</div>`;
    }
    html += `<div class="answer-section correct-answer"><strong>Correct Answer:</strong> ${q.options[parseInt(ca)-1]}</div>
      <div class="solution"><strong>Solution:</strong> ${q.solution}</div>
    </div>`;
  }
  container.innerHTML = html;
}

function restartQuiz() {
  currentQuestion = 0;
  userAnswers = new Array(questions.length).fill(null);
  quizSubmitted = false;
  timeRemaining = examInfo.test_duration * 60;
  document.getElementById('result-container').style.display = 'none';
  document.getElementById('welcome-screen').style.display = 'block';
  document.getElementById('quiz-interface').style.display = 'none';
  // Reset timer display
  timeDisplay.textContent = '00:00';
}
