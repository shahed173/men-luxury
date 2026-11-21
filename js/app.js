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
      return `${(Number(n) \vert{}\vert{} 0).toFixed(2)}${CURRENCY}`;
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
        root.style.cssText = 'max-width:1200px; margin:20px auto; padding:0 14px; font-family:inherit; direction:rtl;';
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
            <button type="button" onclick="window.store.add(${p.id})" style="padding:9px; border
