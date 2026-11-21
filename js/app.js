(function () {
  const CURRENCY = 'د.أ';
  const SHIPPING_FEE = 5;
  const FREE_SHIPPING_MIN = 50;
  const CODES = { ELEGANCE20: 0.2, ELEGANCE10: 0.1, WELCOME15: 0.15 };

  const ITEMS = [
    { id: 1, name: 'بدلة توكسيدو ملكية سوداء فاخرة', cat: 'بدلات رسمية', price: 240, img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80', desc: 'بدلة توكسيدو فاخرة للمناسبات والاجتماعات الرسمية.' },
    { id: 2, name: 'بدلة كلاسيكية زرقاء كحلية', cat: 'بدلات رسمية', price: 185, img: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80', desc: 'بدلة كحلية أنيقة للعمل والمناسبات.' },
    { id: 3, name: 'قميص أبيض ناصع من القطن المصري', cat: 'قمصان فاخرة', price: 42, img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80', desc: 'قميص أبيض ناعم ومريح للدوام والمناسبات.' },
    { id: 4, name: 'قميص أكسفورد أزرق سماوي', cat: 'قمصان فاخرة', price: 38, img: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80', desc: 'قميص سماوي عملي وأنيق.' },
    { id: 5, name: 'بنطال تشينو كلاسيكي كحلي', cat: 'بناطيل رجالية', price: 44, img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80', desc: 'بنطال تشينو مريح بقصة عصرية.' },
    { id: 6, name: 'ساعة كلاسيكية رجالية جلد أسود', cat: 'إكسسوارات', price: 150, img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80', desc: 'ساعة رجالية أنيقة بسوار جلدي.' }
  ];

  class Store {
    constructor() {
      this.cart = [];
      this.promo = null;
      this.method = 'كاش';
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

    ensureRoot() {
      let root = document.getElementById('liveStoreApp');
      if (!root) {
        root = document.createElement('div');
        root.id = 'liveStoreApp';
        root.style.cssText = 'max-width:1200px; margin:24px auto 40px; padding:0 14px; font-family:inherit; direction:rtl;';
        document.body.appendChild(root);
      }
      return root;
    }

    drawProducts() {
      const root = this.ensureRoot();
      let grid = document.getElementById('liveProductsGrid');
      if (!grid) {
        const title = document.createElement('h2');
        title.textContent = 'المنتجات المتوفرة';
        title.style.cssText = 'margin:18px 0 12px; font-size:1.25rem; font-weight:900; color:#0f172a;';
        grid = document.createElement('div');
        grid.id = 'liveProductsGrid';
        grid.style.cssText = 'display:grid; grid-template-columns:repeat(auto-fill, minmax(250px, 1fr)); gap:16px;';
        root.appendChild(title);
        root.appendChild(grid);
      }

      grid.innerHTML = ITEMS.map(p => `
        <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:12px; display:flex; flex-direction:column; gap:8px; box-shadow:0 4px 14px rgba(15,23,42,0.05);">
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
      let box = document.getElementById('liveCartBox');
      if (!box) {
        box = document.createElement('div');
        box.id = 'liveCartBox';
        box.style.cssText = 'background:#fff; border:1px solid #cbd5e1; border-radius:14px; padding:16px; margin-bottom:18px; box-shadow:0 6px 20px rgba(15,23,42,0.06);';
        root.prepend(box);
      }

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
      this.drawCart();
      this.drawProducts();
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
