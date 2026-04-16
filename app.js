// ===== App Data =====

let authManager; // Will be set from auth.js

// Fallback AuthManager definition (in case auth.js is not loaded)
class AuthManager {
  constructor() {
    this.users = this.loadUsers();
    this.currentUser = this.loadCurrentUser();
  }

  loadUsers() {
    const stored = localStorage.getItem('vovinam_users');
    return stored ? JSON.parse(stored) : [];
  }

  saveUsers() {
    localStorage.setItem('vovinam_users', JSON.stringify(this.users));
  }

  loadCurrentUser() {
    const stored = localStorage.getItem('vovinam_currentUser');
    return stored ? JSON.parse(stored) : null;
  }

  saveCurrentUser() {
    if (this.currentUser) {
      localStorage.setItem('vovinam_currentUser', JSON.stringify(this.currentUser));
    }
  }

  register(email, fullName, password) {
    if (this.users.find(u => u.email === email)) {
      return { success: false, message: 'Email đã được đăng ký' };
    }

    const newUser = {
      id: Date.now(),
      email,
      fullName,
      password,
      createdAt: new Date().toISOString()
    };

    this.users.push(newUser);
    this.saveUsers();
    return { success: true, message: 'Đăng ký thành công' };
  }

  login(email, password) {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (!user) {
      return { success: false, message: 'Email hoặc mật khẩu không chính xác' };
    }

    this.currentUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName
    };

    this.saveCurrentUser();
    return { success: true, message: 'Đăng nhập thành công' };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('vovinam_currentUser');
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

const appData = {
  quizzes: [
    {
      id: 1,
      topic: 'Kỹ Thuật Cơ Bản',
      title: 'Các Đòn Tay Cơ Bản',
      description: 'Học các kỹ thuật đòn tay cơ bản trong Vovinam',
      emoji: '👊',
      difficulty: 'Dễ',
      questions: [
        {
          id: 101,
          question: 'Đòn tay nào sau đây là đòn sập cơ bản?',
          options: [
            'Đánh từ trên xuống phía trước',
            'Đánh từ dưới lên phía trước',
            'Đánh từ bên cạnh',
            'Đánh xoay vòng'
          ],
          answer: 0
        },
        {
          id: 102,
          question: 'Tư thế chứng đỡ nào là đúng?',
          options: [
            'Chân trái phía trước, chân phải phía sau',
            'Chân phải phía trước, chân trái phía sau',
            'Hai chân song song',
            'Một chân trên vai đối phương'
          ],
          answer: 0
        },
        {
          id: 103,
          question: 'Kỹ thuật nào dùng để khiến đối thủ mất thăng bằng?',
          options: [
            'Đánh',
            'Đá',
            'Cân đặng',
            'Chống'
          ],
          answer: 2
        },
        {
          id: 104,
          question: 'Đòn chân tấn được thực hiện bằng phần nào?',
          options: [
            'Mũi chân',
            'Gót chân',
            'Cạnh ngoài chân',
            'Cạnh trong chân'
          ],
          answer: 0
        },
        {
          id: 105,
          question: 'Vị trí nào là mục tiêu của đòn đá cân?',
          options: [
            'Vùng bụng dưới',
            'Vùng ngực',
            'Vùng mặt',
            'Vùng hông'
          ],
          answer: 0
        }
      ]
    },
    {
      id: 2,
      topic: 'Triết Lý Vovinam',
      title: 'Giáo Lý và Nguyên Tắc',
      description: 'Hiểu rõ những nguyên tắc nền tảng của Vovinam',
      emoji: '🧘',
      difficulty: 'Trung Bình',
      questions: [
        {
          id: 201,
          question: 'Vovinam được thành lập vào năm nào?',
          options: [
            '1938',
            '1945',
            '1950',
            '1960'
          ],
          answer: 0
        },
        {
          id: 202,
          question: 'Người sáng lập Vovinam là ai?',
          options: [
            'Nguyễn Lộc',
            'Võ Văn Tâm',
            'Lê Vinh',
            'Trần Hữu Tuấn'
          ],
          answer: 0
        },
        {
          id: 203,
          question: 'Mục đích chính của Vovinam là gì?',
          options: [
            'Thắng đối thủ trong đấu tranh',
            'Phát triển bản lĩnh, tự vệ và nhân cách',
            'Trở thành vô địch thế giới',
            'Kiếm tiền từ huấn luyện'
          ],
          answer: 1
        },
        {
          id: 204,
          question: 'Nguyên tắc nào là cốt lõi của Vovinam?',
          options: [
            'Bạo lực là giải pháp',
            'Ôn hòa, lề mề và hiệp hòa',
            'Tấn công là cách tốt nhất để phòng thủ',
            'Thắng bằng mọi giá'
          ],
          answer: 1
        },
        {
          id: 205,
          question: 'Người học Vovinam cần phát triển những phẩm chất gì?',
          options: [
            'Chỉ sức mạnh cơ bắp',
            'Chỉ tài năng chiến đấu',
            'Bản lĩnh, kỷ luật, lòng nhân ái',
            'Chỉ kỹ thuật cao'
          ],
          answer: 2
        }
      ]
    },
    {
      id: 3,
      topic: 'Lịch Sử Vovinam',
      title: 'Phát Triển của Ngành Vovinam',
      description: 'Tìm hiểu lịch sử phát triển của Vovinam ở Việt Nam và thế giới',
      emoji: '📚',
      difficulty: 'Khó',
      questions: [
        {
          id: 301,
          question: 'Vovinam được phát triển từ những võ thuật nào?',
          options: [
            'Karate và Judo',
            'Theboxing và MMA',
            'Võ thuật truyền thống Việt Nam và kỹ thuật hiện đại',
            'Wushu và Taekwondo'
          ],
          answer: 2
        },
        {
          id: 302,
          question: 'Tại sao Vovinam được gọi là "Việt Võ Đạo"?',
          options: [
            'Vì nó được các võ sĩ Nhật sáng tạo',
            'Vì nó kết hợp giáo dục, nghệ thuật và triết lý Việt Nam',
            'Vì nó chỉ sử dụng đòn chân',
            'Vì nó không có quy tắc nào'
          ],
          answer: 1
        },
        {
          id: 303,
          question: 'Vovinam đã được công nhận là môn thể thao chính thức ở Việt Nam vào năm nào?',
          options: [
            '1960',
            '1972',
            '1985',
            '2000'
          ],
          answer: 1
        },
        {
          id: 304,
          question: 'Hiện nay, Vovinam được tổ chức quốc tế dưới tên gì?',
          options: [
            'International Vovinam Federation',
            'World Vovinam Organization',
            'Global Vietnamese Martial Arts',
            'Asian Combat Sports Federation'
          ],
          answer: 0
        },
        {
          id: 305,
          question: 'Những nước nào hiện tại là những nơi phát triển Vovinam mạnh mẽ nhất?',
          options: [
            'Chỉ Việt Nam',
            'Việt Nam, Pháp, Đức, Anh',
            'Chỉ Châu Á',
            'Chỉ các nước Liên Xô cũ'
          ],
          answer: 1
        }
      ]
    }
  ],

  contentItems: [
    {
      id: 1,
      title: 'Đòn Tay Cơ Bản',
      category: 'techniques',
      emoji: '👊',
      description: 'Hướng dẫn chi tiết về các kỹ thuật đòn tay cơ bản và cách thực hiện đúng.'
    },
    {
      id: 2,
      title: 'Đòn Chân Nâng Cao',
      category: 'techniques',
      emoji: '🦵',
      description: 'Các kỹ thuật đòn chân nâng cao dành cho học viên cấp độ cao.'
    },
    {
      id: 3,
      title: 'Lịch Sử Vovinam',
      category: 'history',
      emoji: '📖',
      description: 'Khám phá lịch sử hình thành và phát triển của Vovinam qua các thế kỷ.'
    },
    {
      id: 4,
      title: 'Triết Lý Đạo Võ',
      category: 'philosophy',
      emoji: '🧘',
      description: 'Tìm hiểu những nguyên lý triết học nền tảng của Vovinam.'
    },
    {
      id: 5,
      title: 'Tư Thế Chứng Đỡ',
      category: 'techniques',
      emoji: '🏇',
      description: 'Các tư thế chứng đỡ cơ bản và cách chuyển đổi giữa các tư thế.'
    },
    {
      id: 6,
      title: 'Nhân Vật Huyền Thoại',
      category: 'history',
      emoji: '⭐',
      description: 'Những vô địch nổi tiếng và những đóng góp của họ cho Vovinam.'
    }
  ]
};

// ===== User Data Manager =====

class UserDataManager {
  constructor() {
    this.quizResults = this.loadResults();
  }

  loadResults() {
    const stored = localStorage.getItem('vovinam_results');
    return stored ? JSON.parse(stored) : [];
  }

  saveResults() {
    localStorage.setItem('vovinam_results', JSON.stringify(this.quizResults));
  }

  saveQuizResult(quizId, score, totalQuestions, timeTaken) {
    const currentUser = authManager.getCurrentUser();
    if (!currentUser) return;

    const result = {
      id: Date.now(),
      userId: currentUser.id,
      quizId,
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      timeTaken,
      date: new Date().toISOString()
    };

    this.quizResults.push(result);
    this.saveResults();
    return result;
  }

  getUserResults() {
    const currentUser = authManager.getCurrentUser();
    if (!currentUser) return [];
    return this.quizResults.filter(r => r.userId === currentUser.id);
  }

  getStats() {
    const results = this.getUserResults();
    if (results.length === 0) {
      return {
        completedQuizzes: 0,
        avgScore: 0,
        streakDays: 0,
        progress: 0
      };
    }

    const completedQuizzes = results.length;
    const avgScore = Math.round(
      results.reduce((sum, r) => sum + r.percentage, 0) / results.length
    );
    const progress = Math.round((completedQuizzes / appData.quizzes.length) * 100);

    return {
      completedQuizzes,
      avgScore,
      streakDays: 5, // Placeholder
      progress
    };
  }
}

const userDataManager = new UserDataManager();

// ===== Dashboard Logic =====

function initDashboard() {
  if (!authManager.isLoggedIn()) {
    window.location.href = 'index.html';
    return;
  }

  const currentUser = authManager.getCurrentUser();
  const welcomeName = document.getElementById('welcome-name');
  if (welcomeName) {
    welcomeName.textContent = `Xin chào, ${currentUser.fullName}!`;
  }

  // Load stats
  const stats = userDataManager.getStats();
  document.getElementById('completed-quizzes').textContent = stats.completedQuizzes;
  document.getElementById('avg-score').textContent = stats.avgScore + '%';
  document.getElementById('streak-days').textContent = stats.streakDays;
  document.getElementById('progress-percent').textContent = stats.progress + '%';

  // Load quiz cards
  const quizGrid = document.getElementById('quiz-grid');
  if (quizGrid) {
    quizGrid.innerHTML = appData.quizzes.map(quiz => `
      <div class="quiz-card" onclick="goToQuiz(${quiz.id})">
        <div class="quiz-card-image">${quiz.emoji}</div>
        <div class="quiz-card-body">
          <div class="quiz-card-title">${quiz.title}</div>
          <div class="quiz-card-description">${quiz.description}</div>
          <div class="quiz-card-meta">
            <span>${quiz.questions.length} câu hỏi</span>
            <span>${quiz.difficulty}</span>
          </div>
          <button class="quiz-card-button">Bắt Đầu</button>
        </div>
      </div>
    `).join('');
  }

  // Load activity
  const activityList = document.getElementById('activity-list');
  if (activityList) {
    const userResults = userDataManager.getUserResults();
    if (userResults.length === 0) {
      activityList.innerHTML = '<div style="padding: 20px; text-align: center; color: #6b7280;">Chưa có hoạt động nào. Hãy bắt đầu làm bài tập!</div>';
    } else {
      activityList.innerHTML = userResults.slice(-5).reverse().map(result => {
        const quiz = appData.quizzes.find(q => q.id === result.quizId);
        const date = new Date(result.date).toLocaleDateString('vi-VN');
        return `
          <div class="activity-item">
            <div class="activity-content">
              <div class="activity-title">${quiz.title}</div>
              <div class="activity-time">${date}</div>
            </div>
            <span class="activity-status ${result.percentage >= 50 ? 'completed' : 'pending'}">
              ${result.percentage}%
            </span>
          </div>
        `;
      }).join('');
    }
  }

  setupLogout();
}

function goToQuiz(quizId) {
  sessionStorage.setItem('selectedQuizId', quizId);
  window.location.href = 'quiz.html';
}

// ===== Quiz Logic =====

let currentQuizState = {
  quizId: null,
  currentQuestionIndex: 0,
  answers: {},
  startTime: null
};

function initQuiz() {
  if (!authManager.isLoggedIn()) {
    window.location.href = 'index.html';
    return;
  }

  const quizListView = document.getElementById('quiz-list-view');
  const quizList = document.getElementById('quiz-list');

  // Show quiz selection
  if (quizList) {
    quizList.innerHTML = appData.quizzes.map(quiz => `
      <div class="quiz-item">
        <h3>${quiz.emoji} ${quiz.title}</h3>
        <p>${quiz.description}</p>
        <div class="quiz-item-stats">
          <span>${quiz.questions.length} câu hỏi</span>
          <span>${quiz.difficulty}</span>
        </div>
        <button class="btn-primary" onclick="startQuiz(${quiz.id})">Bắt Đầu Bài Tập</button>
      </div>
    `).join('');
  }

  setupLogout();
}

function startQuiz(quizId) {
  currentQuizState.quizId = quizId;
  currentQuizState.currentQuestionIndex = 0;
  currentQuizState.answers = {};
  currentQuizState.startTime = Date.now();

  document.getElementById('quiz-list-view').style.display = 'none';
  document.getElementById('quiz-taker-view').style.display = 'block';
  document.getElementById('results-view').style.display = 'none';

  displayQuestion();
  startTimer();
}

function displayQuestion() {
  const quiz = appData.quizzes.find(q => q.id === currentQuizState.quizId);
  const question = quiz.questions[currentQuizState.currentQuestionIndex];

  document.getElementById('question-counter').textContent = 
    `${currentQuizState.currentQuestionIndex + 1}/${quiz.questions.length}`;

  document.getElementById('question-text').textContent = question.question;

  const optionsGrid = document.getElementById('options-grid');
  optionsGrid.innerHTML = question.options.map((option, index) => `
    <button class="option-btn ${currentQuizState.answers[question.id] === index ? 'selected' : ''}"
            data-option-index="${index}" onclick="selectAnswer(${index})">
      ${option}
    </button>
  `).join('');

  const progressPercent = ((currentQuizState.currentQuestionIndex + 1) / quiz.questions.length) * 100;
  document.getElementById('progress-fill').style.width = progressPercent + '%';

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  prevBtn.disabled = currentQuizState.currentQuestionIndex === 0;
  nextBtn.disabled = currentQuizState.currentQuestionIndex === quiz.questions.length - 1;

  prevBtn.onclick = () => goToPreviousQuestion();
  nextBtn.onclick = () => goToNextQuestion();
  document.getElementById('submit-btn').onclick = () => submitQuiz();
  document.getElementById('back-to-list-btn').onclick = () => backToQuizList();
}

function selectAnswer(index) {
  const quiz = appData.quizzes.find(q => q.id === currentQuizState.quizId);
  const question = quiz.questions[currentQuizState.currentQuestionIndex];
  currentQuizState.answers[question.id] = index;
  displayQuestion();
}

function goToPreviousQuestion() {
  if (currentQuizState.currentQuestionIndex > 0) {
    currentQuizState.currentQuestionIndex--;
    displayQuestion();
  }
}

function goToNextQuestion() {
  const quiz = appData.quizzes.find(q => q.id === currentQuizState.quizId);
  if (currentQuizState.currentQuestionIndex < quiz.questions.length - 1) {
    currentQuizState.currentQuestionIndex++;
    displayQuestion();
  }
}

function submitQuiz() {
  clearInterval(timerInterval);
  
  const quiz = appData.quizzes.find(q => q.id === currentQuizState.quizId);
  let score = 0;

  quiz.questions.forEach(question => {
    if (currentQuizState.answers[question.id] === question.answer) {
      score++;
    }
  });

  const timeTaken = Math.floor((Date.now() - currentQuizState.startTime) / 1000);
  const result = userDataManager.saveQuizResult(
    currentQuizState.quizId,
    score,
    quiz.questions.length,
    timeTaken
  );

  document.getElementById('quiz-taker-view').style.display = 'none';
  document.getElementById('results-view').style.display = 'block';

  const percentage = result.percentage;
  document.getElementById('final-score').textContent = `${score}/${quiz.questions.length}`;
  document.getElementById('final-percentage').textContent = percentage + '%';
  document.getElementById('time-spent').textContent = Math.ceil(timeTaken / 60) + ' phút';

  let feedback = '';
  if (percentage >= 80) {
    feedback = '🎉 Tuyệt vời! Bạn đã làm rất tốt. Tiếp tục giữ vững phong độ!';
  } else if (percentage >= 60) {
    feedback = '👍 Tốt! Bạn đã hoàn thành bài tập. Hãy ôn tập thêm để cải thiện.';
  } else {
    feedback = '📚 Hãy ôn tập lại nội dung và cố gắng làm tốt hơn lần sau.';
  }

  document.getElementById('result-feedback').innerHTML = `<p>${feedback}</p>`;

  document.getElementById('review-btn').onclick = () => {
    window.location.href = 'results.html';
  };

  document.getElementById('home-btn').onclick = () => {
    window.location.href = 'dashboard.html';
  };
}

function backToQuizList() {
  if (confirm('Bạn có chắc chắn muốn quay lại? Tiến độ của bạn sẽ không được lưu.')) {
    document.getElementById('quiz-list-view').style.display = 'block';
    document.getElementById('quiz-taker-view').style.display = 'none';
    document.getElementById('results-view').style.display = 'none';
    clearInterval(timerInterval);
  }
}

let timerInterval;
function startTimer() {
  let seconds = 0;
  timerInterval = setInterval(() => {
    seconds++;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('timer').textContent = 
      `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, 1000);
}

// ===== Results Logic =====

function initResults() {
  if (!authManager.isLoggedIn()) {
    window.location.href = 'index.html';
    return;
  }

  const resultsTable = document.getElementById('results-tbody');
  const userResults = userDataManager.getUserResults();

  if (resultsTable) {
    resultsTable.innerHTML = userResults.map(result => {
      const quiz = appData.quizzes.find(q => q.id === result.quizId);
      const date = new Date(result.date).toLocaleDateString('vi-VN');
      const status = result.percentage >= 50 ? 'pass' : 'fail';
      const statusText = result.percentage >= 50 ? 'Đạt' : 'Chưa Đạt';

      return `
        <tr>
          <td>${quiz.title}</td>
          <td>${date}</td>
          <td><strong>${result.score}/${result.totalQuestions}</strong></td>
          <td><span class="status-badge ${status}">${statusText} (${result.percentage}%)</span></td>
          <td><button class="btn-primary" style="width: 100px; padding: 6px;">Xem Lại</button></td>
        </tr>
      `;
    }).join('');

    if (userResults.length === 0) {
      resultsTable.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 30px; color: #6b7280;">Chưa có kết quả nào. Hãy hoàn thành bài tập để xem kết quả.</td></tr>';
    }
  }

  setupLogout();
}

// ===== Content Logic =====

function initContent() {
  if (!authManager.isLoggedIn()) {
    window.location.href = 'index.html';
    return;
  }

  const contentGrid = document.getElementById('content-grid');
  const tabs = document.querySelectorAll('.tab-btn');

  function displayContent(category = 'all') {
    const filtered = category === 'all' ? appData.contentItems : appData.contentItems.filter(item => item.category === category);
    
    contentGrid.innerHTML = filtered.map(item => `
      <div class="content-card">
        <div class="content-card-image">${item.emoji}</div>
        <div class="content-card-body">
          <div class="content-card-category">${getCategoryLabel(item.category)}</div>
          <div class="content-card-title">${item.title}</div>
          <div class="content-card-description">${item.description}</div>
          <button class="content-card-button">Đọc Tiếp</button>
        </div>
      </div>
    `).join('');
  }

  function getCategoryLabel(category) {
    const labels = {
      techniques: 'Kỹ Thuật',
      history: 'Lịch Sử',
      philosophy: 'Triết Lý'
    };
    return labels[category] || category;
  }

  displayContent();

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      displayContent(tab.dataset.category);
    });
  });

  setupLogout();
}

// ===== Global Setup =====

function setupLogout() {
  const logoutBtn = document.getElementById('logout-btn');
  const userDropdownBtn = document.getElementById('user-dropdown-btn');
  const dropdown = document.getElementById('user-dropdown');

  if (userDropdownBtn) {
    userDropdownBtn.addEventListener('click', () => {
      dropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.user-menu')) {
        dropdown.classList.remove('show');
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      authManager.logout();
      window.location.href = 'index.html';
    });
  }
}

// ===== Auto-initialize based on page =====

document.addEventListener('DOMContentLoaded', () => {
  // Initialize authManager if not already initialized
  if (!authManager) {
    authManager = new AuthManager();
  }
  
  if (document.body.classList.contains('dashboard-page')) {
    initDashboard();
  } else if (document.body.classList.contains('quiz-page')) {
    initQuiz();
  } else if (document.body.classList.contains('results-page')) {
    initResults();
  } else if (document.body.classList.contains('content-page')) {
    initContent();
  }
});
