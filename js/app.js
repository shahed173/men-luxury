(function () {
  const CURRENCY = 'د.أ';
  const SHIPPING_FEE = 5;
  const FREE_SHIPPING_MIN = 50;
  const CODES = { ELEGANCE20: 0.2, ELEGANCE10: 0.1, WELCOME15: 0.15 };

  const CAT_MAP = {
    all: 'all',
    suits: 'بدلات رسمية',
    shirts: 'قمصان فاخرة',
    pants: 'بناطيل رجالية',
    accessories: 'إكسسوارات'
  };

  const ITEMS = [
    { id: 1, name: 'بدلة توكسيدو ملكية سوداء فاخرة', cat: 'بدلات رسمية', sizes: ['M', 'L', 'XL', 'XXL'], price: 240, img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80', desc: 'بدلة توكسيدو فاخرة للمناسبات والاجتماعات الرسمية.' },
    { id: 2, name: 'بدلة كلاسيكية زرقاء كحلية', cat: 'بدلات رسمية', sizes: ['S', 'M', 'L', 'XL'], price: 185, img: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80', desc: 'بدلة كحلية أنيقة للعمل والمناسبات.' },
    { id: 3, name: 'بدلة رمادية عصرية بنقشة مربعات', cat: 'بدلات رسمية', sizes: ['M', 'L', 'XL'], price: 195, img: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=800&q=80', desc: 'قصّة حديثة تمنحك حضوراً راقياً في الاجتماعات.' },
    { id: 4, name: 'بليزر كحلي رسمي بقصة عصرية', cat: 'بدلات رسمية', sizes: ['S', 'M', 'L', 'XL', 'XXL'], price: 135, img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', desc: 'بليزر أنيق يسهل تنسيقه مع القمصان والبناطيل.' },
    { id: 5, name: 'قميص أبيض ناصع من القطن المصري', cat: 'قمصان فاخرة', sizes: ['S', 'M', 'L', 'XL', 'XXL'], price: 42, img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80', desc: 'قميص أبيض ناعم ومريح للدوام والمناسبات.' },
    { id: 6, name: 'قميص أكسفورد أزرق سماوي', cat: 'قمصان فاخرة', sizes: ['S', 'M', 'L', 'XL'], price: 38, img: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80', desc: 'قميص سماوي عملي وأنيق.' },
    { id: 7, name: 'قميص كتان بيج صيفي راقٍ', cat: 'قمصان فاخرة', sizes: ['M', 'L', 'XL'], price: 45, img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80', desc: 'خامة خفيفة ومريحة للأجواء الدافئة والإطلالات الهادئة.' },
    { id: 8, name: 'قميص أسود سادة بقصة Slim Fit', cat: 'قمصان فاخرة', sizes: ['S', 'M', 'L'], price: 40, img: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&w=800&q=80', desc: 'إطلالة مسائية أنيقة مع قصة محددة مريحة.' },
    { id: 9, name: 'بنطال تشينو كلاسيكي كحلي', cat: 'بناطيل رجالية', sizes: ['S', 'M', 'L', 'XL', 'XXL'], price: 44, img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80', desc: 'بنطال تشينو مريح بقصة عصرية.' },
    { id: 10, name: 'بنطال قماشي رمادي رسمي', cat: 'بناطيل رجالية', sizes: ['M', 'L', 'XL', 'XXL'], price: 52, img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80', desc: 'بنطال مناسب للبدلات والإطلالات المكتبية اليومية.' },
    { id: 11, name: 'ساعة كلاسيكية رجالية جلد أسود', cat: 'إكسسوارات', sizes: ['S', 'M', 'L', 'XL', 'XXL'], price: 150, img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80', desc: 'ساعة رجالية أنيقة بسوار جلدي.' },
    { id: 12, name: 'ساعة كرونوغراف فضية فاخرة', cat: 'إكسسوارات', sizes: ['S', 'M', 'L', 'XL', 'XXL'], price: 175, img: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80', desc: 'تصميم معدني متين يضيف لمسة فخامة لإطلالتك.' }
  ];

  class Store {
    constructor() {
      this.cart = [];
      this.promo = null;
      this.method = 'كاش';
      this.category = 'all';
      this.size = null;
      this.maxPrice = 350;
      try { this.cart = JSON.parse(localStorage.getItem('store_cart_v1') || '[]') || []; } catch (_) {}
      try { this.promo = JSON.parse(localStorage.getItem('store_promo_v1') || 'null'); } catch (_) {}
    }

    normalizeCat(cat) {
      if (!cat || cat === 'all') return 'all';
      if (CAT_MAP[cat]) return CAT_MAP[cat];
      if (cat.includes('إكسسوارات')) return 'إكسسوارات';
      return cat;
    }

    setCategory(cat) {
      this.category = this.normalizeCat(cat);
      this.syncFilterUI();
      this.drawProducts();
      this.drawCart();
    }

    setSize(sz) {
      this.size = this.size === sz ? null : sz;
      this.syncFilterUI();
      this.drawProducts();
      this.drawCart();
    }

    setMaxPrice(val) {
      this.maxPrice = Number(val) || 350;
      this.drawProducts();
      this.drawCart();
    }

    resetFilters() {
      this.category = 'all';
      this.size = null;
      this.maxPrice = 350;
      const slider = document.getElementById('priceRangeSlider');
      const label = document.getElementById('priceRangeVal');
      if (slider) slider.value = '350';
      if (label) label.textContent = 'حتى 350 د.أ';
      this.syncFilterUI();
      this.drawProducts();
      this.drawCart();
    }

    syncFilterUI() {
      document.querySelectorAll('.catalog-tab-btn').forEach(btn => {
        const btnCat = this.normalizeCat(btn.getAttribute('data-cat'));
        btn.classList.toggle('active', btnCat === this.category);
      });

      document.querySelectorAll('.filter-item[data-cat]').forEach(item => {
        const itemCat = this.normalizeCat(item.getAttribute('data-cat'));
        item.classList.toggle('active', itemCat === this.category);
      });

      document.querySelectorAll('.filter-size-chip[data-size]').forEach(chip => {
        chip.classList.toggle('active', chip.getAttribute('data-size') === this.size);
      });
    }

    getFilteredItems() {
      return ITEMS.filter(p => {
        const catMatch = this.category === 'all' || p.cat === this.category;
        const sizeMatch = !this.size || (Array.isArray(p.sizes) && p.sizes.includes(this.size));
        const priceMatch = Number(p.price) <= Number(this.maxPrice);
        return catMatch && sizeMatch && priceMatch;
      });
    }

    bindFiltersOnce() {
      if (this._filtersBound) return;
      this._filtersBound = true;

      document.querySelectorAll('.catalog-tab-btn[data-cat], .filter-item[data-cat]').forEach(el => {
        el.addEventListener('click', e => {
          e.preventDefault();
          this.setCategory(el.getAttribute('data-cat'));
        });
      });

      document.querySelectorAll('.filter-size-chip[data-size]').forEach(chip => {
        chip.addEventListener('click', e => {
          e.preventDefault();
          this.setSize(chip.getAttribute('data-size'));
        });
      });

      const slider = document.getElementById('priceRangeSlider');
      if (slider) {
        slider.addEventListener('input', () => {
          this.setMaxPrice(slider.value);
        });
      }

      if (window.__pendingCategory) {
        this.category = this.normalizeCat(window.__pendingCategory);
        window.__pendingCategory = null;
      }
      this.syncFilterUI();
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
      const sub = this.cart.reduce((s, x) => s + (Number(x.price) || 0) * (Number(x.qty) || 1), 0);
      const disc = sub * (this.promo ? Number(this.promo.rate) || 0 : 0);
      const after = Math.max(0, sub - disc);
      const ship = sub === 0 || after >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE;
      return { count, sub, disc, ship, total: after + ship };
    }

    add(id) {
      const p = ITEMS.find(x => Number(x.id) === Number(id));
      if (!p) return;
      const found = this.cart.find(x => Number(x.id) === Number(p.id));
      if (found) found.qty += 1;
      else this.cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, qty: 1 });
      this.save();
      this.drawCart();
    }

    buyNow(id) {
      this.add(id);
      this.openPay();
    }

    qty(i, d) {
      if (!this.cart[i]) return;
      this.cart[i].qty += d;
      if (this.cart[i].qty <= 0) this.cart.splice(i, 1);
      this.save();
      this.drawCart();
    }

    del(i) {
      this.cart.splice(i, 1);
      this.save();
      this.drawCart();
    }

    applyCode(val) {
      const code = String(val || '').trim().toUpperCase();
      if (!code || !Object.prototype.hasOwnProperty.call(CODES, code)) {
        alert('كود الخصم غير صحيح. جرّبي: ELEGANCE20');
        return;
      }
      this.promo = { code, rate: CODES[code] };
      this.save();
      this.drawCart();
    }

    cleanOldCatalogUI() {
      const idsToHide = [
        'catalogSearchInput',
        'catalogResultsCount',
        'catalogSortSelect'
      ];
      for (const id of idsToHide) {
        const el = document.getElementById(id);
        if (el) el.remove();
      }

      const toolbar = document.querySelector('#catalog .catalog-toolbar');
      if (toolbar) toolbar.remove();

      const words = ['عرض المنتجات', 'الترتيب:', 'الترتيب', 'الأكثر طلباً', 'الأكثر طلبا', 'تقييماً', 'تقييما', 'ابحث باسم القطعة'];
      const els = Array.from(document.querySelectorAll('#catalog label, #catalog span, #catalog select, #catalog input, #catalog p'));
      for (const el of els) {
        if (el.closest('#liveStoreApp')) continue;
        const txt = (el.textContent || '').trim();
        const ph = (el.getAttribute && el.getAttribute('placeholder')) || '';
        if (words.some(w => txt.includes(w) || ph.includes(w))) {
          el.remove();
        }
      }
    }

    ensureRoot() {
      this.cleanOldCatalogUI();

      const catalogSection = document.getElementById('catalog');
      let root = document.getElementById('liveStoreApp');
      if (!root) {
        root = document.createElement('div');
        root.id = 'liveStoreApp';
        root.style.cssText = 'max-width:1200px; width:100%; margin:12px auto 40px; padding:0 14px; font-family:inherit; direction:rtl; text-align:right;';
      }

      if (catalogSection && root.parentNode !== catalogSection) {
        catalogSection.appendChild(root);
      } else if (!root.parentNode) {
        document.body.appendChild(root);
      }

      return root;
    }

    drawProducts() {
      const root = this.ensureRoot();
      let wrap = document.getElementById('liveProductsSection');
      if (!wrap) {
        wrap = document.createElement('div');
        wrap.id = 'liveProductsSection';
        wrap.style.cssText = 'direction:rtl; text-align:right;';
        wrap.innerHTML = `
          <h2 id="liveProductsTitle" style="margin:8px 0 14px; font-size:1.25rem; font-weight:900; color:#0f172a; text-align:right;">المنتجات المتوفرة</h2>
          <div id="liveProductsGrid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:16px; justify-content:start; align-items:stretch;"></div>
        `;
      }
      root.prepend(wrap);

      const list = this.getFilteredItems();
      const titleEl = document.getElementById('liveProductsTitle');
      if (titleEl) {
        const parts = ['المنتجات المتوفرة'];
        if (this.category !== 'all') parts.push(this.category);
        if (this.size) parts.push(`مقاس ${this.size}`);
        titleEl.textContent = `${parts.join(' - ')} (${list.length})`;
      }

      const grid = document.getElementById('liveProductsGrid');
      if (!list.length) {
        grid.innerHTML = `<div style="grid-column:1/-1; background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:20px; text-align:center; color:#475569; font-weight:700;">لا توجد منتجات مطابقة للفلاتر الحالية.</div>`;
        return;
      }

      grid.innerHTML = list.map(p => `
        <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:12px; display:flex; flex-direction:column; gap:8px; box-shadow:0 4px 14px rgba(15,23,42,0.05); text-align:right;">
          <img src="${p.img}" alt="${p.name}" style="width:100%; height:220px; object-fit:cover; border-radius:8px; background:#f8fafc;">
          <div style="font-size:0.78rem; color:#b45309; font-weight:800;">${p.cat}</div>
          <div style="font-size:1rem; font-weight:900; color:#0f172a;">${p.name}</div>
          <div style="font-size:0.86rem; color:#475569;">${p.desc}</div>
          <div style="font-size:1.05rem; font-weight:900; color:#0f172a;">${this.money(p.price)}</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:auto;">
            <button type="button" onclick="window.store.buyNow(${p.id})" style="padding:9px; border:none; border-radius:8px; background:#0f172a; color:#fff; font-weight:800; cursor:pointer;">اطلب الآن</button>
            <button type="button" onclick="window.store.add(${p.id})" style="padding:9px; border:1px solid #0f172a; border-radius:8px; background:#fff; color:#0f172a; font-weight:800; cursor:pointer;">أضف للسلة</button>
          </div>
        </div>
      `).join('');
    }

    drawCart() {
      const root = this.ensureRoot();
      this.drawProducts();

      let box = document.getElementById('liveCartBox');
      if (!box) {
        box = document.createElement('div');
        box.id = 'liveCartBox';
        box.style.cssText = 'background:#fff; border:1px solid #cbd5e1; border-radius:14px; padding:16px; margin-top:24px; box-shadow:0 6px 20px rgba(15,23,42,0.06); text-align:right;';
      }
      root.appendChild(box);

      const { count, sub, disc, ship, total } = this.calc();
      const rows = this.cart.length
        ? this.cart.map((x, idx) => `
            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; padding:8px 10px; background:#f8fafc; border-radius:8px; flex-wrap:wrap;">
              <div><strong>${x.name}</strong> — ${this.money(x.price)} × ${x.qty} = <strong>${this.money(x.price * x.qty)}</strong></div>
              <div style="display:flex; gap:6px; align-items:center;">
                <button type="button" onclick="window.store.qty(${idx}, -1)" style="width:28px; height:28px; cursor:pointer; font-weight:800;">-</button>
                <span style="font-weight:800;">${x.qty}</span>
                <button type="button" onclick="window.store.qty(${idx}, 1)" style="width:28px; height:28px; cursor:pointer; font-weight:800;">+</button>
                <button type="button" onclick="window.store.del(${idx})" style="background:#fee2e2; color:#b91c1c; border:none; border-radius:6px; padding:5px 9px; font-weight:700; cursor:pointer;">حذف</button>
              </div>
            </div>
          `).join('')
        : '<div style="color:#64748b; font-size:0.92rem;">السلة فارغة — اضغطي "أضف للسلة" أو "اطلب الآن" على أي منتج.</div>';

      box.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
          <div style="font-weight:900; font-size:1.05rem; color:#0f172a;">السلة (${count})</div>
          <div style="font-size:0.9rem;">
            الفرعي: <strong>${this.money(sub)}</strong>
            ${disc > 0 ? ` | الخصم: <strong style="color:#15803d;">-${this.money(disc)}</strong>` : ''}
            | التوصيل: <strong>${ship === 0 ? 'مجاني' : this.money(ship)}</strong>
            | الإجمالي: <strong>${this.money(total)}</strong>
          </div>
        </div>
        <div style="display:grid; gap:6px; margin-bottom:12px;">${rows}</div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <input type="text" id="livePromoInput" value="${this.promo ? this.promo.code : ''}" placeholder="كود الخصم (مثال: ELEGANCE20)" style="flex:1; min-width:180px; padding:8px 10px; border:1px solid #cbd5e1; border-radius:8px;">
          <button type="button" onclick="window.store.applyCode(document.getElementById('livePromoInput').value)" style="padding:8px 14px; border:none; border-radius:8px; background:#334155; color:#fff; font-weight:800; cursor:pointer;">تطبيق الكود</button>
          <button type="button" onclick="window.store.openPay()" style="padding:9px 18px; border:none; border-radius:8px; background:#0f172a; color:#fff; font-weight:800; cursor:pointer;">إتمام الدفع</button>
        </div>
      `;
    }

    openPay() {
      if (!this.cart.length) {
        alert('السلة فارغة! أضيفي منتجاً أولاً.');
        return;
      }

      let modal = document.getElementById('livePayModal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'livePayModal';
        modal.style.cssText = 'position:fixed; inset:0; background:rgba(15,23,42,0.65); display:flex; align-items:center; justify-content:center; padding:14px; z-index:999999; direction:rtl;';
        document.body.appendChild(modal);
      }

      const { sub, disc, ship, total } = this.calc();
      const summary = this.cart.map(x => `<div style="display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px dashed #e2e8f0; font-size:0.88rem;"><span>${x.name} × ${x.qty}</span><strong>${this.money(x.price * x.qty)}</strong></div>`).join('');

      modal.innerHTML = `
        <div id="livePayCard" style="background:#fff; width:100%; max-width:480px; border-radius:14px; padding:20px; position:relative; max-height:92vh; overflow-y:auto;">
          <button type="button" onclick="document.getElementById('livePayModal').style.display='none'" style="position:absolute; top:12px; left:12px; border:none; background:#f1f5f9; width:32px; height:32px; border-radius:50%; font-weight:800; cursor:pointer;">✕</button>
          <h2 style="margin:0 0 10px; font-size:1.2rem; color:#0f172a;">معلومات الدفع والتوصيل</h2>

          <div style="background:#f8fafc; padding:10px; border-radius:10px; margin-bottom:12px;">
            ${summary}
            <div style="margin-top:8px; font-size:0.88rem;">
              <div>المجموع الفرعي: <strong>${this.money(sub)}</strong></div>
              ${disc > 0 ? `<div style="color:#15803d;">الخصم: <strong>-${this.money(disc)}</strong></div>` : ''}
              <div>التوصيل: <strong>${ship === 0 ? 'مجاني' : this.money(ship)}</strong></div>
              <div style="font-size:1rem; margin-top:4px;">المجموع النهائي: <strong>${this.money(total)}</strong></div>
            </div>
          </div>

          <form id="livePayForm" style="display:grid; gap:10px;">
            <input type="text" id="payName" required placeholder="الاسم" style="padding:9px 12px; border:1px solid #cbd5e1; border-radius:8px;">
            <input type="tel" id="payPhone" required placeholder="رقم التليفون" style="padding:9px 12px; border:1px solid #cbd5e1; border-radius:8px;">
            <input type="text" id="payAddress" required placeholder="العنوان" style="padding:9px 12px; border:1px solid #cbd5e1; border-radius:8px;">

            <div>
              <div style="font-weight:800; font-size:0.88rem; margin-bottom:6px;">طريقة الدفع:</div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <button type="button" id="mCash" onclick="window.store.setMethod('كاش')" style="padding:9px; border-radius:8px; border:2px solid ${this.method === 'كاش' ? '#0f172a' : '#cbd5e1'}; background:${this.method === 'كاش' ? '#f1f5f9' : '#fff'}; font-weight:800; cursor:pointer;">كاش</button>
                <button type="button" id="mVisa" onclick="window.store.setMethod('فيزا')" style="padding:9px; border-radius:8px; border:2px solid ${this.method === 'فيزا' ? '#0f172a' : '#cbd5e1'}; background:${this.method === 'فيزا' ? '#f1f5f9' : '#fff'}; font-weight:800; cursor:pointer;">فيزا</button>
              </div>
            </div>

            <div id="visaBox" style="display:${this.method === 'فيزا' ? 'grid' : 'none'}; gap:8px; background:#f8fafc; padding:10px; border-radius:8px;">
              <input type="text" id="vNum" placeholder="رقم بطاقة الفيزا" style="padding:8px 10px; border:1px solid #cbd5e1; border-radius:8px;">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <input type="text" id="vExp" placeholder="MM/YY" style="padding:8px 10px; border:1px solid #cbd5e1; border-radius:8px;">
                <input type="password" id="vCvv" placeholder="CVV" style="padding:8px 10px; border:1px solid #cbd5e1; border-radius:8px;">
              </div>
            </div>

            <button type="submit" style="padding:11px; border:none; border-radius:8px; background:#0f172a; color:#fff; font-weight:800; font-size:1rem; cursor:pointer;">تأكيد الدفع</button>
          </form>
        </div>
      `;

      modal.style.display = 'flex';

      document.getElementById('livePayForm').onsubmit = e => {
        e.preventDefault();
        const name = document.getElementById('payName').value.trim();
        const phone = document.getElementById('payPhone').value.trim();
        const address = document.getElementById('payAddress').value.trim();
        if (!name || !phone || !address) return;

        if (this.method === 'فيزا') {
          const vNum = (document.getElementById('vNum').value || '').replace(/\s+/g, '');
          if (vNum.length < 10) {
            alert('أدخلي رقم بطاقة الفيزا أولاً');
            return;
          }
        }

        const paid = this.calc().total;
        this.cart = [];
        this.promo = null;
        this.save();
        this.drawCart();

        document.getElementById('livePayCard').innerHTML = `
          <div style="text-align:center; padding:10px;">
            <h2 style="margin:0 0 8px; color:#15803d;">تم تأكيد الدفع بنجاح ✓</h2>
            <p style="margin:0 0 6px;"><strong>الاسم:</strong> ${name}</p>
            <p style="margin:0 0 6px;"><strong>رقم التليفون:</strong> ${phone}</p>
            <p style="margin:0 0 6px;"><strong>العنوان:</strong> ${address}</p>
            <p style="margin:0 0 6px;"><strong>طريقة الدفع:</strong> ${this.method}</p>
            <p style="margin:0 0 14px;"><strong>المبلغ:</strong> ${this.money(paid)}</p>
            <button type="button" onclick="document.getElementById('livePayModal').style.display='none'" style="width:100%; padding:10px; border:none; border-radius:8px; background:#0f172a; color:#fff; font-weight:800; cursor:pointer;">إغلاق</button>
          </div>
        `;
      };
    }

    setMethod(m) {
      this.method = m;
      const c = document.getElementById('mCash');
      const v = document.getElementById('mVisa');
      const vb = document.getElementById('visaBox');
      if (c && v) {
        c.style.border = `2px solid ${m === 'كاش' ? '#0f172a' : '#cbd5e1'}`;
        c.style.background = m === 'كاش' ? '#f1f5f9' : '#fff';
        v.style.border = `2px solid ${m === 'فيزا' ? '#0f172a' : '#cbd5e1'}`;
        v.style.background = m === 'فيزا' ? '#f1f5f9' : '#fff';
      }
      if (vb) vb.style.display = m === 'فيزا' ? 'grid' : 'none';
    }

    start() {
      this.bindFiltersOnce();
      this.drawProducts();
      this.drawCart();
      setTimeout(() => {
        this.bindFiltersOnce();
        this.ensureRoot();
        this.drawProducts();
        this.drawCart();
      }, 250);
    }
  }

  const store = new Store();
  window.store = store;
  window.app = store;
  window.luxuryApp = store;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => store.start());
  } else {
    store.start();
  }
})();
