\/**
 * متجر الأزياء الرجالية الفاخر - Application Core
 * يدير الفلاتر، التصفية، عرض المنتجات، السلة، المفضلة، وتنسيق الدينار الأردني (د.أ)
 */

class LuxuryApp {
  constructor() {
    this.currency = 'د.أ';
    this.freeShippingThreshold = 50.00;
    this.shippingFee = 5.00;

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

    this.activeQuickViewProduct = null;
    this.selectedSize = null;
    this.selectedColor = null;
  }

  async init() {
    try {
      this.loadState();

      if (window.productsStore && typeof window.productsStore.init === 'function') {
        await window.productsStore.init();
      }

      if (window.__pendingCategory) {
        this.currentFilter.category = window.__pendingCategory;
        window.__pendingCategory = null;
      }

      this.bindFilterEvents();
      this.syncCategoryUI();
      this.renderHomeFeatured();
      this.renderCatalog();
      this.updateCartUI();
      this.updateWishlistUI();
    } catch (err) {
      console.error('Error initializing LuxuryApp:', err);
      this.renderHomeFeatured();
      this.renderCatalog();
    }
  }

  loadState() {
    try {
      const savedCart = localStorage.getItem('elegance_cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) this.cart = parsed;
      }
    } catch (_) {
      this.cart = [];
    }

    try {
      const savedWishlist = localStorage.getItem('elegance_wishlist');
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);
        if (Array.isArray(parsed)) this.wishlist = parsed;
      }
    } catch (_) {
      this.wishlist = [];
    }
  }

  saveState() {
    try {
      localStorage.setItem('elegance_cart', JSON.stringify(this.cart));
      localStorage.setItem('elegance_wishlist', JSON.stringify(this.wishlist));
    } catch (_) {}
  }

  formatPrice(amount) {
    const num = Number(amount);
    if (!Number.isFinite(num)) return `0.00 ${this.currency}`;
    return `${num.toFixed(2)} ${this.currency}`;
  }

  normalizeCategory(category) {
    const val = String(category || 'all').trim().toLowerCase();
    if (!val || val === 'all' || val === 'كافة المنتجات' || val === 'كافة التشكيلات' || val === 'التشكيلة الكاملة') {
      return 'all';
    }
    if (val.includes('suit') || val.includes('بدل')) return 'suits';
    if (val.includes('shirt') || val.includes('قميص') || val.includes('قمصان')) return 'shirts';
    if (val.includes('pant') || val.includes('بنطال') || val.includes('بناطيل')) return 'pants';
    if (val.includes('accessor') || val.includes('إكسسوار') || val.includes('اكسسوار') || val.includes('ساع')) {
      return 'accessories';
    }
    return val;
  }

  setCategory(category) {
    this.currentFilter.category = this.normalizeCategory(category);
    this.syncCategoryUI();
    this.renderCatalog();
  }

  setSearch(query) {
    this.currentFilter.search = String(query || '');
    this.renderCatalog();
  }

  setMaxPrice(maxPrice) {
    const parsed = Number(maxPrice);
    this.currentFilter.maxPrice = Number.isFinite(parsed) && parsed >= 0 ? parsed : 500;
    const priceLabel = document.getElementById('maxPriceValue') || document.getElementById('priceRangeValue');
    if (priceLabel) {
      priceLabel.textContent = this.formatPrice(this.currentFilter.maxPrice);
    }
    this.renderCatalog();
  }

  setSort(sortValue) {
    this.currentFilter.sort = sortValue || 'popular';
    this.renderCatalog();
  }

  setSize(sizeValue) {
    this.currentFilter.size = this.currentFilter.size === sizeValue ? null : sizeValue;
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

    const searchInput = document.getElementById('catalogSearchInput') || document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';

    const priceInput = document.getElementById('maxPriceRange') || document.getElementById('priceRange');
    if (priceInput) priceInput.value = 500;

    const priceLabel = document.getElementById('maxPriceValue') || document.getElementById('priceRangeValue');
    if (priceLabel) priceLabel.textContent = this.formatPrice(500);

    const sortSelect = document.getElementById('catalogSortSelect') || document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = 'popular';

    this.syncCategoryUI();
    this.renderCatalog();
  }

  syncCategoryUI() {
    const activeCat = this.currentFilter.category;
    const buttons = document.querySelectorAll('[data-category], .catalog-tab-btn, .filter-item');

    buttons.forEach(btn => {
      const rawCat =
        btn.getAttribute('data-category') ||
        btn.dataset.category ||
        btn.textContent ||
        '';
      const normalized = this.normalizeCategory(rawCat);
      if (normalized === activeCat) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  bindFilterEvents() {
    const searchInput = document.getElementById('catalogSearchInput') || document.getElementById('searchInput');
    if (searchInput && !searchInput.dataset.bound) {
      searchInput.dataset.bound = '1';
      searchInput.addEventListener('input', (e) => this.setSearch(e.target.value));
    }

    const priceInput = document.getElementById('maxPriceRange') || document.getElementById('priceRange');
    if (priceInput && !priceInput.dataset.bound) {
      priceInput.dataset.bound = '1';
      priceInput.addEventListener('input', (e) => this.setMaxPrice(e.target.value));
    }

    const sortSelect = document.getElementById('catalogSortSelect') || document.getElementById('sortSelect');
    if (sortSelect && !sortSelect.dataset.bound) {
      sortSelect.dataset.bound = '1';
      sortSelect.addEventListener('change', (e) => this.setSort(e.target.value));
    }

    if (!document.body.dataset.luxuryDelegated) {
      document.body.dataset.luxuryDelegated = '1';
      document.addEventListener('click', (e) => {
        const catEl = e.target.closest('[data-category], .catalog-tab-btn, .filter-item');
        if (catEl) {
          const catValue =
            catEl.getAttribute('data-category') ||
            catEl.dataset.category ||
            catEl.textContent;
          if (catValue) {
            e.preventDefault();
            this.setCategory(catValue);
          }
        }
      });
    }
  }

  quickAdd(productId) {
    if (!window.productsStore) return;
    const product = window.productsStore.getById(productId);
    if (!product) return;

    const defaultSize = Array.isArray(product.sizes) && product.sizes.length ? product.sizes[0] : 'M';
    const defaultColor = Array.isArray(product.colors) && product.colors.length ? product.colors[0] : null;
    this.addToCart(product, 1, defaultSize, defaultColor);
  }

  addToCart(product, quantity = 1, size = null, color = null) {
    if (!product) return;
    const existing = this.cart.find(
      item => item.id === product.id && item.size === size && item.color === color
    );

    if (existing) {
      existing.quantity += Number(quantity) || 1;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: Number(product.price) || 0,
        image: Array.isArray(product.images) ? product.images[0] : '',
        quantity: Number(quantity) || 1,
        size,
        color
      });
    }

    this.saveState();
    this.updateCartUI();
  }

  removeFromCart(index) {
    if (index < 0 || index >= this.cart.length) return;
    this.cart.splice(index, 1);
    this.saveState();
    this.updateCartUI();
  }

  updateCartQuantity(index, delta) {
    if (index < 0 || index >= this.cart.length) return;
    const nextQty = (Number(this.cart[index].quantity) || 1) + Number(delta);
    if (nextQty <= 0) {
      this.removeFromCart(index);
      return;
    }
    this.cart[index].quantity = nextQty;
    this.saveState();
    this.updateCartUI();
  }

  toggleWishlist(productId) {
    const id = Number(productId);
    const idx = this.wishlist.indexOf(id);
    if (idx > -1) {
      this.wishlist.splice(idx, 1);
    } else {
      this.wishlist.push(id);
    }
    this.saveState();
    this.updateWishlistUI();
    this.renderCatalog();
    this.renderHomeFeatured();
  }

  updateWishlistUI() {
    const badges = document.querySelectorAll('.wishlist-count, #wishlistCount');
    badges.forEach(el => {
      el.textContent = String(this.wishlist.length);
    });
  }

  updateCartUI() {
    const totalCount = this.cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
    const subtotal = this.cart.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
    const shipping = subtotal === 0 || subtotal >= this.freeShippingThreshold ? 0 : this.shippingFee;
    const grandTotal = subtotal + shipping;

    document.querySelectorAll('.cart-count, #cartCount').forEach(el => {
      el.textContent = String(totalCount);
    });

    const subtotalEl = document.getElementById('cartSubtotal');
    if (subtotalEl) subtotalEl.textContent = this.formatPrice(subtotal);

    const shippingEl = document.getElementById('cartShipping');
    if (shippingEl) {
      shippingEl.textContent = shipping === 0 && subtotal > 0 ? 'مجاني' : this.formatPrice(shipping);
    }

    const totalEl = document.getElementById('cartTotal');
    if (totalEl) totalEl.textContent = this.formatPrice(grandTotal);

    const itemsContainer = document.getElementById('cartItemsContainer') || document.getElementById('cartItems');
    if (itemsContainer) {
      if (!this.cart.length) {
        itemsContainer.innerHTML = '<p class="empty-cart-msg">سلة التسوق فارغة حالياً.</p>';
      } else {
        itemsContainer.innerHTML = this.cart.map((item, idx) => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
              <h4>${item.name}</h4>
              <p class="cart-item-price">${this.formatPrice(item.price)}</p>
              ${item.size ? `<small>المقاس: ${item.size}</small>` : ''}
              <div class="cart-qty-controls">
                <button type="button" onclick="window.app.updateCartQuantity(${idx}, -1)">-</button>
                <span>${item.quantity}</span>
                <button type="button" onclick="window.app.updateCartQuantity(${idx}, 1)">+</button>
                <button type="button" onclick="window.app.removeFromCart(${idx})"><i class="fa-solid fa-trash"></i></button>
              </div>
            </div>
          </div>
        `).join('');
      }
    }
  }

  createProductCardHtml(product) {
    const price = Number(product.price) || 0;
    const originalPrice = product.original_price ? Number(product.original_price) : null;
    const hasDiscount = originalPrice !== null && originalPrice > price;
    const imageUrl = Array.isArray(product.images) && product.images.length ? product.images[0] : '';
    const isWished = this.wishlist.includes(Number(product.id));

    return `
      <div class="product-card" data-id="${product.id}" data-category="${product.category_slug || ''}">
        <div class="product-image-wrap">
          <img src="${imageUrl}" alt="${product.name}" loading="lazy">
          <button type="button" class="btn-wishlist ${isWished ? 'active' : ''}" onclick="window.app.toggleWishlist(${product.id})" aria-label="المفضلة">
            <i class="${isWished ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
        </div>
        <div class="product-info">
          <span class="product-category">${product.category_name || ''}</span>
          <h3 class="product-title">${product.name}</h3>
          <div class="product-price-row">
            <span class="current-price">${this.formatPrice(price)}</span>
            ${hasDiscount ? `<span class="old-price">${this.formatPrice(originalPrice)}</span>` : ''}
          </div>
          <button type="button" class="btn-add-cart" onclick="window.app.quickAdd(${product.id})">
            <i class="fa-solid fa-cart-plus"></i> إضافة إلى السلة
          </button>
        </div>
      </div>
    `;
  }

  renderHomeFeatured() {
    const featuredContainer = document.getElementById('homeFeaturedProducts');
    if (!featuredContainer || !window.productsStore) return;

    const allProducts = window.productsStore.getAll() || [];
    const featured = allProducts.filter(p => p.is_featured || p.is_bestseller);
    const itemsToShow = featured.length > 0 ? featured.slice(0, 4) : allProducts.slice(0, 4);

    featuredContainer.innerHTML = itemsToShow
      .map(p => this.createProductCardHtml(p))
      .join('');
  }

  renderCatalog() {
    const catalogContainer = document.getElementById('catalogProductsGrid');
    if (!catalogContainer || !window.productsStore) return;

    const filterState = this.currentFilter || {};
    const filteredProducts = window.productsStore.filterProducts({
      category: filterState.category || 'all',
      search: filterState.search || '',
      minPrice: filterState.minPrice ?? 0,
      maxPrice: filterState.maxPrice ?? Infinity,
      sort: filterState.sort || 'popular',
      size: filterState.size || null
    });

    if (!filteredProducts.length) {
      catalogContainer.innerHTML = '<p class="empty-catalog-msg">لا توجد منتجات مطابقة للفلاتر المحددة حالياً.</p>';
      return;
    }

    catalogContainer.innerHTML = filteredProducts
      .map(product => this.createProductCardHtml(product))
      .join('');
  }
}

window.app = new LuxuryApp();

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    window.app.init();
  });
} else {
  window.app.init();
}
