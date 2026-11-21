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
      this.paymentMethod = 'كاش (الدفع عند الاستلام)';
      this.selectedSizeByProduct = {};
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
      return `${(Number.isFinite(n) ? n : 0).toFixed(2)} ${this.currency}`; }  setCategory(category) { this.currentFilter.category = normalizeCategory(category); this.syncActiveButtons(); this.renderCatalog(); }  setSearch(q) { this.currentFilter.search = String(q \vert{}\vert{} ''); this.renderCatalog(); }  setMaxPrice(val) { const n = Number(val); this.currentFilter.maxPrice = Number.isFinite(n) && n >= 0 ? n : 500; const lbl = document.getElementById('maxPriceValue') \vert{}\vert{} document.getElementById('priceRangeVal'); if (lbl) lbl.textContent = `حتى ${Math.round(this.currentFilter.maxPrice)} ${this.currency}`; this.renderCatalog(); }  setSort(val) { this.currentFilter.sort = val \vert{}\vert{} 'popular'; this.renderCatalog(); }  resetFilters() { this.currentFilter = { category: 'all', search: '', minPrice: 0, maxPrice: 500, sort: 'popular', size: null }; this.syncActiveButtons(); this.renderCatalog(); }  syncActiveButtons() { const active = this.currentFilter.category; document.querySelectorAll('[data-category], [data-cat], .catalog-tab-btn, .filter-item').forEach(el => { const raw = el.getAttribute('data-category') \vert{}\vert{} el.getAttribute('data-cat') \vert{}\vert{} el.textContent \vert{}\vert{} ''; el.classList.toggle('active', normalizeCategory(raw) === active); }); }  loadStorage() { try { const c = JSON.parse(localStorage.getItem('elegance_cart') \vert{}\vert{} '[]'); if (Array.isArray(c)) this.cart = c; } catch (_) {} try { const w = JSON.parse(localStorage.getItem('elegance_wishlist') \vert{}\vert{} '[]'); if (Array.isArray(w)) this.wishlist = w; } catch (_) {} try { const promo = JSON.parse(localStorage.getItem('elegance_promo') \vert{}\vert{} 'null'); if (promo && promo.code && promo.rate) this.appliedPromo = promo; } catch (_) {} }  saveStorage() { try { localStorage.setItem('elegance_cart', JSON.stringify(this.cart)); localStorage.setItem('elegance_wishlist', JSON.stringify(this.wishlist)); localStorage.setItem('elegance_promo', JSON.stringify(this.appliedPromo)); } catch (_) {} }  quickAdd(productId, selectedSize = null) { const product = this.getProductsList().find(p => Number(p.id) === Number(productId)); if (!product) return; const size = selectedSize \vert{}\vert{} this.selectedSizeByProduct[product.id] \vert{}\vert{} (Array.isArray(product.sizes) && product.sizes[0]) \vert{}\vert{} ''; const existing = this.cart.find(i => Number(i.id) === Number(product.id) && String(i.size \vert{}\vert{} '') === String(size)); if (existing) { existing.quantity = (Number(existing.quantity) \vert{}\vert{} 1) + 1; } else { this.cart.push({ id: product.id, name: product.name, size, price: Number(product.price) \vert{}\vert{} 0, image: Array.isArray(product.images) ? product.images[0] : '', quantity: 1 }); } this.saveStorage(); this.updateCartUI(); this.showToast(`تمت إضافة "${product.name}" إلى السلة`);
    }

    buyNowProduct(productId, selectedSize = null) {
      const product = this.getProductsList().find(p => Number(p.id) === Number(productId));
      if (!product) return;
      const size = selectedSize || this.selectedSizeByProduct[product.id] || (Array.isArray(product.sizes) && product.sizes[0]) || '';
      const existing = this.cart.find(i => Number(i.id) === Number(product.id) && String(i.size || '') === String(size));
      if (existing) {
        existing.quantity = (Number(existing.quantity) || 1) + 1;
      } else {
        this.cart.push({
          id: product.id,
          name: product.name,
          size,
          price: Number(product.price) || 0,
          image: Array.isArray(product.images) ? product.images[0] : '',
          quantity: 1
        });
      }
      this.saveStorage();
      this.updateCartUI();
      this.closeModal('quickViewModal');
      this.openCheckoutModal();
    }

    openProductDetails(productId) {
      const product = this.getProductsList().find(p => Number(p.id) === Number(productId));
      if (!product) return;

      let modal = document.getElementById('quickViewModal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'quickViewModal';
        document.body.appendChild(modal);
      }

      modal.style.cssText = [
        'position:fixed',
        'inset:0',
        'background:rgba(15,23,42,0.65)',
        'display:flex',
        'align-items:center',
        'justify-content:center',
        'padding:16px',
        'z-index:9998'
      ].join(';');

      const sizes = Array.isArray(product.sizes) && product.sizes.length ? product.sizes : ['مقاس موحد'];
      const chosenSize = this.selectedSizeByProduct[product.id] || sizes[0];
      this.selectedSizeByProduct[product.id] = chosenSize;
      const img = Array.isArray(product.images) && product.images.length ? product.images[0] : '';

      modal.innerHTML = `
        <div style="background:#fff; width:100%; max-width:680px; max-height:92vh; overflow-y:auto; border-radius:16px; padding:24px; box-shadow:0 24px 60px rgba(0,0,0,0.35); position:relative;">
          <button type="button" id="closeProductDetailsBtn" aria-label="إغلاق" style="position:absolute; top:16px; left:16px; width:34px; height:34px; border-radius:50%; border:1px solid #e2e8f0; background:#f8fafc; font-size:1.1rem; cursor:pointer;">✕</button>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:20px; align-items:start;">
            <img src="${img}" alt="${product.name}" style="width:100%; height:290px; object-fit:cover; border-radius:12px; background:#f8fafc;" />
            <div>
              <span style="display:inline-block; font-size:0.8rem; font-weight:800; color:#b45309; background:#fef3c7; padding:4px 1
