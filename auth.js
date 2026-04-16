// ===== Authentication System =====
// AuthManager is defined in app.js, we only need to initialize it here

// ===== Auth Page Logic =====

function initAuthPage() {
  authManager = new AuthManager();
  
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
  window.addEventListener('DOMContentLoaded', () => {
    authManager = new AuthManager();
    
    // Redirect if already logged in
    if (authManager.isLoggedIn()) {
      window.location.href = 'dashboard.html';
    }
    
    initAuthPage();
  });
}
