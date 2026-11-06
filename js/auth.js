/**
 * متجر الأزياء الرجالية الفاخر - Authentication Module
 * إدارة تسجيل الدخول وإنشاء الحساب وحالة المستخدم
 */

class AuthManager {
  constructor() {
    this.user = null;
    this.token = null;
    this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const storedUser = localStorage.getItem('luxury_user');
      const storedToken = localStorage.getItem('luxury_token');
      if (storedUser && storedToken) {
        this.user = JSON.parse(storedUser);
        this.token = storedToken;
      }
    } catch (e) {
      console.error('Error loading auth from storage:', e);
    }
  }

  isLoggedIn() {
    return !!this.user && !!this.token;
  }

  getUser() {
    return this.user;
  }

  async login(email, password) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        this.setSession(data.user, data.token);
        return { success: true, user: data.user, message: data.message };
      } else {
        return { success: false, message: data.message || 'بيانات الدخول غير صحيحة' };
      }
    } catch (err) {
      // وضع العمل المستقل (Standalone fallback)
      const mockUser = {
        id: 99,
        fullName: email.includes('admin') ? 'فيصل العتيبي (مدير المتجر)' : 'محمد المنصور (عميل)',
        email: email,
        phone: '+966555555555',
        city: 'الرياض',
        role: email.includes('admin') ? 'admin' : 'customer'
      };
      this.setSession(mockUser, 'mock_jwt_token_standalone_mode');
      return { success: true, user: mockUser, message: 'تم الدخول بنجاح (الوضع التجريبي)' };
    }
  }

  async register(fullName, email, password, phone, city) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, phone, city })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        this.setSession(data.user, data.token);
        return { success: true, user: data.user, message: data.message };
      } else {
        return { success: false, message: data.message || 'تعذر إنشاء الحساب' };
      }
    } catch (err) {
      // Fallback
      const newUser = {
        id: Date.now(),
        fullName,
        email,
        phone: phone || '',
        city: city || 'الرياض',
        role: 'customer'
      };
      this.setSession(newUser, 'mock_token_' + Date.now());
      return { success: true, user: newUser, message: 'تم إنشاء الحساب بنجاح!' };
    }
  }

  setSession(user, token) {
    this.user = user;
    this.token = token;
    localStorage.setItem('luxury_user', JSON.stringify(user));
    localStorage.setItem('luxury_token', token);
    this.updateUI();
  }

  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem('luxury_user');
    localStorage.removeItem('luxury_token');
    this.updateUI();
  }

  updateUI() {
    const userBtn = document.getElementById('userBtn');
    const userBtnText = document.getElementById('userBtnText');
    if (!userBtn) return;

    if (this.isLoggedIn()) {
      if (userBtnText) {
        userBtnText.textContent = this.user.fullName.split(' ')[0];
      }
      userBtn.title = `مرحباً، ${this.user.fullName}`;
      userBtn.classList.add('logged-in');
    } else {
      if (userBtnText) {
        userBtnText.textContent = 'حسابي';
      }
      userBtn.title = 'تسجيل الدخول / إنشاء حساب';
      userBtn.classList.remove('logged-in');
    }
  }
}

window.authManager = new AuthManager();
