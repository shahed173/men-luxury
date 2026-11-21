/**
 * متجر الأزياء الرجالية الفاخر - Application Core
 * يدير السلة، المفضلة، النوافذ المنبثقة، وتصيير المنتجات
 */

class LuxuryApp {
  constructor() {
    this.cart = [];
    this.wishlist = [];
    this.currency = 'د.أ';
    this.freeShippingThreshold = 50;
    this.shippingFee = 5;
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

  formatPrice(amount) {
    const num = Number(amount) || 0;
    return `${num.toFixed(2)} ${this.currency}`;
  }

  async init() {
    this.loadState();
    this.setupEventListeners();

    try {
      if (window.productsStore && typeof window.productsStore.init === 'function') {
        await window.productsStore.init();
      }
      this.renderHomeFeatured();
      this.renderCatalog();
    } catch (err) {
      console.error('Error initializing products/catalog:', err);
    }

    this.updateCartBadge();
    this.updateWishlistBadge();

    try {
      if (window.checkoutManager && typeof window.checkoutManager.init === 'function') {
        window.checkoutManager.init();
      }
    } catch (err) {
      console.error('Error initializing checkoutManager:', err);
    }

    try {
      if (window.authManager && typeof window.authManager.updateUI === 'function') {
        window.authManager.updateUI();
      }
    } catch (err) {
      console.error('Error updating auth UI:', err);
    }

    console.log('💎 متجر الأزياء الرجالية الفاخر جاهز للعمل (الأردن - د.أ)!');
  }

  loadState() {
    try {
      this.cart = JSON.parse(localStorage.getItem('luxury_cart') || '[]');
      this.wishlist = JSON.parse(localStorage.getItem('luxury_wishlist') || '[]');
    } catch (e) {
      this.cart = [];
      this.wishlist = [];
    }
  }

  saveState() {
    localStorage.setItem('luxury_cart', JSON.stringify(this.cart));
    localStorage.setItem('luxury_wishlist', JSON.stringify(this.wishlist));
    this.updateCartBadge();
    this.updateWishlistBadge();
  }

  // ================= Category Sync Helper =================
  setCategory(category = 'all') {
    this.currentFilter.category = category || 'all';
    this.syncCategoryUI(this.currentFilter.category);
    this.renderCatalog();
  }

  syncCategoryUI(category) {
    document.querySelectorAll('.filter-item').forEach(item => {
      item.classList.toggle('active', item.dataset.cat === category);
    });
    document.querySelectorAll('.catalog-tab-btn').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.cat === category);
    });
  }

  // ================= Cart Operations =================
  addToCart(product, size = null, color = null, quantity = 1) {
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'M';
    const chosenColor = color || (product.colors && product.colors[0]) || '#0f172a';
    const images = Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'];

    const existingIndex = this.cart.findIndex(
      item => item.id === product.id && item.size === chosenSize && item.color === chosenColor
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: Number(product.price) || 0,
        image: images[0],
        size: chosenSize,
        color: chosenColor,
        quantity: quantity
      });
    }

    this.saveState();
    this.renderCartDrawer();
    this.showToast(`✨ تمت إضافة "${product.name}" إلى سلة المشتريات`);
    this.openDrawer();
  }

  updateCartQty(index, change) {
    if (!this.cart[index]) return;
    this.cart[index].quantity += change;
    if (this.cart[index].quantity <= 0) {
      this.cart.splice(index, 1);
    }
    this.saveState();
    this.renderCartDrawer();
  }

  removeFromCart(index) {
    if (!this.cart[index]) return;
    const removed = this.cart[index].name;
    this.cart.splice(index, 1);
    this.saveState();
    this.renderCartDrawer();
    this.showToast(`تم حذف "${removed}" من السلة`, 'danger');
  }

  clearCart() {
    this.cart = [];
    this.saveState();
    this.renderCartDrawer();
  }

  getCartSubtotal() {
    return this.cart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (Number(item.quantity) || 1)), 0);
  }

  updateCartBadge() {
    const count = this.cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
    const badges = document.querySelectorAll('.cart-badge-count');
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  // ================= Wishlist =================
  toggleWishlist(productId) {
    const id = Number(productId);
    const idx = this.wishlist.indexOf(id);
    if (idx > -1) {
      this.wishlist.splice(idx, 1);
      this.showToast('تمت الإزالة من قائمة المفضلة');
    } else {
      this.wishlist.push(id);
      this.showToast('❤️ أضيفت القطعة إلى قائمة الرغبات');
    }
    this.saveState();
    this.renderCatalog();
    this.renderHomeFeatured();
  }

  updateWishlistBadge() {
    const count = this.wishlist.length;
    const badges = document.querySelectorAll('.wishlist-badge-count');
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  // ================= Product Card HTML Builder =================
  createProductCardHtml(product) {
    const isWishlisted = this.wishlist.includes(Number(product.id));
    const price = Number(product.price) || 0;
    const originalPrice = Number(product.original_price) || 0;
    const hasDiscount = originalPrice > price;
    const discountPercent = hasDiscount
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;
    const imgSrc = Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80';

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-img-box" onclick="window.app.openQuickView(${product.id})">
          <img src="${imgSrc}" alt="${product.name}" loading="lazy" />
          
          <div class="product-badges">
            ${hasDiscount ? `<span class="badge-tag badge-discount">خصم ${discountPercent}%</span>` : ''}
            ${product.is_bestseller ? `<span class="badge-tag badge-bestseller">الأكثر طلباً</span>` : ''}
          </div>

          <div class="product-actions-hover" onclick="event.stopPropagation()">
            <button class="action-circle-btn" title="معاينة سريعة" onclick="window.app.openQuickView(${product.id})">
              <i class="fa-solid fa-eye"></i>
            </button>
            <button class="action-circle-btn" title="إضافة للمفضلة" onclick="window.app.toggleWishlist(${product.id})">
              <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart" style="${isWishlisted ? 'color:#ef4444;' : ''}"></i>
            </button>
          </div>
        </div>

        <div class="product-info">
          <span class="product-category">${product.category_name || 'أزياء فاخرة'}</span>
          <h3 class="product-title" onclick="window.app.openQuickView(${product.id})">${product.name}</h3>
          
          <div class="product-rating">
            <i class="fa-solid fa-star"></i>
            <span>${product.rating || '4.8'}</span>
            <span class="count">(${product.reviews_count || 12} تقييم)</span>
          </div>

          <div class="product-price-row">
            <span class="current-price">${this.formatPrice(price)}</span>
            ${hasDiscount ? `<span class="old-price">${this.formatPrice(originalPrice)}</span>` : ''}
          </div>

          <button class="btn-add-cart" onclick="window.app.quickAdd(${product.id})">
            <i class="fa-solid fa-cart-plus"></i> إضافة إلى السلة
          </button>
        </div>
      </div>
    `;
  }

  // ================= Rendering Views =================
  renderHomeFeatured() {
    const featuredContainer = document.getElementById('homeFeaturedProducts');
    if (!featuredContainer || !window.productsStore) return;

    const allProducts = window.productsStore.getAll() || [];
    const featured = allProducts.filter(p => p.is_featured || p.is_bestseller).slice(0, 4);
    const itemsToShow = featured.length > 0 ? featured : allProducts.slice(0, 4);
    featuredContainer.innerHTML = itemsToShow.map(p => this.createProductCardHtml(p)).join('');
  }

  renderCatalog() {
    const catalogContainer = document.getElementById('catalogProductsGrid');
    if (!catalogContainer || !window.productsStore) return;

    const allProducts = window.productsStore.getAll
