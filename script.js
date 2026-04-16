/* script.js
   Chứa toàn bộ logic quiz và điều hướng nhỏ cho website.
   Phần này tách riêng để dễ đọc và mở rộng. */

const questions = [
  {
    question: "Người sáng lập Vovinam là ai?",
    options: ["Nguyễn Lộc", "Lê Sáng", "Nguyễn Văn Chiếu", "Trần Huy Phong"],
    correct: 0
  },
  {
    question: "Vovinam ra đời năm nào?",
    options: ["1938", "1945", "1954", "1975"],
    correct: 0
  },
  {
    question: "Võ Việt Nam còn được gọi là gì?",
    options: ["Vovinam Viet Vo Dao", "Vovinam Vo Dao", "Vo Viet Nam", "Vovinam"],
    correct: 1
  },
  {
    question: "Vovinam là bộ môn võ của nước nào?",
    options: ["Thái Lan", "Hàn Quốc", "Việt Nam", "Trung Quốc"],
    correct: 2
  },
  {
    question: "Ý nghĩa của từ 'Vo' trong Vovinam là gì?",
    options: ["Võ thuật", "Quân đội", "Dân tộc", "Quốc gia"],
    correct: 0
  },
  {
    question: "Ý nghĩa của từ 'Vi' trong Vovinam là gì?",
    options: ["Võ thuật", "Quân đội", "Dân tộc", "Quốc gia"],
    correct: 2
  },
  {
    question: "Ý nghĩa của từ 'Nam' trong Vovinam là gì?",
    options: ["Võ thuật", "Quân đội", "Dân tộc", "Quốc gia"],
    correct: 3
  },
  {
    question: "Vovinam được phát triển từ những bộ môn võ nào?",
    options: ["Karate và Judo", "Võ cổ truyền Việt Nam", "Taekwondo", "Muay Thai"],
    correct: 1
  },
  {
    question: "Mục tiêu chính của Vovinam là gì?",
    options: ["Giải trí", "Tự vệ và rèn luyện thân thể", "Thi đấu chuyên nghiệp", "Giải trí"],
    correct: 1
  },
  {
    question: "Vovinam có bao nhiêu cấp đai?",
    options: ["6 cấp", "9 cấp", "12 cấp", "15 cấp"],
    correct: 1
  },
  {
    question: "Màu đai đầu tiên trong Vovinam là gì?",
    options: ["Đen", "Trắng", "Vàng", "Xanh"],
    correct: 1
  },
  {
    question: "Vovinam được công nhận là môn võ chính thức của Việt Nam từ năm nào?",
    options: ["1945", "1954", "1975", "1990"],
    correct: 0
  },
  {
    question: "Vovinam có những kỹ thuật nào?",
    options: ["Chỉ quyền cước", "Quyền, cước, đòn thế, binh khí", "Chỉ khiêu vũ", "Chỉ aerobic"],
    correct: 1
  },
  {
    question: "Nguyên tắc 'Luyện công phu' trong Vovinam nghĩa là gì?",
    options: ["Luyện tập chăm chỉ", "Luyện tập qua loa", "Luyện tập theo sở thích", "Luyện tập ít"],
    correct: 0
  },
  {
    question: "Vovinam nhấn mạnh yếu tố nào?",
    options: ["Sức mạnh thể chất", "Tinh thần kỷ luật và đạo đức", "Giải trí", "Thi đấu"],
    correct: 1
  },
  {
    question: "Vovinam có bài quyền biểu diễn nào?",
    options: ["Bài quyền 12 động tác", "Bài quyền 20 động tác", "Bài quyền 30 động tác", "Bài quyền 50 động tác"],
    correct: 0
  },
  {
    question: "Vovinam có những đòn thế nào?",
    options: ["Ném, vật, khóa khớp", "Chỉ đá", "Chỉ quyền", "Chỉ aerobic"],
    correct: 0
  },
  {
    question: "Vovinam có môn binh khí nào?",
    options: ["Kiếm, đao, côn, thương", "Chỉ súng", "Chỉ lựu đạn", "Chỉ xe tăng"],
    correct: 0
  },
  {
    question: "Vovinam có bài tập đối luyện không?",
    options: ["Không có", "Có, để thực hành kỹ thuật", "Chỉ tập đơn", "Chỉ tập nhóm"],
    correct: 1
  },
  {
    question: "Vovinam được phổ biến ở những nước nào?",
    options: ["Chỉ Việt Nam", "Việt Nam và một số nước châu Á", "Toàn thế giới", "Chỉ châu Âu"],
    correct: 2
  }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const quizModal = document.getElementById('quizModal');
const quizProgress = document.getElementById('quizProgress');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizFeedback = document.getElementById('quizFeedback');
const nextBtn = document.getElementById('nextBtn');

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answered = false;
  quizModal.style.display = 'block';
  quizFeedback.innerText = '';
  nextBtn.style.display = 'inline-block';
  nextBtn.disabled = true;
  loadQuestion();
}

function closeQuiz() {
  quizModal.style.display = 'none';
  document.querySelector('.main-menu').classList.remove('show');
}

function loadQuestion() {
  answered = false;
  quizFeedback.innerText = '';
  const current = questions[currentQuestionIndex];
  quizProgress.innerText = `Câu ${currentQuestionIndex + 1} / ${questions.length}`;
  quizQuestion.innerText = current.question;

  quizOptions.innerHTML = current.options
    .map((option, index) => `<button class="quiz-option" onclick="checkAnswer(${index})">${option}</button>`)
    .join('');

  nextBtn.disabled = true;
}

function checkAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const current = questions[currentQuestionIndex];
  if (selectedIndex === current.correct) {
    score += 1;
    quizFeedback.innerText = '✔ Đúng!';
    quizFeedback.style.color = '#4caf50';
  } else {
    quizFeedback.innerText = `✘ Sai - Đáp án đúng: ${current.options[current.correct]}`;
    quizFeedback.style.color = '#f44336';
  }

  nextBtn.disabled = false;
}

function nextQuestion() {
  currentQuestionIndex += 1;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizQuestion.innerText = 'Hoàn thành bài thi!';
  quizOptions.innerHTML = '';
  nextBtn.style.display = 'none';
  const percentage = Math.round((score / questions.length) * 100);
  let resultText = `Điểm của bạn: ${score}/${questions.length} (${percentage}%)`;

  if (score >= 14) {
    resultText += ' 🎉 ĐẠT - Chúc mừng bạn đã hoàn thành bài thi!';
    quizFeedback.style.color = '#4caf50';
  } else {
    resultText += ' ❌ CẦN ÔN TẬP THÊM - Hãy học thêm về Vovinam!';
    quizFeedback.style.color = '#f44336';
  }

  quizFeedback.innerText = resultText;
}

function toggleMenu() {
  document.querySelector('.main-menu').classList.toggle('show');
}

window.onclick = function(event) {
  if (event.target === quizModal) {
    closeQuiz();
  }
};
