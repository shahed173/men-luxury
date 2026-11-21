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
      this.paymentMethod = 'cash_on_delivery';
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
          'bottom:24px',
          'left:24px',
          'z-index:99999',
          'padding:12px 18px',
          'border-radius:10px',
          'color:#fff',
          'font-weight:700',
          'font-size:0.9rem',
          'box-shadow:0 10px 25px rgba(0,0,0,0.25)',
          'transition:opacity 0.25s ease,transform 0.25s ease',
          'opacity:0',
          'transform:translateY(10px)',
          'pointer-events:none',
          'max-width:90vw'
        ].join(';');
        document.body.appendChild(toast);
      }
      toast.style.background = isError ? '#dc2626' : '#0f172a';
      toast.textContent = String(message || '');
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
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
    }

    removeCartItem(index) {
      if (index < 0 || index >= this.cart.length) return;
      this.cart.splice(index, 1);
      this.saveStorage();
      this.updateCartUI();
      this.showToast('تم حذف المنتج من السلة');
    }

    applyPromoCode(rawCode) {
      const code = String(rawCode || '').trim().toUpperCase();
      const input = document.getElementById('couponCodeInput') || document.getElementById('promoCodeInput');
      if (!code) {
        this.showToast('يرجى إدخال كود الخصم أولاً', true);
        return;
      }
      if (!Object.prototype.hasOwnProperty.call(PROMO_CODES, code)) {
        this.showToast('كود الخصم غير صحيح (جرّبي ELEGANCE20)', true);
        return;
      }
      this.appliedPromo = {
        code,
        rate: PROMO_CODES[code]
      };
      if (input) input.value = code;
      this.saveStorage();
      this.updateCartUI();
      this.showToast(`تم تطبيق كود الخصم ${code} بنجاح!`);
    }

    getCartTotals() {
      const count = this.cart.reduce((s, i) => s + (Number(i.quantity) || 1), 0);
      const subtotal = this.cart.reduce((s, i) => s + (Number(i.price) || 0) * (Number(i.quantity) || 1), 0);
      const discountRate = this.appliedPromo ? Number(this.appliedPromo.rate) || 0 : 0;
      const discount = subtotal * discountRate;
      const discountedSubtotal = Math.max(0, subtotal - discount);
      const shipping = subtotal === 0 || discountedSubtotal >= this.freeShippingThreshold ? 0 : this.shippingFee;
      const total = discountedSubtotal + shipping;
      return { count, subtotal, discount, shipping, total };
    }

    renderCartItems() {
      const container = document.getElementById('drawerCartItems') || document.getElementById('cartItemsContainer');
      if (!container) return;

      if (!this.cart.length) {
        container.innerHTML = `
          <div style="text-align:center; padding:40px 16px; color:#64748b;">
            <i class="fa-solid fa-bag-shopping" style="font-size:2.4rem; margin-bottom:12px; opacity:0.45;"></i>
            <p style="font-weight:700; margin-bottom:6px;">السلة فارغة حالياً</p>
            <p style="font-size:0.86rem;">أضيفي المنتجات التي تعجبك لتظهر هنا وتتمكني من إتمام الطلب.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = this.cart.map((item, idx) => {
        const qty = Number(item.quantity) || 1;
        const unitPrice = Number(item.price) || 0;
        const lineTotal = unitPrice * qty;
        return `
          <div style="display:flex; gap:12px; align-items:center; padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff; margin-bottom:10px;">
            <img src="${item.image || ''}" alt="${item.name}" style="width:64px; height:76px; object-fit:cover; border-radius:8px; flex-shrink:0; background:#f8fafc;" />
            <div style="flex:1; min-width:0;">
              <div style="font-weight:800; font-size:0.92rem; color:#0f172a; margin-bottom:4px;">${item.name}</div>
              <div style="font-size:0.84rem; color:#64748b; margin-bottom:8px;">السعر: ${this.formatPrice(unitPrice)} × ${qty} = <strong style="color:#0f172a;">${this.formatPrice(lineTotal)}</strong></div>
              <div style="display:flex; align-items:center; gap:8px;">
                <button type="button" onclick="window.app.changeCartQty(${idx}, -1)" style="width:28px; height:28px; border:1px solid #cbd5e1; border-radius:6px; background:#f8fafc; font-weight:800; cursor:pointer;">-</button>
                <span style="font-weight:800; min-width:20px; text-align:center;">${qty}</span>
                <button type="button" onclick="window.app.changeCartQty(${idx}, 1)" style="width:28px; height:28px; border:1px solid #cbd5e1; border-radius:6px; background:#f8fafc; font-weight:800; cursor:pointer;">+</button>
                <button type="button" onclick="window.app.removeCartItem(${idx})" style="margin-right:auto; border:none; background:#fee2e2; color:#b91c1c; padding:5px 10px; border-radius:6px; font-size:0.8rem; font-weight:700; cursor:pointer;">
                  <i class="fa-regular fa-trash-can"></i> حذف
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    updateCartUI() {
      const { count, subtotal, discount, shipping, total } = this.getCartTotals();

      document.querySelectorAll('.cart-count, #cartCount, .cart-badge-count').forEach(el => {
        el.textContent = String(count);
        el.style.display = count > 0 ? '' : 'none';
      });

      this.renderCartItems();

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

    openCartDrawer() {
      this.updateCartUI();
      const drawer = document.getElementById('cartDrawer');
      const backdrop = document.getElementById('cartDrawerBackdrop');
      if (drawer) drawer.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
    }

    closeCartDrawer() {
      const drawer = document.getElementById('cartDrawer');
      const backdrop = document.getElementById('cartDrawerBackdrop');
      if (drawer) drawer.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
    }

    closeModal(modalId) {
      const el = document.getElementById(modalId);
      if (el) el.classList.remove('open');
    }

    ensureCheckoutModal() {
      let modal = document.getElementById('checkoutModal');
      if (modal) return modal;

      modal = document.createElement('div');
      modal.id = 'checkoutModal';
      modal.style.cssText = [
        'position:fixed',
        'inset:0',
        'background:rgba(15,23,42,0.65)',
        'display:flex',
        'align-items:center',
        'justify-content:center',
        'padding:16px',
        'z-index:9999'
      ].join(';');

      modal.innerHTML = `
        <div style="background:#fff; width:100%; max-width:540px; max-height:92vh; overflow-y:auto; border-radius:16px; padding:24px; box-shadow:0 24px 60px rgba(0,0,0,0.35); position:relative;">
          <button type="button" id="closeDynamicCheckoutBtn" aria-label="إغلاق" style="position:absolute; top:16px; left:16px; width:34px; height:34px; border-radius:50%; border:1px solid #e2e8f0; background:#f8fafc; font-size:1.1rem; cursor:pointer;">✕</button>
          <div id="checkoutContentArea"></div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
      });
      modal.querySelector('#closeDynamicCheckoutBtn')?.addEventListener('click', () => {
        modal.style.display = 'none';
      });
      return modal;
    }

    openCheckoutModal() {
      if (!this.cart.length) {
        this.showToast('السلة فارغة! أضيفي منتجاً أولاً لإتمام الدفع', true);
        return;
      }

      this.closeCartDrawer();
      const modal = this.ensureCheckoutModal();
      const area = modal.querySelector('#checkoutContentArea') || modal;
      const { subtotal, discount, shipping, total } = this.getCartTotals();
      const currentCode = this.appliedPromo ? this.appliedPromo.code : '';

      const itemsSummaryHtml = this.cart.map(item => {
        const qty = Number(item.quantity) || 1;
        const lineTotal = (Number(item.price) || 0) * qty;
        return `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px dashed #e2e8f0; font-size:0.88rem;">
            <span><strong>${item.name}</strong> × ${qty}</span>
            <span style="font-weight:800;">${this.formatPrice(lineTotal)}</span>
          </div>
        `;
      }).join('');

      area.innerHTML = `
        <h2 style="margin:0 0 6px; font-size:1.35rem; font-weight:900; color:#0f172a;">إتمام الطلب وتأكيد الدفع</h2>
        <p style="margin:0 0 16px; color:#64748b; font-size:0.88rem;">أدخلي العنوان ورقم التليفون وكود الخصم إن وُجد ثم أكّدي الدفع.</p>

        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px 14px; margin-bottom:16px;">
          <div style="font-weight:800; font-size:0.9rem; margin-bottom:6px; color:#0f172a;">المنتجات المختارة:</div>
          ${itemsSummaryHtml}
          <div style="display:flex; gap:8px; margin-top:12px;">
            <input type="text" id="checkoutPromoInput" value="${currentCode}" placeholder="كود الخصم (مثال: ELEGANCE20)" style="flex:1; padding:8px 12px; border:1px solid #cbd5e1; border-radius:8px; font-family:inherit; font-size:0.88rem;" />
            <button type="button" id="checkoutApplyPromoBtn" style="padding:8px 14px; border:none; border-radius:8px; background:#0f172a; color:#fff; font-weight:700; cursor:pointer;">تطبيق الخصم</button>
          </div>
          <div id="checkoutTotalsBox" style="margin-top:12px; font-size:0.9rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>المجموع الفرعي:</span><span>${this.formatPrice(subtotal)}</span></div>
            ${discount > 0 ? `<div style="display:flex; justify-content:space-between; margin-bottom:4px; color:#15803d; font-weight:700;"><span>الخصم (${this.appliedPromo.code}):</span><span>- ${this.formatPrice(discount)}</span></div>` : ''}
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;"><span>التوصيل:</span><span>${shipping === 0 ? 'مجاني' : this.formatPrice(shipping)}</span></div>
            <div style="display:flex; justify-content:space-between; padding-top:8px; border-top:1px solid #cbd5e1; font-weight:900; font-size:1.05rem; color:#0f172a;"><span>المجموع النهائي:</span><span>${this.formatPrice(total)}</span></div>
          </div>
        </div>

        <form id="directCheckoutForm" style="display:grid; gap:12px;">
          <div>
            <label style="display:block; font-weight:700; font-size:0.88rem; margin-bottom:4px;">الاسم الكامل *</label>
            <input type="text" id="orderFullName" required placeholder="مثال: شهد" style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:8px; font-family:inherit; box-sizing:border-box;" />
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div>
              <label style="display:block; font-weight:700; font-size:0.88rem; margin-bottom:4px;">رقم التليفون *</label>
              <input type="tel" id="orderPhone" required placeholder="07XXXXXXXX" style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:8px; font-family:inherit; box-sizing:border-box;" />
            </div>
            <div>
              <label style="display:block; font-weight:700; font-size:0.88rem; margin-bottom:4px;">المحافظة *</label>
              <select id="orderCity" style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:8px; font-family:inherit; box-sizing:border-box;">
                <option value="عجلون" selected>عجلون</option>
                <option value="عمّان">عمّان</option>
                <option value="إربد">إربد</option>
                <option value="الزرقاء">الزرقاء</option>
                <option value="جرش">جرش</option>
                <option value="البلقاء">البلقاء</option>
                <option value="مادبا">مادبا</option>
                <option value="العقبة">العقبة</option>
              </select>
            </div>
          </div>

          <div>
            <label style="display:block; font-weight:700; font-size:0.88rem; margin-bottom:4px;">المكان / العنوان التفصيلي *</label>
            <input type="text" id="orderAddress" required placeholder="الحي، الشارع، رقم البناء أو أقرب معلم" style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:8px; font-family:inherit; box-sizing:border-box;" />
          </div>

          <div>
            <label style="display:block; font-weight:700; font-size:0.88rem; margin-bottom:4px;">طريقة الدفع</label>
            <select id="orderPaymentMethod" style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:8px; font-family:inherit; box-sizing:border-box;">
              <option value="الدفع عند الاستلام" ${this.paymentMethod === 'الدفع عند الاستلام' ? 'selected' : ''}>الدفع عند الاستلام</option>
              <option value="بطاقة ائتمانية / إلكتروني" ${this.paymentMethod === 'بطاقة ائتمانية / إلكتروني' ? 'selected' : ''}>بطاقة ائتمانية / إلكتروني</option>
            </select>
          </div>

          <button type="submit" id="confirmOrderPaymentBtn" style="margin-top:6px; width:100%; padding:12px; border:none; border-radius:10px; background:#0f172a; color:#fff; font-weight:800; font-size:1rem; cursor:pointer;">
            تأكيد الدفع وإتمام الطلب
          </button>
        </form>
      `;

      modal.style.display = 'flex';
      modal.classList.add('open');

      modal.querySelector('#checkoutApplyPromoBtn')?.addEventListener('click', () => {
        const codeVal = modal.querySelector('#checkoutPromoInput')?.value || '';
        this.applyPromoCode(codeVal);
        this.openCheckoutModal();
      });

      modal.querySelector('#directCheckoutForm')?.addEventListener('submit', e => {
        e.preventDefault();
        const name = (modal.querySelector('#orderFullName')?.value || '').trim();
        const phone = (modal.querySelector('#orderPhone')?.value || '').trim();
        const city = (modal.querySelector('#orderCity')?.value || '').trim();
        const address = (modal.querySelector('#orderAddress')?.value || '').trim();
        const method = modal.querySelector('#orderPaymentMethod')?.value || 'الدفع عند الاستلام';

        if (!name || !phone || !address) {
          this.showToast('يرجى تعبئة الاسم ورقم التليفون والمكان', true);
          return;
        }

        const finalTotals = this.getCartTotals();
        const orderNumber = `ELG-${Math.floor(100000 + Math.random() * 900000)}`;

        this.cart = [];
        this.appliedPromo = null;
        this.saveStorage();
        this.updateCartUI();

        area.innerHTML = `
          <div style="text-align:center; padding:12px 6px;">
            <div style="width:54px; height:54px; line-height:54px; border-radius:50%; background:#dcfce7; color:#15803d; font-size:1.5rem; margin:0 auto 12px;">✓</div>
            <h2 style="margin:0 0 6px; font-size:1.35rem; font-weight:900; color:#0f172a;">تم تأكيد الدفع بنجاح</h2>
            <p style="margin:0 0 16px; color:#64748b; font-size:0.9rem;">رقم الطلب: <strong>${orderNumber}</strong></p>

            <div style="text-align:right; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:14px; font-size:0.9rem; margin-bottom:18px;">
              <div style="margin-bottom:6px;"><strong>الاسم:</strong> ${name}</div>
              <div style="margin-bottom:6px;"><strong>رقم التليفون:</strong> <span dir="ltr">${phone}</span></div>
              <div style="margin-bottom:6px;"><strong>المكان:</strong> ${city} — ${address}</div>
              <div style="margin-bottom:6px;"><strong>طريقة الدفع:</strong> ${method}</div>
              <div><strong>المبلغ المدفوع:</strong> <span style="font-weight:900; color:#0f172a;">${this.formatPrice(finalTotals.total)}</span></div>
            </div>

            <button type="button" id="doneCheckoutBtn" style="width:100%; padding:11px; border:none; border-radius:10px; background:#0f172a; color:#fff; font-weight:800; cursor:pointer;">
              العودة إلى المتجر
            </button>
          </div>
        `;

        modal.querySelector('#doneCheckoutBtn')?.addEventListener('click', () => {
          modal.style.display = 'none';
          modal.classList.remove('open');
        });
      });
    }

    toggleWishlist(id) {
      const numId = Number(id);
      const idx = this.wishlist.indexOf(numId);
      if (idx > -1) this.wishlist.splice(idx, 1);
      else this.wishlist.push(numId);
      this.saveStorage();
      document.querySelectorAll('.wishlist-count, #wishlistCount, .wishlist-badge-count').forEach(el => {
        el.textContent = String(this.wishlist.length);
      });
      this.renderCatalog();
      this.renderHomeFeatured();
    }

    cardHtml(product) {
      const price = Number(product.price) || 0;
      const oldPrice = product.original_price ? Number(product.original_price) : null;
      const hasDiscount = oldPrice !== null && oldPrice > price;
      const img = Array.isArray(product.images) && product.images.length ? product.images[0] : '';
      const wished = this.wishlist.includes(Number(product.id));

      return `
        <div class="product-card" data-id="${product.id}" data-category="${product.category_slug || ''}">
          <div class="product-image-wrap" style="height:260px; overflow:hidden; border-radius:10px; background:#f8fafc;">
            <img src="${img}" alt="${product.name}" loading="lazy" style="width:100%; height:100%; object-fit:cover; object-position:center; display:block;">
            <button type="button" class="btn-wishlist ${wished ? 'active' : ''}" onclick="window.app.toggleWishlist(${product.id})" aria-label="المفضلة">
              <i class="${wished ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
          </div>
          <div class="product-info">
            <span class="product-category">${product.category_name || ''}</span>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price-row">
              <span class="current-price">${this.formatPrice(price)}</span>
              ${hasDiscount ? `<span class="old-price">${this.formatPrice(oldPrice)}</span>` : ''}
            </div>
            <button type="button" class="btn-add-cart" onclick="window.app.quickAdd(${product.id})">
              <i class="fa-solid fa-cart-plus"></i> إضافة إلى السلة
            </button>
          </div>
        </div>
      `;
    }

    renderHomeFeatured() {
      const box = document.getElementById('homeFeaturedProducts');
      if (!box) return;
      const all = this.getProductsList();
      const items = all.filter(p => p.is_featured || p.is_bestseller);
      box.innerHTML = (items.length ? items.slice(0, 4) : all.slice(0, 4))
        .map(p => this.cardHtml(p))
        .join('');
    }

    renderCatalog() {
      const grid = document.getElementById('catalogProductsGrid');
      if (!grid) return;
      const list = this.getFilteredProducts();
      const countEl = document.getElementById('catalogResultsCount');
      if (countEl) countEl.textContent = `عرض ${list.length} منتج`;
      if (!list.length) {
        grid.innerHTML = '<p class="empty-catalog-msg">لا توجد منتجات مطابقة للفئة المختارة حالياً.</p>';
        return;
      }
      grid.innerHTML = list.map(p => this.cardHtml(p)).join('');
    }

    bindEvents() {
      const search = document.getElementById('catalogSearchInput') || document.getElementById('searchInput');
      if (search && !search.dataset.bound) {
        search.dataset.bound = '1';
        search.addEventListener('input', e => this.setSearch(e.target.value));
      }

      const range = document.getElementById('maxPriceRange') || document.getElementById('priceRangeSlider');
      if (range && !range.dataset.bound) {
        range.dataset.bound = '1';
        range.addEventListener('input', e => this.setMaxPrice(e.target.value));
      }

      const sort = document.getElementById('catalogSortSelect') || document.getElementById('sortSelect');
      if (sort && !sort.dataset.bound) {
        sort.dataset.bound = '1';
        sort.addEventListener('change', e => this.setSort(e.target.value));
      }

      const openCartBtn = document.getElementById('openCartBtn');
      if (openCartBtn && !openCartBtn.dataset.bound) {
        openCartBtn.dataset.bound = '1';
        openCartBtn.addEventListener('click', () => this.openCartDrawer());
      }

      const closeCartBtn = document.getElementById('closeCartDrawerBtn');
      if (closeCartBtn && !closeCartBtn.dataset.bound) {
        closeCartBtn.dataset.bound = '1';
        closeCartBtn.addEventListener('click', () => this.closeCartDrawer());
      }

      const backdrop = document.getElementById('cartDrawerBackdrop');
      if (backdrop && !backdrop.dataset.bound) {
        backdrop.dataset.bound = '1';
        backdrop.addEventListener('click', () => this.closeCartDrawer());
      }

      const applyCouponBtn = document.getElementById('applyCouponBtn');
      if (applyCouponBtn && !applyCouponBtn.dataset.bound) {
        applyCouponBtn.dataset.bound = '1';
        applyCouponBtn.addEventListener('click', () => {
          const input = document.getElementById('couponCodeInput');
          this.applyPromoCode(input ? input.value : '');
        });
      }

      const checkoutBtn = document.getElementById('checkoutBtnFromDrawer');
      if (checkoutBtn && !checkoutBtn.dataset.bound) {
        checkoutBtn.dataset.bound = '1';
        checkoutBtn.addEventListener('click', () => this.openCheckoutModal());
      }

      if (!document.body.dataset.catBound) {
        document.body.dataset.catBound = '1';
        document.addEventListener('click', e => {
          const btn = e.target.closest('[data-category], [data-cat], .catalog-tab-btn, .filter-item');
          if (!btn) return;
          const val = btn.getAttribute('data-category') || btn.getAttribute('data-cat') || btn.textContent;
          if (val) {
            e.preventDefault();
            this.setCategory(val);
            document.getElementById('catalogProductsGrid')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });
      }
    }

    async init() {
      this.loadStorage();
      if (this.appliedPromo && this.appliedPromo.code) {
        const input = document.getElementById('couponCodeInput');
        if (input) input.value = this.appliedPromo.code;
      }
      if (window.productsStore && typeof window.productsStore.init === 'function') {
        try {
          await window.productsStore.init();
        } catch (_) {}
      }
      if (window.__pendingCategory) {
        this.currentFilter.category = normalizeCategory(window.__pendingCategory);
        window.__pendingCategory = null;
      }
      this.bindEvents();
      this.syncActiveButtons();
      this.renderHomeFeatured();
      this.renderCatalog();
      this.updateCartUI();
    }
  }

  const instance = new LuxuryApp();
  window.app = instance;
  window.luxuryApp = instance;

  const start = () => instance.init();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
