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
      const next = (Number(this.cart[idx].qty) || 1) + d;
      if (next <= 0) this.cart.splice(idx, 1);
      else this.cart[idx].qty = next;
      this.save();
      this.renderCart();
    }

    removeItem(idx) {
      this.cart.splice(idx, 1);
      this.save();
      this.renderCart();
    }

    applyPromo(code) {
      const c = String(code || '').trim().toUpperCase();
      if (!c || !Object.prototype.hasOwnProperty.call(PROMOS, c)) {
        alert('كود الخصم غير صحيح. جرّبي: ELEGANCE20');
        return;
      }
      this.promo = { code: c, rate: PROMOS[c] };
      this.save();
      this.renderCart();
    }

    setCategory(cat) {
      this.filter.category = normCat(cat);
      this.renderAll();
    }

    cardHtml(p) {
      return `
        <div class="product-card" style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; padding:12px; display:flex; flex-direction:column; gap:8px;">
          <img src="${p.images[0]}" alt="${p.name}" onclick="window.app.openDetails(${p.id})" style="width:100%; height:240px; object-fit:cover; border-radius:8px; cursor:pointer; background:#f8fafc;">
          <div style="font-size:0.78rem; color:#b45309; font-weight:700;">${p.category_name}</div>
          <h3 onclick="window.app.openDetails(${p.id})" style="margin:0; font-size:0.98rem; font-weight:800; color:#0f172a; cursor:pointer;">${p.name}</h3>
          <div style="font-weight:900; font-size:1rem; color:#0f172a;">${this.fmt(p.price)}</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:auto;">
            <button type="button" onclick="window.app.buyNow(${p.id})" style="padding:9px; border:none; border-radius:8px; background:#0f172a; color:#fff; font-weight:800; cursor:pointer;">اطلب الآن</button>
            <button type="button" onclick="window.app.addToCart(${p.id})" style="padding:9px; border:1px solid #0f172a; border-radius:8px; background:#fff; color:#0f172a; font-weight:800; cursor:pointer;">أضف للسلة</button>
          </div>
        </div>
      `;
    }

    openDetails(id) {
      const p = PRODUCTS.find(x => Number(x.id) === Number(id));
      if (!p) return;
      this.ensureBox('elgDetailsBox', `
        <div style="background:#fff; width:100%; max-width:560px; border-radius:14px; padding:20px; position:relative; max-height:90vh; overflow-y:auto;">
          <button type="button" onclick="document.getElementById('elgDetailsBox').style.display='none'" style="position:absolute; top:12px; left:12px; border:none; background:#f1f5f9; width:32px; height:32px; border-radius:50%; cursor:pointer; font-weight:800;">✕</button>
          <img src="${p.images[0]}" alt="${p.name}" style="width:100%; height:250px; object-fit:cover; border-radius:10px; margin-bottom:12px;">
          <h2 style="margin:0 0 6px; font-size:1.2rem; color:#0f172a;">${p.name}</h2>
          <div style="font-weight:900; font-size:1.1rem; margin-bottom:8px;">${this.fmt(p.price)}</div>
          <p style="margin:0 0 12px; color:#475569; font-size:0.9rem;">${p.description}</p>
          <div style="margin-bottom:14px;">
            <label style="display:block; font-weight:700; font-size:0.85rem; margin-bottom:4px;">المقاس:</label>
            <select id="detSizeSelect" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:8px;">
              ${(p.sizes || ['موحد']).map(s => `<option value="${s}">${s}</option>`).join('')}
            </select>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <button type="button" onclick="window.app.buyNow(${p.id}, document.getElementById('detSizeSelect').value); document.getElementById('elgDetailsBox').style.display='none';" style="padding:11px; border:none; border-radius:8px; background:#0f172a; color:#fff; font-weight:800; cursor:pointer;">اطلب الآن</button>
            <button type="button" onclick="window.app.addToCart(${p.id}, document.getElementById('detSizeSelect').value); document.getElementById('elgDetailsBox').style.display='none';" style="padding:11px; border:1px solid #0f172a; border-radius:8px; background:#fff; color:#0f172a; font-weight:800; cursor:pointer;">إضافة للسلة</button>
          </div>
        </div>
      `);
    }

    ensureBox(id, innerHtml) {
      let el = document.getElementById(id);
      if (!el) {
        el = document.createElement('div');
        el.id = id;
        el.style.cssText = 'position:fixed; inset:0; background:rgba(15,23,42,0.65); display:flex; align-items:center; justify-content:center; padding:14px; z-index:99999;';
        document.body.appendChild(el);
      }
      el.innerHTML = innerHtml;
      el.style.display = 'flex';
    }

    openCheckout() {
      if (!this.cart.length) {
        alert('السلة فارغة! اختاري منتجاً أولاً.');
        return;
      }
      const { subtotal, discount, shipping, total } = this.totals();
      const rows = this.cart.map(i => `<div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px dashed #e2e8f0; font-size:0.88rem;"><span>${i.name} (${i.size}) × ${i.qty}</span><strong>${this.fmt(i.price * i.qty)}</strong></div>`).join('');

      this.ensureBox('elgCheckoutBox', `
        <div id="elgCheckoutCard" style="background:#fff; width:100%; max-width:500px; border-radius:14px; padding:20px; position:relative; max-height:92vh; overflow-y:auto;">
          <button type="button" onclick="document.getElementById('elgCheckoutBox').style.display='none'" style="position:absolute; top:12px; left:12px; border:none; background:#f1f5f9; width:32px; height:32px; border-radius:50%; cursor:pointer; font-weight:800;">✕</button>
          <h2 style="margin:0 0 10px; font-size:1.2rem; color:#0f172a;">إتمام الطلب وتأكيد الدفع</h2>
          <div style="background:#f8fafc; padding:10px; border-radius:10px; margin-bottom:12px;">
            ${rows}
            <div style="display:flex; gap:6px; margin-top:10px;">
              <input type="text" id="chkPromoInput" value="${this.promo ? this.promo.code : ''}" placeholder="كود الخصم (ELEGANCE20)" style="flex:1; padding:7px 10px; border:1px solid #cbd5e1; border-radius:8px;">
              <button type="button" onclick="window.app.applyPromo(document.getElementById('chkPromoInput').value); window.app.openCheckout();" style="padding:7px 12px; border:none; border-radius:8px; background:#334155; color:#fff; font-weight:700; cursor:pointer;">تطبيق</button>
            </div>
            <div style="margin-top:8px; font-size:0.88rem;">
              <div>المجموع الفرعي: <strong>${this.fmt(subtotal)}</strong></div>
              ${discount > 0 ? `<div style="color:#1580
              
