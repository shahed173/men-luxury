/**
 * متجر إليجانس للأزياء الرجالية الفاخرة - نسخة نظيفة ومباشرة
 */
(function () {
  const CURRENCY = 'د.أ';
  const FREE_SHIPPING_THRESHOLD = 50;
  const SHIPPING_FEE = 5;
  const PROMOS = { ELEGANCE20: 0.2, ELEGANCE10: 0.1, WELCOME15: 0.15 };

  const PRODUCTS = [
    { id: 1, name: 'بدلة توكسيدو ملكية سوداء فاخرة', category_slug: 'suits', category_name: 'بدلات رسمية', price: 240, original_price: 295, sizes: ['48 (S)', '50 (M)', '52 (L)', '54 (XL)'], images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'], description: 'بدلة توكسيدو فاخرة للمناسبات والاجتماعات الرسمية من صوف الميرينو.', is_featured: true, reviews_count: 38 },
    { id: 2, name: 'بدلة كلاسيكية زرقاء كحلية من الصوف الخالص', category_slug: 'suits', category_name: 'بدلات رسمية', price: 185, original_price: 225, sizes: ['48 (S)', '50 (M)', '52 (L)', '54 (XL)'], images: ['https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80'], description: 'بدلة كحلية أنيقة بقصة متقنة تناسب العمل والمناسبات.', is_featured: true, reviews_count: 24 },
    { id: 3, name: 'بدلة رمادية عصرية ذات نقوش مربعات ناعمة', category_slug: 'suits', category_name: 'بدلات رسمية', price: 195, original_price: 240, sizes: ['50 (M)', '52 (L)', '54 (XL)'], images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'], description: 'تصميم عصري بنقشة مربعات خفيفة ومريحة.', is_featured: false, reviews_count: 15 },
    { id: 4, name: 'قميص أبيض ناصع من القطن المصري الفاخر', category_slug: 'shirts', category_name: 'قمصان فاخرة', price: 42, original_price: 55, sizes: ['S', 'M', 'L', 'XL', 'XXL'], images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'], description: 'قميص أبيض ناعم من القطن المصري عالي الجودة.', is_featured: true, reviews_count: 72 },
    { id: 5, name: 'قميص أكسفورد أزرق سماوي كاجوال وأنيق', category_slug: 'shirts', category_name: 'قمصان فاخرة', price: 38, original_price: 48, sizes: ['S', 'M', 'L', 'XL'], images: ['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80'], description: 'قميص سماوي عملي وأنيق للدوام والطلعات.', is_featured: true, reviews_count: 41 },
    { id: 6, name: 'قميص كتان طبيعي بيج للصيف والإجازات', category_slug: 'shirts', category_name: 'قمصان فاخرة', price: 45, original_price: null, sizes: ['M', 'L', 'XL'], images: ['https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=800&q=80'], description: 'خامة كتان خفيفة ومريحة للأجواء الدافئة.', is_featured: false, reviews_count: 19 },
    { id: 7, name: 'بنطال تشينو كلاسيكي كحلي بقصة مدببة', category_slug: 'pants', category_name: 'بناطيل رجالية', price: 44, original_price: 55, sizes: ['30', '32', '34', '36', '38'], images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80'], description: 'بنطال تشينو مرن وأنيق بقصة عصرية.', is_featured: true, reviews_count: 53 },
    { id: 8, name: 'بنطال رسمي صوف خفيف رمادي فحمي', category_slug: 'pants', category_name: 'بناطيل رجالية', price: 65, original_price: 80, sizes: ['31', '32', '34', '36'], images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80'], description: 'بنطال رسمي خفيف بتفصيل أنيق.', is_featured: false, reviews_count: 31 },
    { id: 9, name: 'ساعة كلاسيكية رجالية بسوار جلد أسود', category_slug: 'accessories', category_name: 'إكسسوارات وأحذية', price: 150, original_price: 195, sizes: ['40 ملم'], images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80'], description: 'ساعة رجالية كلاسيكية بسوار جلدي أنيق.', is_featured: true, reviews_count: 48 },
    { id: 10, name: 'حزام جلد طبيعي إيطالي بوجهين', category_slug: 'accessories', category_name: 'إكسسوارات وأحذية', price: 35, original_price: 45, sizes: ['90 سم', '95 سم', '100 سم'], images: ['https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80'], description: 'حزام جلد طبيعي بوجهين أسود وبني.', is_featured: false, reviews_count: 64 },
    { id: 11, name: 'ساعة كرونوغراف رجالية فاخرة', category_slug: 'accessories', category_name: 'إكسسوارات وأحذية', price: 120, original_price: 150, sizes: ['مقاس موحد'], images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'], description: 'إكسسوار رجالي أنيق لإطلالة مكتملة.', is_featured: true, reviews_count: 27 }
  ];

  function normCat(v) {
    const s = String(v || 'all').toLowerCase().trim();
    if (!s || s === 'all' || s.includes('كافة') || s.includes('التشكيلة')) return 'all';
    if (s.includes('suit') || s.includes('بدل')) return 'suits';
    if (s.includes('shirt') || s.includes('قميص') || s.includes('قمصان')) return 'shirts';
    if (s.includes('pant') || s.includes('بنطال') || s.includes('بناطيل')) return 'pants';
    if (s.includes('accessor') || s.includes('إكسسوار') || s.includes('اكسسوار') || s.includes('ساع')) return 'accessories';
    return s;
  }

  class StoreApp {
    constructor() {
      this.cart = [];
      this.promo = null;
      this.payType = 'كاش';
      this.filter = { category: 'all', search: '', maxPrice: 500, sort: 'popular' };
      this.load();
    }

    fmt(n) { return `${(Number(n) || 0).toFixed(2)} ${CURRENCY}`; }

    load() {
      try { this.cart = JSON.parse(localStorage.getItem('elg_cart') || '[]') || []; } catch (_) { this.cart = []; }
      try { this.promo = JSON.parse(localStorage.getItem('elg_promo') || 'null'); } catch (_) { this.promo = null; }
    }

    save() {
      try {
        localStorage.setItem('elg_cart', JSON.stringify(this.cart));
        localStorage.setItem('elg_promo', JSON.stringify(this.promo));
      } catch (_) {}
    }

    totals() {
      const count = this.cart.reduce((a, b) => a + (Number(b.qty) || 1), 0);
      const subtotal = this.cart.reduce((a, b) => a + (Number(b.price) || 0) * (Number(b.qty) || 1), 0);
      const discount = subtotal * (this.promo ? Number(this.promo.rate) || 0 : 0);
      const afterDisc = Math.max(0, subtotal - discount);
      const shipping = subtotal === 0 || afterDisc >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
      return { count, subtotal, discount, shipping, total: afterDisc + shipping };
    }

    addToCart(id, size) {
      const p = PRODUCTS.find(x => Number(x.id) === Number(id));
      if (!p) return;
      const chosenSize = size || (p.sizes && p.sizes[0]) || '';
      const found = this.cart.find(i => Number(i.id) === Number(p.id) && i.size === chosenSize);
      if (found) found.qty = (Number(found.qty) || 1) + 1;
      else this.cart.push({ id: p.id, name: p.name, size: chosenSize, price: p.price, image: p.images[0], qty: 1 });
      this.save();
      this.renderCart();
    }

    buyNow(id, size) {
      this.addToCart(id, size);
      this.openCheckout();
    }

    changeQty(idx, d) {
      if (!this.cart[idx]) return;
      const next = (Number(this.cart[idx].qty) ||
