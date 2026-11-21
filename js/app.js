/**
 * متجر إليجانس للأزياء الرجالية الفاخرة - Application Core (الأردن - د.أ)
 */

(function () {
  const CURRENCY = 'د.أ';
  const FREE_SHIPPING_THRESHOLD = 50.00;
  const SHIPPING_FEE = 5.00;

  const PROMO_CODES = {
    ELEGANCE20: 0.20,
    ELEGANCE10: 0.10,
    WELCOME15: 0.15
  };

  const FALLBACK_PRODUCTS = [
    {
      id: 1,
      name: 'بدلة توكسيدو ملكية سوداء فاخرة',
      slug: 'royal-black-tuxedo-suit',
      category_slug: 'suits',
      category_name: 'بدلات رسمية',
      description: 'بدلة توكسيدو مصممة خصيصاً للمناسبات والاحتفالات الكبرى من صوف الميرينو الفاخر.',
      price: 240.00,
      original_price: 295.00,
      sizes: ['48 (S)', '50 (M)', '52 (L)', '54 (XL)', '56 (XXL)'],
      images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'],
      is_featured: true,
      is_bestseller: true,
      reviews_count: 38
    },
    {
      id: 2,
      name: 'بدلة كلاسيكية زرقاء كحلية من الصوف الخالص',
      slug: 'navy-blue-classic-wool-suit',
      category_slug: 'suits',
      category_name: 'بدلات رسمية',
      description: 'بدلة عمل رسمية بلون كحلي داكن ملكي تجمع بين الراحة والأناقة.',
      price: 185.00,
      original_price: 225.00,
      sizes: ['48 (S)', '50 (M)', '52 (L)', '54 (XL)'],
      images: ['https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80'],
      is_featured: true,
      is_bestseller: true,
      reviews_count: 24
    },
    {
      id: 3,
      name: 'بدلة رمادية عصرية ذات نقوش مربعات ناعمة',
      slug: 'grey-plaid-tailored-suit',
      category_slug: 'suits',
      category_name: 'بدلات رسمية',
      description: 'تصميم أوروبي عصري بنقشة مربعات دقيقة للمناسبات والاجتماعات.',
      price: 195.00,
      original_price: 240.00,
      sizes: ['50 (M)', '52 (L)', '54 (XL)'],
      images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'],
      is_featured: false,
      is_bestseller: false,
      reviews_count: 15
    },
    {
      id: 4,
      name: 'قميص أبيض ناصع من القطن المصري الفاخر',
      slug: 'egyptian-cotton-white-shirt',
      category_slug: 'shirts',
      category_name: 'قمصان فاخرة',
      description: 'قميص أبيض كلاسيكي من قطن جيزة المصري طويل التيلة.',
      price: 42.00,
      original_price: 55.00,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'],
      is_featured: true,
      is_bestseller: true,
      reviews_count: 72
    },
    {
      id: 5,
      name: 'قميص أكسفورد أزرق سماوي كاجوال وأنيق',
      slug: 'oxford-sky-blue-shirt',
      category_slug: 'shirts',
      category_name: 'قمصان فاخرة',
      description: 'قميص أكسفورد منسوج بعناية للعمل والخروجات اليومية.',
      price: 38.00,
      original_price: 48.00,
      sizes: ['S', 'M', 'L', 'XL'],
      images: ['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80'],
      is_featured: true,
      is_bestseller: false,
      reviews_count: 41
    },
    {
      id: 6,
      name: 'قميص كتان طبيعي بيج للصيف والإجازات',
      slug: 'pure-linen-beige-summer-shirt',
      category_slug: 'shirts',
      category_name: 'قمصان فاخرة',
      description: 'قميص صيفي من الكتان النقي خفيف ومريح.',
      price: 45.00,
      original_price: null,
      sizes: ['M', 'L', 'XL'],
      images: ['https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=800&q=80'],
      is_featured: false,
      is_bestseller: true,
      reviews_count: 19
    },
    {
      id: 7,
      name: 'بنطال تشينو كلاسيكي كحلي بقصة مدببة',
      slug: 'classic-navy-slim-chino',
      category_slug: 'pants',
      category_name: 'بناطيل رجالية',
      description: 'بنطال تشينو قطني مريح لإطلالة عصرية أنيقة.',
      price: 44.00,
      original_price: 55.00,
      sizes: ['30', '32', '34', '36', '38'],
      images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80'],
      is_featured: true,
      is_bestseller: true,
      reviews_count: 53
    },
    {
      id: 8,
      name: 'بنطال رسمي صوف خفيف رمادي فحمي',
      slug: 'charcoal-tailored-trousers-side-adjusters',
      category_slug: 'pants',
      category_name: 'بناطيل رجالية',
      description: 'بنطال رسمي إيطالي الطراز بحزام تعديل جانبي.',
      price: 65.00,
      original_price: 80.00,
      sizes: ['31', '32', '34', '36'],
      images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80'],
      is_featured: false,
      is_bestseller: true,
      reviews_count: 31
    },
    {
      id: 9,
      name: 'ساعة كلاسيكية رجالية بسوار جلد أسود',
      slug: 'swiss-classic-leather-watch',
      category_slug: 'accessories',
      category_name: 'إكسسوارات وأحذية',
      description: 'ساعة رجالية كلاسيكية أنيقة بلمسة فخامة عالية.',
      price: 150.00,
      original_price: 195.00,
      sizes: ['قطر 40 ملم'],
      images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80'],
      is_featured: true,
      is_bestseller: true,
      reviews_count: 48
    },
    {
      id: 10,
      name: 'حزام جلد طبيعي إيطالي بوجهين',
      slug: 'reversible-italian-leather-belt',
      category_slug: 'accessories',
      category_name: 'إكسسوارات وأحذية',
      description: 'حزام جلد طبيعي بوجهين أسود وبني داكن.',
      price: 35.00,
      original_price: 45.00,
      sizes: ['90 سم', '95 سم', '100 سم', '105 سم'],
      images: ['https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80'],
      is_featured: false,
      is_bestseller: true,
      reviews_count: 64
    },
    {
      id: 11,
      name: 'ساعة كرونوغراف رجالية فاخرة',
      slug: 'mens-chronograph-luxury-watch',
      category_slug: 'accessories',
      category_name: 'إكسسوارات وأحذية',
      description: 'إكسسوار رجالي أنيق يكمّل إطلالتك اليومية والرسمية.',
      price: 120.00,
      original_price: 150.00,
      sizes: ['مقاس موحد'],
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'],
      is_featured: true,
      is_bestseller: false,
      reviews_count: 27
    }
  ];

  function normalizeCategory(cat) {
    const v = String(cat || 'all').trim().toLowerCase();
    if (!v || v === 'all' || v.includes('كافة') || v.includes('التشكيلة الكاملة')) return 'all';
    if (v.includes('suit') || v.includes('بدل')) return 'suits';
    if (v.includes('shirt') || v.includes('قميص') || v.includes('قمصان')) return 'shirts';
    if (v.includes('pant') || v.includes('بنطال') || v.includes('بناطيل')) return 'pants';
    if (v.includes('accessor') || v.includes('إكسسوار') || v.includes('اكسسوار') || v.includes('ساع')) return 'accessories';
    return v;
  }

  class LuxuryApp {
    constructor() {
      this.currency = CURRENCY;
      this.freeShippingThreshold = FREE_SHIPPING_THRESHOLD;
      this.shippingFee = SHIPPING_FEE;
      this.cart = [];
      this.wishlist = [];
      this.appliedPromo = null;
      this.currentFilter = {
        category: 'all',
        search: '',
        minPrice: 0,
        maxPrice: 500,
        sort: 'popular',
        size: null
      };
    }

    showToast(message, isError = false) {
      let toast = document.getElementById('eleganceToast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'eleganceToast';
        toast.style.cssText = [
          'position:fixed',
          'bottom:20px',
          'left:20px',
          'z-index:200000',
          'padding:12px 18px',
          'border-radius:10px',
          'color:#fff',
          'font-weight:700',
          'font-size:0.9rem',
          'box-shadow:0 10px 25px rgba(0,0,0,0.3)',
          'transition:opacity 0.25s ease',
          'opacity:0',
          'pointer-events:none',
          'max-width:90vw'
        ].join(';');
        document.body.appendChild(toast);
      }
      toast.style.background = isError ? '#dc2626' : '#0f172a';
      toast.textContent = String(message || '');
      toast.style.opacity = '1';
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => {
        toast.style.opacity = '0';
      }, 2800);
    }

    getProductsList() {
      if (window.productsStore && typeof window.productsStore.getAll === 'function') {
        const list = window.productsStore.getAll();
        if (Array.isArray(list) && list.length > 0) return list;
      }
      return FALLBACK_PRODUCTS;
    }

    getFilteredProducts() {
      const state = this.currentFilter || {};
      const cat = normalizeCategory(state.category || 'all');
      const search = String(state.search || '').trim().toLowerCase();
      const minP = Number(state.minPrice) || 0;
      const maxP = Number(state.maxPrice) || Infinity;
      const sort = state.sort || 'popular';
      const size = state.size || null;

      let list = [...this.getProductsList()];

      if (cat !== 'all') {
        list = list.filter(p => normalizeCategory(p.category_slug || p.category_name) === cat);
      }

      if (search) {
        list = list.filter(p =>
          String(p.name || '').toLowerCase().includes(search) ||
          String(p.description || '').toLowerCase().includes(search) ||
          String(p.category_name || '').toLowerCase().includes(search)
        );
      }

      list = list.filter(p => {
        const pr = Number(p.price) || 0;
        return pr >= minP && pr <= maxP;
      });

      if (size) {
        list = list.filter(p => Array.isArray(p.sizes) && p.sizes.includes(size));
      }

      if (sort === 'price_asc') list.sort((a, b) => Number(a.price) - Number(b.price));
      else if (sort === 'price_desc') list.sort((a, b) => Number(b.price) - Number(a.price));
      else if (sort === 'newest') list.sort((a, b) => Number(b.id) - Number(a.id));
      else list.sort((a, b) => (Number(b.reviews_count) || 0) - (Number(a.reviews_count) || 0));

      return list;
    }

    formatPrice(val) {
      const n = Number(val);
      return `${(Number.isFinite(n) ? n : 0).toFixed(2)} ${this.currency}`;
    }

    setCategory(category) {
      this.currentFilter.category = normalizeCategory(category);
      this.syncActiveButtons();
      this.renderCatalog();
    }

    setSearch(q) {
      this.currentFilter.search = String(q || '');
      this.renderCatalog();
    }

    setMaxPrice(val) {
      const n = Number(val);
      this.currentFilter.maxPrice = Number.isFinite(n) && n >= 0 ? n : 500;
      const lbl = document.getElementById('maxPriceValue') || document.getElementById('priceRangeVal');
      if (lbl) lbl.textContent = `حتى ${Math.round(this.currentFilter.maxPrice)} ${this.currency}`;
      this.renderCatalog();
    }

    setSort(val) {
      this.currentFilter.sort = val || 'popular';
      this.renderCatalog();
    }

    resetFilters() {
      this.currentFilter = {
        category: 'all',
        search: '',
        minPrice: 0,
        maxPrice: 500,
        sort: 'popular',
        size: null
      };
      this.syncActiveButtons();
      this.renderCatalog();
    }

    syncActiveButtons() {
      const active = this.currentFilter.category;
      document.querySelectorAll('[data-category], [data-cat], .catalog-tab-btn, .filter-item').forEach(el => {
        const raw = el.getAttribute('data-category') || el.getAttribute('data-cat') || el.textContent || '';
        el.classList.toggle('active', normalizeCategory(raw) === active);
      });
    }

    loadStorage() {
      try {
        const c = JSON.parse(localStorage.getItem('elegance_cart') || '[]');
        if (Array.isArray(c)) this.cart = c;
      } catch (_) {}
      try {
        const w = JSON.parse(localStorage.getItem('elegance_wishlist') || '[]');
        if (Array.isArray(w)) this.wishlist = w;
      } catch (_) {}
      try {
        const promo = JSON.parse(localStorage.getItem('elegance_promo') || 'null');
        if (promo && promo.code && promo.rate) this.appliedPromo = promo;
      } catch (_) {}
    }

    saveStorage() {
      try {
        localStorage.setItem('elegance_cart', JSON.stringify(this.cart));
        localStorage.setItem('elegance_wishlist', JSON.stringify(this.wishlist));
        localStorage.setItem('elegance_promo', JSON.stringify(this.appliedPromo));
      } catch (_) {}
    }

    quickAdd(productId) {
      const product = this.getProductsList().find(p => Number(p.id) === Number(productId));
      if (!product) return;
      const existing = this.cart.find(i => Number(i.id) === Number(product.id));
      if (existing) {
        existing.quantity = (Number(existing.quantity) || 1) + 1;
      } else {
        this.cart.push({
          id: product.id,
          name: product.name,
          price: Number(product.price) || 0,
          image: Array.isArray(product.images) ? product.images[0] : '',
          quantity: 1
        });
      }
      this.saveStorage();
      this.updateCartUI();
      this.showToast(`تمت إضافة "${product.name}" إلى السلة`);
    }

    changeCartQty(index, delta) {
      const item = this.cart[index];
      if (!item) return;
      const nextQty = (Number(item.quantity) || 1) + Number(delta);
      if (nextQty <= 0) {
        this.cart.splice(index, 1);
      } else {
        item.quantity = nextQty;
      }
      this.saveStorage();
      this.updateCartUI();
      this.renderGuaranteedCartModal();
    }

    removeCartItem(index) {
      if (index < 0 || index >= this.cart.length) return;
      this.cart.splice(index, 1);
      this.saveStorage();
      this.updateCartUI();
      this.renderGuaranteedCartModal();
      this.showToast('تم حذف المنتج من السلة');
    }

    applyPromoCode(rawCode) {
      const code = String(rawCode || '').trim().toUpperCase();
      if (!code) {
        this.showToast('اكتبي كود الخصم أولاً مثل ELEGANCE20', true);
        return;
      }
      if (!Object.prototype.hasOwnProperty.call(PROMO_CODES, code)) {
        this.showToast('كود الخصم غير صحيح. جرّبي: ELEGANCE20', true);
        return;
      }
      this.appliedPromo = {
        code,
        rate: PROMO_CODES[code]
      };
      this.saveStorage();
      this.updateCartUI();
      this.renderGuaranteedCartModal();
      this.showToast(`تم تطبيق الخصم (${code}) بنجاح!`);
    }

    getCartTotals() {
      const count = this.cart.reduce((s, i) => s + (Number(i.quantity) || 1), 0);
      const subtotal = this.cart.reduce((s, i) => s + (Number(i.price) || 0) * (Number(i.quantity) || 1), 0);
      const discountRate = this.appliedPromo ? Number(this.appliedPromo.rate) || 0 : 0;
      const discount = subtotal * discountRate;
      const afterDiscount = Math.max(0, subtotal - discount);
      const shipping = subtotal === 0 || afterDiscount >= this.freeShippingThreshold ? 0 : this.shippingFee;
      const total = afterDiscount + shipping;
      return { count, subtotal, discount, shipping, total };
    }

    updateCartUI() {
      const { count, subtotal, discount, shipping, total } = this.getCartTotals();

      document.querySelectorAll('.cart-count, #cartCount, .cart-badge-count').forEach(el => {
        el.textContent = String(count);
        el.style.display = count > 0 ? 'inline-flex' : 'none';
      });

      const subEl = document.getElementById('cartSubtotal') || document.getElementById('drawerSubtotal');
      if (subEl) subEl.textContent = this.formatPrice(subtotal);

      const discRow = document.getElementById('drawerDiscountRow') || document.getElementById('discountRow');
      const discEl = document.getElementById('drawerDiscount') || document.getElementById('cartDiscount');
      if (discRow && discEl) {
        if (discount > 0 && this.appliedPromo) {
          discRow.style.display = '';
          discEl.textContent = `- ${this.formatPrice(discount)} (${this.appliedPromo.code})`;
        } else {
          discRow.style.display = 'none';
        }
      }

      const shipEl = document.getElementById('cartShipping') || document.getElementById('drawerShipping');
      if (shipEl) {
        shipEl.textContent = subtotal === 0 ? 'مجاني للطلبات فوق 50 د.أ' : (shipping === 0 ? 'مجاني' : this.formatPrice(shipping));
      }

      const totEl = document.getElementById('cartTotal') || document.getElementById('drawerTotal');
      if (totEl) totEl.textContent = this.formatPrice(total);
    }

    getOrCreateOverlay() {
      let overlay = document.getElementById('guaranteedShopOverlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'guaranteedShopOverlay';
        overlay.style.cssText = [
          'position:fixed',
          'inset:0',
          'background:rgba(15,23,42,0.72)',
          'z-index:150000',
          'display:none',
          'align-items:center',
          'justify-content:center',
          'padding:14px',
          'overflow-y:auto'
        ].join(';');
        document.body.appendChild(overlay);
        overlay.addEventListener('click', e => {
          if (e.target === overlay) this.closeShopOverlay();
        });
      }
      return overlay;
    }

    closeShopOverlay() {
      const overlay = document.getElementById('guaranteedShopOverlay');
      if (overlay) overlay.style.display = 'none';
    }

    openCartDrawer() {
      this.renderGuaranteedCartModal();
      const overlay = this.getOrCreateOverlay();
      overlay.style.display = 'flex';
    }

    renderGuaranteedCartModal() {
      const overlay = this.getOrCreateOverlay();
      const { subtotal, discount, shipping, total } = this.getCartTotals();
      const promoVal = this.appliedPromo ? this.appliedPromo.code : '';

      const itemsHtml = !this.cart.length
        ? `<div style="text-align:center; padding:28px 12px; color:#64748b; background:#f8fafc; border-radius:12px; border:1px solid #e2e8f0;">
             <div style="font-size:1.05rem; font-weight:800; color:#0f172a; margin-bottom:6px;">سلتك فارغة حالياً</div>
             <div style="font-size:0.88rem;">اضغطي على "إضافة إلى السلة" لأي منتج لتشاهدي هنا وتتممي الشراء.</div>
           </div>`
        : this.cart.map((item, idx) => {
            const qty = Number(item.quantity) || 1;
            const unitPrice = Number(item.price) || 0;
            return `
              <div style="display:flex; gap:12px; align-items:center; padding:10px; border:1px solid #e2e8f0; border-radius:12px; background:#fff; margin-bottom:10px;">
                <img src="${item.image || ''}" alt="${item.name}" style="width:62px; height:74px; object-fit:cover; border-radius:8px; flex-shrink:0; background:#f1f5f9;" />
                <div style="flex:1; min-width:0;">
                  <div style="font-weight:800; font-size:0.92rem; color:#0f172a; margin-bottom:4px;">${item.name}</div>
                  <div style="font-size:0.84rem; color:#475569; margin-bottom:8px;">
                    ${this.formatPrice(unitPrice)} × ${qty} = <strong style="color:#0f172a;">${this.formatPrice(unitPrice * qty)}</strong>
                  </div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <button type="button" id="qtyMinus_${idx}" style="width:28px; height:28px; border:1px solid #cbd5e1; border-radius:6px; background:#f8fafc; font-weight:800; cursor:pointer;">-</button>
                    <span style="font-weight:800; min-width:20px; text-align:center;">${qty}</span>
                    <button type="button" id="qtyPlus_${idx}" style="width:28px; height:28px; border:1px solid #cbd5e1; border-radius:6px; background:#f8fafc; font-weight:800; cursor:pointer;">+</button>
                    <button type="button" id="qtyDel_${idx}" style="margin-right:auto; border:none; background:#fee2e2; color:#b91c1c; padding:5px 10px; border-radius:6px; font-size:0.8rem; font-weight:700; cursor:pointer;">حذف</button>
                  </div>
                </div>
              </div>
            `;
          }).join('');

      overlay.innerHTML = `
        <div style="background:#fff; width:100%; max-width:520px; max-height:92vh; overflow-y:auto; border-radius:16px; padding:22px; box-shadow:0 24px 60px rgba(0,0,0,0.35); position:relative; direction:rtl; text-align:right;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; padding-bottom:10px; border-bottom:1px solid #e2e8f0;">
            <h2 style="margin:0; font-size:1.25rem; font-weight:900; color:#0f172a;">محتويات السلة والخصم</h2>
            <button type="button" id="closeShopModalBtn" style="width:34px; height:34px; border-radius:50%; border:1px solid #e2e8f0; background:#f8fafc; font-size:1rem; font-weight:800; cursor:pointer;">✕</button>
          </div>

          <div style="margin-bottom:14px;">${itemsHtml}</div>

          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin-bottom:14px;">
            <label style="display:block; font-weight:800; font-size:0.86rem; color:#0f172a; margin-bottom:6px;">كود الخصم (جرّبي ELEGANCE20 أو WELCOME15 أو ELEGANCE10)</label>
            <div style="display:flex; gap:8px;">
              <input type="text" id="modalPromoInput" value="${promoVal}" placeholder="اكتبي كود الخصم هنا" style="flex:1; padding:9px 12px; border:1px solid #cbd5e1; border-radius:8px; font-family:inherit; font-size:0.9rem;" />
              <button type="button" id="modalApplyPromoBtn" style="padding:9px 14px; border:none; border-radius:8px; background:#0f172a; color:#fff; font-weight:800; cursor:pointer;">تطبيق</button>
            </div>
          </div>

          <div style="border-top:1px solid #e2e8f0; padding-top:12px; font-size:0.92rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;"><span>المجموع الفرعي:</span><span>${this.formatPrice(subtotal)}</span></div>
            ${discount > 0 ? `<div style="display:flex; justify-content:space-between; margin-bottom:6px; color:#15803d; font-weight:800;"><span>الخصم (${this.appliedPromo.code}):</span><span>-${this.formatPrice(discount)}</span></div>` : ''}
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;"><span>التوصيل:</span><span>${subtotal === 0 ? 'مجاني فوق 50 د.أ' : (shipping === 0 ? 'مجاني' : this.formatPrice(shipping))}</span></div>
            <div style="display:flex; justify-content:space-between; padding-top:8px; border-top:1px solid #cbd5e1; font-weight:900; font-size:1.08rem; color:#0f172a;"><span>المجموع الكلي:</span><span>${this.formatPrice(total)}</span></div>
          </div>

          <button type="button" id="goToCheckoutStepBtn" style="margin-top:14px; width:100%; padding:12px; border:none; border-radius:10px; background:#0f172a; color:#fff; font-weight:900; font-size:1rem; cursor:pointer;">
            إتمام عملية الدفع
          </button>
        </div>
      `;

      overlay.querySelector('#closeShopModalBtn')?.addEventListener('click', () => this.closeShopOverlay());

      this.cart.forEach((_, idx) => {
        overlay.querySelector(`#qtyMinus_${idx}`)?.addEventListener('click', () => this.changeCartQty(idx, -1));
        overlay.querySelector(`#qtyPlus_${idx}`)?.addEventListener('click', () => this.changeCartQty(idx, 1));
        overlay.querySelector(`#qtyDel_${idx}`)?.addEventListener('click', () => this.removeCartItem(idx));
      });

      overlay.querySelector('#modalApplyPromoBtn')?.addEventListener('click', () => {
        const val = overlay.querySelector('#modalPromoInput')?.value || '';
        this.applyPromoCode(val);
      });

      overlay.querySelector('#goToCheckoutStepBtn')?.addEventListener('click', () => this.openCheckoutModal());
    }

    openCheckoutModal() {
      if (!this.cart.length) {
        this.showToast('السلة فارغة! أضيفي منتجاً أولاً لإتمام الدفع', true);
        return;
      }

      const overlay = this.getOrCreateOverlay();
      overlay.style.display = 'flex';
      const { subtotal, discount, shipping, total } = this.getCartTotals();

      const summaryRows = this.cart.map(item => {
        const qty = Number(item.quantity) || 1;
        return `
          <div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px dashed #e2e8f0; font-size:0.88rem;">
            <span><strong>${item.name}</strong> × ${qty}</span>
            <span style="font-weight:800;">${this.formatPrice((Number(item.price) || 0) * qty)}</span>
          </div>
        `;
      }).join('');

      overlay.innerHTML = `
        <div style="background:#fff; width:100%; max-width:520px; max-height:92vh; overflow-y:auto; border-radius:16px; padding:22px; box-shadow:0 24px 60px rgba(0,0,0,0.35); position:relative; direction:rtl; text-align:right;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding-bottom:10px; border-bottom:1px solid #e2e8f0;">
            <h2 style="margin:0; font-size:1.25rem; font-weight:900; color:#0f172a;">بيانات التوصيل وتأكيد الدفع</h2>
            <button type="button" id="backToCartFromCheckoutBtn" style="padding:6px 10px; border-radius:8px; border:1px solid #cbd5e1; background:#f8fafc; font-size:0.82rem; font-weight:700; cursor:pointer;">رجوع للسلة</button>
          </div>

          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin-bottom:14px;">
            <div style="font-weight:800; font-size:0.88rem; margin-bottom:6px;">ملخص الطلب:</div>
            ${summaryRows}
            <div style="margin-top:8px; font-size:0.88rem;">
              <div style="display:flex; justify-content:space-between;"><span>المجموع الفرعي:</span><span>${this.formatPrice(subtotal)}</span></div>
              ${discount > 0 ? `<div style="display:flex; justify-content:space-between; color:#15803d; font-weight:800;"><span>الخصم (${this.appliedPromo.code}):</span><span>-${this.formatPrice(discount)}</span></div>` : ''}
              <div style="display:flex; justify-content:space-between;"><span>التوصيل:</span><span>${shipping === 0 ? 'مجاني' : this.formatPrice(shipping)}</span></div>
              <div style="display:flex; justify-content:space-between; margin-top:6px; padding-top:6px; border-top:1px solid #cbd5e1; font-weight:900; font-size:1.05rem;"><span>المطلوب دفعه:</span><span>${this.formatPrice(total)}</span></div>
            </div>
          </div>

          <form id="finalPaymentForm" style="display:grid; gap:11px;">
            <div>
              <label style="display:block; font-weight:800; font-size:0.88rem; margin-bottom:4px;">الاسم *</label>
              <input type="text" id="payNameInput" required placeholder="اكتبي اسمك" style="width:100%; padding:9px 12px; border:1px solid #cbd5e1; border-radius:8px; font-family:inherit; box-sizing:border-box;" />
            </div>

            <div>
              <label style="display:block; font-weight:800; font-size:0.88rem; margin-bottom:4px;">رقم التليفون *</label>
              <input type="tel" id="payPhoneInput" required placeholder="07XXXXXXXX" style="width:100%; padding:9px 12px; border:1px solid #cbd5e1; border-radius:8px; font-family:inherit; box-sizing:border-box;" />
            </div>

            <div>
              <label style="display:block; font-weight:800; font-size:0.88rem; margin-bottom:4px;">المكان (المحافظة، المنطقة، الشارع أو أقرب علامة) *</label>
              <input type="text" id="payPlaceInput" required placeholder="مثال: عجلون / عمّان - الحي والشارع" style="width:100%; padding:9px 12px; border:1px solid #cbd5e1; border-radius:8px; font-family:inherit; box-sizing:border-box;" />
            </div>

            <div>
              <label style="display:block; font-weight:800; font-size:0.88rem; margin-bottom:4px;">طريقة الدفع</label>
              <select id="payMethodSelect" style="width:100%; padding:9px 12px; border:1px solid #cbd5e1; border-radius:8px; font-family:inherit; box-sizing:border-box;">
                <option value="الدفع عند الاستلام">الدفع عند الاستلام</option>
                <option value="بطاقة / دفع إلكتروني">بطاقة / دفع إلكتروني</option>
              </select>
            </div>

            <button type="submit" style="margin-top:6px; width:100%; padding:12px; border:none; border-radius:10px; background:#0f172a; color:#fff; font-weight:900; font-size:1rem; cursor:pointer;">
              تأكيد الدفع
            </button>
          </form>
        </div>
      `;

      overlay.querySelector('#backToCartFromCheckoutBtn')?.addEventListener('click', () => this.renderGuaranteedCartModal());

      overlay.querySelector('#finalPaymentForm')?.addEventListener('submit', e => {
        e.preventDefault();
        const name = (overlay.querySelector('#payNameInput')?.value || '').trim();
        const phone = (overlay.querySelector('#payPhoneInput')?.value || '').trim();
        const place = (overlay.querySelector('#payPlaceInput')?.value || '').trim();
        const method = overlay.querySelector('#payMethodSelect')?.value || 'الدفع عند الاستلام';

        if (!name || !phone || !place) {
          this.showToast('يرجى إدخال الاسم ورقم التليفون والمكان', true);
          return;
        }

        const paidTotals = this.getCartTotals();
        const orderCode = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

        this.cart = [];
        this.appliedPromo = null;
        this.saveStorage();
        this.updateCartUI();

        overlay.innerHTML = `
          <div style="background:#fff; width:100%; max-width:480px; border-radius:16px; padding:24px; box-shadow:0 24px 60px rgba(0,0,0,0.35); direction:rtl; text-align:center;">
            <div style="width:52px; height:52px; line-height:52px; border-radius:50%; background:#dcfce7; color:#15803d; font-size:1.5rem; font-weight:900; margin:0 auto 12px;">✓</div>
            <h2 style="margin:0 0 6px; font-size:1.3rem; font-weight:900; color:#0f172a;">تم تأكيد الدفع بنجاح</h2>
            <p style="margin:0 0 14px; color:#64748b; font-size:0.9rem;">رقم الطلب: <strong>${orderCode}</strong></p>

            <div style="text-align:right; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:14px; font-size:0.9rem; margin-bottom:16px;">
              <div style="margin-bottom:6px;"><strong>الاسم:</strong> ${name}</div>
              <div style="margin-bottom:6px;"><strong>رقم التليفون:</strong> <span dir="ltr">${phone}</span></div>
              <div style="margin-bottom:6px;"><strong>المكان:</strong> ${place}</div>
              <div style="margin-bottom:6px;"><strong>طريقة الدفع:</strong> ${method}</div>
              <div><strong>الإجمالي:</strong> <strong style="color:#0f172a;">${this.formatPrice(paidTotals.total)}</strong></div>
            </div>

            <button type="button" id="finishOrderBtn" style="width:100%; padding:11px; border:none; border-radius:10px; background:#0f172a; color:#fff; font-weight:900; cursor:pointer;">
              حسناً
            </button>
          </div>
        `;

        overlay.querySelector('#finishOrderBtn')?.addEventListener('click', () => this.closeShopOverlay());
      });
    }

    toggleWishlist(id) {
      const numId = Number(id);
      const idx = this.wishlist.indexOf(numId);
      if (idx > -1) this.wishlist.splice(idx, 1);
      else this.wishlist.push(numId);
      this.saveStorage();
      document.querySelectorAll('.wishlist-count, #wishlistCount, .wishlist-badge-count').
