(function () {
  const CURRENCY = 'د.أ';
  const SHIPPING_FEE = 5;
  const FREE_SHIPPING_MIN = 50;
  const CODES = { ELEGANCE20: 0.2, ELEGANCE10: 0.1, WELCOME15: 0.15 };

  const ITEMS = [
    {
      id: 1,
      name: 'بدلة توكسيدو ملكية سوداء فاخرة',
      cat: 'بدلات رسمية',
      price: 240,
      img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
      desc: 'بدلة توكسيدو فاخرة للمناسبات والاجتماعات الرسمية.'
    },
    {
      id: 2,
      name: 'بدلة كلاسيكية زرقاء كحلية',
      cat: 'بدلات رسمية',
      price: 185,
      img: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80',
      desc: 'بدلة كحلية أنيقة للعمل والمناسبات.'
    },
    {
      id: 3,
      name: 'قميص أبيض ناصع من القطن المصري',
      cat: 'قمصان فاخرة',
      price: 42,
      img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      desc: 'قميص أبيض ناعم ومريح للدوام والمناسبات.'
    },
    {
      id: 4,
      name: 'قميص أكسفورد أزرق سماوي',
      cat: 'قمصان فاخرة',
      price: 38,
      img: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
      desc: 'قميص سماوي عملي وأنيق.'
    },
    {
      id: 5,
      name: 'بنطال تشينو كلاسيكي كحلي',
      cat: 'بناطيل رجالية',
      price: 44,
      img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
      desc: 'بنطال تشينو مريح بقصة عصرية.'
    },
    {
      id: 6,
      name: 'ساعة كلاسيكية رجالية جلد أسود',
      cat: 'إكسسوارات',
      price: 150,
      img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
      desc: 'ساعة رجالية أنيقة بسوار جلدي.'
    }
  ];

  class Store {
    constructor() {
      this.cart = [];
      this.promo = null;
      this.method = 'كاش';
      this.selectedCat = 'الكل';
      this.searchQuery = '';
      try { this.cart = JSON.parse(localStorage.getItem('store_cart_v1') || '[]') || []; } catch (_) {}
      try { this.promo = JSON.parse(localStorage.getItem('store_promo_v1') || 'null'); } catch (_) {}
    }

    money(n) {
      return `${(Number(n) || 0).toFixed(2)} ${CURRENCY}`;
    }

    save() {
      try {
        localStorage.setItem('store_cart_v1', JSON.stringify(this.cart));
        localStorage.setItem('store_promo_v1', JSON.stringify(this.promo));
      } catch (_) {}
    }

    calc() {
      const count = this.cart.reduce((s, x) => s + (Number(x.qty) || 1), 0);
      const sub = this.cart.reduce((s, x) => s + (Number(x.price) || 0) * (
