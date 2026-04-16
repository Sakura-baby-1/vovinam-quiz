// ===== Authentication System =====

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
      password, // In production, this should be hashed
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

const authManager = new AuthManager();

// ===== Auth Page Logic =====

function initAuthPage() {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const toSignupBtn = document.getElementById('to-signup');
  const toLoginBtn = document.getElementById('to-login');

  if (!loginForm || !signupForm) return;

  // Form switching
  toSignupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.remove('active');
    signupForm.classList.add('active');
  });

  toLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.classList.remove('active');
    loginForm.classList.add('active');
  });

  // Login form submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const result = authManager.login(email, password);
    if (result.success) {
      window.location.href = 'dashboard.html';
    } else {
      alert(result.message);
    }
  });

  // Signup form submission
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('signup-fullname').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const passwordConfirm = document.getElementById('signup-password-confirm').value;

    if (password !== passwordConfirm) {
      alert('Mật khẩu không khớp');
      return;
    }

    const result = authManager.register(email, fullName, password);
    if (result.success) {
      alert(result.message);
      signupForm.classList.remove('active');
      loginForm.classList.add('active');
      signupForm.reset();
    } else {
      alert(result.message);
    }
  });
}

// Auto-initialize auth page
if (document.body.classList.contains('auth-page')) {
  window.addEventListener('DOMContentLoaded', initAuthPage);
}

// Redirect if already logged in
if (document.body.classList.contains('auth-page') && authManager.isLoggedIn()) {
  window.location.href = 'dashboard.html';
}
