/**
 * متجر الأزياء الرجالية الفاخر - Application Core (الأردن - د.أ)
 * حل متكامل لمنع أخطاء currentFilter وضمان تصفية وعرض المنتجات في الكتالوج
 */

(function () {
  const CURRENCY = 'د.أ';
  const FREE_SHIPPING_THRESHOLD = 50.00;
  const SHIPPING_FEE = 5.00;

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
      images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80'],
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
      images: ['https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=80'],
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
      images: ['https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=900&q=80'],
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
      images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80'],
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
      images: ['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80'],
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
      images: ['https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=900&q=80'],
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
      images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80'],
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
      images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80'],
      is_featured: false,
      is_bestseller: true,
      reviews_count: 31
    },
    {
      id: 9,
      name: 'ساعة كلاسيكية سويسرية بسوار جلد أسود',
      slug: 'swiss-classic-leather-watch',
      category_slug: 'accessories',
      category_name: 'إكسسوارات وأحذية',
      description: 'ساعة كلاسيكية أنيقة بلمسة فخامة عالية.',
      price: 150.00,
      original_price: 195.00,
      sizes: ['قطر 40 ملم'],
      images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80'],
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
      images: ['https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=900&q=80'],
      is_featured: false,
      is_bestseller: true,
      reviews_count: 64
    },
    {
      id: 11,
      name: 'أزرار أكمام ملكية مطلية بذهب مع حجر أونيكس',
      slug: 'gold-plated-onyx-cufflinks',
      category_slug: 'accessories',
      category_name: 'إكسسوارات وأحذية',
      description: 'أزرار أكمام فاخرة مرصعة بحجر أونيكس أسود.',
      price: 28.00,
      original_price: 38.00,
      sizes: ['مقاس موحد'],
      images: ['https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=900&q=80'],
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
      this.currentFilter = {
        category: 'all',
        search: '',
        minPrice: 0,
        maxPrice: 500,
        sort: 'popular',
        size: null
      };
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
      const lbl = document.getElementById('maxPriceValue') || document.getElementById('priceRangeValue');
      if (lbl) lbl.textContent = this.formatPrice(this.currentFilter.maxPrice);
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
      document.querySelectorAll('[data-category], .catalog-tab-btn, .filter-item').forEach(el => {
        const raw = el.getAttribute('data-category') || el.dataset.category || el.textContent || '';
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
    }

    saveStorage() {
      try {
        localStorage.setItem('elegance_cart', JSON.stringify(this.cart));
        localStorage.setItem('elegance_wishlist', JSON.stringify(this.wishlist));
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
    }

    updateCartUI() {
      const count = this.cart.reduce((s, i) => s + (Number(i.quantity) || 1), 0);
      const subtotal = this.cart.reduce((s, i) => s + (Number(i.price) || 0) * (Number(i.quantity) || 1), 0);
      const shipping = subtotal === 0 || subtotal >= this.freeShippingThreshold ? 0 : this.shippingFee;

      document.querySelectorAll('.cart-count, #cartCount').forEach(el => {
        el.textContent = String(count);
      });
      const subEl = document.getElementById('cartSubtotal');
      if (subEl) subEl.textContent = this.formatPrice(subtotal);
      const shipEl = document.getElementById('cartShipping');
      if (shipEl) shipEl.textContent = shipping === 0 && subtotal > 0 ? 'مجاني' : this.formatPrice(shipping);
      const totEl = document.getElementById('cartTotal');
      if (totEl) totEl.textContent = this.formatPrice(subtotal + shipping);
    }

    toggleWishlist(id) {
      const numId = Number(id);
      const idx = this.wishlist.indexOf(numId);
      if (idx > -1) this.wishlist.splice(idx, 1);
      else this.wishlist.push(numId);
      this.saveStorage();
      document.querySelectorAll('.wishlist-count, #wishlistCount').forEach(el => {
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
          <div class="product-image-wrap">
            <img src="${img}" alt="${product.name}" loading="lazy">
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

      const range = document.getElementById('maxPriceRange') || document.getElementById('priceRange');
      if (range && !range.dataset.bound) {
        range.dataset.bound = '1';
        range.addEventListener('input', e => this.setMaxPrice(e.target.value));
      }

      const sort = document.getElementById('catalogSortSelect') || document.getElementById('sortSelect');
      if (sort && !sort.dataset.bound) {
        sort.dataset.bound = '1';
        sort.addEventListener('change', e => this.setSort(e.target.value));
      }

      if (!document.body.dataset.catBound) {
        document.body.dataset.catBound = '1';
        document.addEventListener('click', e => {
          const btn = e.target.closest('[data-category], .catalog-tab-btn, .filter-item');
          if (!btn) return;
          const val = btn.getAttribute('data-category') || btn.dataset.category || btn.textContent;
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

  // تهيئة فورية لمنع أي خطأ undefined على currentFilter
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
