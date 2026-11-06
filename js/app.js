/**
 * متجر الأزياء الرجالية الفاخر - Application Core
 * يدير السلة، المفضلة، النوافذ المنبثقة، وتصيير المنتجات
 */

class LuxuryApp {
  constructor() {
    this.cart = [];
    this.wishlist = [];
    this.currentFilter = {
      category: 'all',
      search: '',
      minPrice: 0,
      maxPrice: 3000,
      sort: 'popular',
      size: null
    };
    this.activeQuickViewProduct = null;
    this.selectedSize = null;
    this.selectedColor = null;
  }

  async init() {
    this.loadState();
    await window.productsStore.init();

    this.renderHomeFeatured();
    this.renderCatalog();
    this.updateCartBadge();
    this.updateWishlistBadge();
    this.setupEventListeners();
    window.checkoutManager.init();
    window.authManager.updateUI();

    console.log('💎 متجر الأزياء الرجالية الفاخر جاهز للعمل!');
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

  // ================= Cart Operations =================
  addToCart(product, size = null, color = null, quantity = 1) {
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'M';
    const chosenColor = color || (product.colors && product.colors[0]) || '#0f172a';

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
        price: product.price,
        image: product.images[0],
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
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  updateCartBadge() {
    const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
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
    const isWishlisted = this.wishlist.includes(product.id);
    const hasDiscount = product.original_price && product.original_price > product.price;
    const discountPercent = hasDiscount 
      ? Math.round(((product.original_price - product.price) / product.original_price) * 100) 
      : 0;

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-img-box" onclick="window.app.openQuickView(${product.id})">
          <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
          
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
            <span class="current-price">${product.price.toFixed(2)} ر.س</span>
            ${hasDiscount ? `<span class="old-price">${product.original_price.toFixed(2)} ر.س</span>` : ''}
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
    if (!featuredContainer) return;

    const featured = window.productsStore.getAll().filter(p => p.is_featured || p.is_bestseller).slice(0, 4);
    featuredContainer.innerHTML = featured.map(p => this.createProductCardHtml(p)).join('');
  }

  renderCatalog() {
    const catalogContainer = document.getElementById('catalogProductsGrid');
    if (!catalogContainer) return;

    const filtered = window.productsStore.filterProducts(this.currentFilter);
    const countElement = document.getElementById('catalogResultsCount');
    if (countElement) {
      countElement.textContent = `عرض ${filtered.length} من أصل ${window.productsStore.getAll().length} منتج`;
    }

    if (filtered.length === 0) {
      catalogContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background:#fff; border-radius:12px; border:1px solid #e2e8f0;">
          <i class="fa-solid fa-magnifying-glass" style="font-size:3rem; color:#cbd5e1; margin-bottom:16px;"></i>
          <h3 style="font-size:1.3rem; font-weight:800; color:#0f172a;">لم يتم العثور على قطع تطابق بحثك</h3>
          <p style="color:#64748b; margin-top:8px;">جرب تغيير كلمات البحث أو إعادة ضبط خيارات التصفية والأسعار.</p>
          <button class="btn btn-primary" style="margin-top:20px;" onclick="window.app.resetFilters()">
            إعادة تعيين الفلاتر
          </button>
        </div>
      `;
      return;
    }

    catalogContainer.innerHTML = filtered.map(p => this.createProductCardHtml(p)).join('');
  }

  quickAdd(productId) {
    const product = window.productsStore.getById(productId);
    if (!product) return;
    this.addToCart(product, product.sizes ? product.sizes[0] : 'M', product.colors ? product.colors[0] : '#000', 1);
  }

  // ================= Quick View Modal =================
  openQuickView(productId) {
    const product = window.productsStore.getById(productId);
    if (!product) return;

    this.activeQuickViewProduct = product;
    this.selectedSize = product.sizes ? product.sizes[0] : 'M';
    this.selectedColor = product.colors ? product.colors[0] : '#000';

    const modal = document.getElementById('quickViewModal');
    const container = document.getElementById('quickViewContent');
    if (!modal || !container) return;

    const hasDiscount = product.original_price && product.original_price > product.price;

    const thumbsHtml = (product.images || []).map((img, i) => `
      <img src="${img}" class="quickview-thumb ${i === 0 ? 'active' : ''}" onclick="window.app.switchMainModalImage(this, '${img}')" />
    `).join('');

    const sizesHtml = (product.sizes || []).map((sz, i) => `
      <button class="size-chip ${i === 0 ? 'active' : ''}" onclick="window.app.selectModalSize(this, '${sz}')">${sz}</button>
    `).join('');

    const colorsHtml = (product.colors || []).map((c, i) => `
      <div class="color-swatch ${i === 0 ? 'active' : ''}" style="background-color:${c};" onclick="window.app.selectModalColor(this, '${c}')"></div>
    `).join('');

    container.innerHTML = `
      <div class="quickview-grid">
        <div class="quickview-gallery">
          <img id="modalMainImage" src="${product.images[0]}" class="quickview-main-img" alt="${product.name}" />
          <div class="quickview-thumbs">${thumbsHtml}</div>
        </div>

        <div class="quickview-details">
          <span style="color:#b45309; font-weight:800; font-size:0.88rem; margin-bottom:4px;">${product.category_name || 'أزياء فاخرة'}</span>
          <h2>${product.name}</h2>

          <div style="display:flex; align-items:center; gap:8px; margin-bottom:14px; font-size:0.9rem; color:#f59e0b;">
            <i class="fa-solid fa-star"></i>
            <span>${product.rating || '4.9'}</span>
            <span style="color:#64748b;">(${product.reviews_count || 25} تقييم معتمد)</span>
            <span style="color:#10b981; font-weight:700; margin-right:12px;">
              <i class="fa-solid fa-circle-check"></i> متوفر في المخزون (باقي ${product.stock_quantity || 10} قطع)
            </span>
          </div>

          <div class="quickview-price-tag">
            <span>${product.price.toFixed(2)} ر.س</span>
            ${hasDiscount ? `<span style="font-size:1.1rem; color:#94a3b8; text-decoration:line-through; margin-right:12px;">${product.original_price.toFixed(2)} ر.س</span>` : ''}
          </div>

          <p class="quickview-desc">${product.description}</p>

          ${product.details ? `
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px; font-size:0.85rem; color:#475569; margin-bottom:20px;">
              <strong>تفاصيل الخامة والتفصيل:</strong> ${product.details}
            </div>
          ` : ''}

          <!-- اختيار المقاس -->
          <div style="margin-bottom:18px;">
            <div class="product-option-label">
              <span>اختر المقاس: <strong id="modalSelectedSizeLabel">${this.selectedSize}</strong></span>
              <a href="#" style="color:#b45309; font-size:0.82rem; text-decoration:underline;" onclick="event.preventDefault(); window.app.openSizeGuide()">دليل المقاسات</a>
            </div>
            <div class="size-chips">${sizesHtml}</div>
          </div>

          <!-- اختيار اللون -->
          <div style="margin-bottom:24px;">
            <div class="product-option-label">
              <span>اللون المختار:</span>
            </div>
            <div class="color-swatches">${colorsHtml}</div>
          </div>

          <!-- التحكم بالكمية والأزرار -->
          <div style="display:flex; gap:14px; align-items:center; margin-top:auto;">
            <div class="qty-controller" style="height:48px;">
              <button class="qty-btn" style="width:40px; font-size:1.1rem;" onclick="window.app.changeModalQty(-1)">-</button>
              <span id="modalQtyVal" class="qty-val" style="padding:0 14px; font-size:1.1rem;">1</span>
              <button class="qty-btn" style="width:40px; font-size:1.1rem;" onclick="window.app.changeModalQty(1)">+</button>
            </div>

            <button class="btn btn-primary" style="flex-grow:1; height:48px;" onclick="window.app.addActiveModalToCart()">
              <i class="fa-solid fa-bag-shopping"></i> إضافة إلى السلة
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

  switchMainModalImage(el, src) {
    document.querySelectorAll('.quickview-thumb').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    const mainImg = document.getElementById('modalMainImage');
    if (mainImg) mainImg.src = src;
  }

  selectModalSize(el, size) {
    document.querySelectorAll('.size-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    this.selectedSize = size;
    const label = document.getElementById('modalSelectedSizeLabel');
    if (label) label.textContent = size;
  }

  selectModalColor(el, color) {
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
    el.classList.add('active');
    this.selectedColor = color;
  }

  changeModalQty(delta) {
    const qtySpan = document.getElementById('modalQtyVal');
    if (!qtySpan) return;
    let val = parseInt(qtySpan.textContent) || 1;
    val = Math.max(1, val + delta);
    qtySpan.textContent = val;
  }

  addActiveModalToCart() {
    if (!this.activeQuickViewProduct) return;
    const qty = parseInt(document.getElementById('modalQtyVal')?.textContent) || 1;
    this.addToCart(this.activeQuickViewProduct, this.selectedSize, this.selectedColor, qty);
    this.closeModal('quickViewModal');
  }

  // ================= Cart Drawer =================
  openDrawer() {
    document.getElementById('cartDrawerBackdrop')?.classList.add('active');
    document.getElementById('cartDrawer')?.classList.add('active');
    this.renderCartDrawer();
  }

  closeDrawer() {
    document.getElementById('cartDrawerBackdrop')?.classList.remove('active');
    document.getElementById('cartDrawer')?.classList.remove('active');
  }

  renderCartDrawer() {
    const container = document.getElementById('drawerCartItems');
    if (!container) return;

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-box">
          <i class="fa-solid fa-bag-shopping"></i>
          <h4 style="font-size:1.1rem; font-weight:800; color:#0f172a; margin-bottom:6px;">سلة مشترياتك فارغة حالياً</h4>
          <p style="font-size:0.85rem;">استكشف تشكيلاتنا الفاخرة وأضف ما يعجبك لإطلالة لا تُنسى.</p>
        </div>
      `;
      this.updateCartSummary();
      return;
    }

    container.innerHTML = this.cart.map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.name}</h4>
          <div class="cart-item-meta">
            <span>المقاس: <strong>${item.size}</strong></span>
            <span style="display:inline-flex; align-items:center; gap:4px;">
              اللون: <span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:${item.color}; border:1px solid #cbd5e1;"></span>
            </span>
          </div>
          <div class="cart-item-bottom">
            <div class="qty-controller">
              <button class="qty-btn" onclick="window.app.updateCartQty(${index}, -1)">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" onclick="window.app.updateCartQty(${index}, 1)">+</button>
            </div>
            <span class="cart-item-price">${(item.price * item.quantity).toFixed(2)} ر.س</span>
          </div>
        </div>
        <button class="item-remove-btn" onclick="window.app.removeFromCart(${index})" title="حذف القطعة">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `).join('');

    this.updateCartSummary();
  }

  updateCartSummary() {
    const subtotal = this.getCartSubtotal();
    const discount = window.checkoutManager.discountAmount || 0;
    const shipping = (subtotal - discount) >= 300 || subtotal === 0 ? 0 : 35;
    const total = Math.max(0, (subtotal - discount) + shipping);

    const subtotalEl = document.getElementById('drawerSubtotal');
    const discountRow = document.getElementById('drawerDiscountRow');
    const discountEl = document.getElementById('drawerDiscount');
    const shippingEl = document.getElementById('drawerShipping');
    const totalEl = document.getElementById('drawerTotal');

    if (subtotalEl) subtotalEl.textContent = `${subtotal.toFixed(2)} ر.س`;
    if (discountRow) {
      if (discount > 0) {
        discountRow.style.display = 'flex';
        if (discountEl) discountEl.textContent = `- ${discount.toFixed(2)} ر.س`;
      } else {
        discountRow.style.display = 'none';
      }
    }
    if (shippingEl) {
      shippingEl.textContent = shipping === 0 ? 'مجاني (عرض خاص)' : `${shipping.toFixed(2)} ر.س`;
    }
    if (totalEl) totalEl.textContent = `${total.toFixed(2)} ر.س`;
  }

  // ================= Checkout Modal =================
  openCheckoutModal() {
    if (this.cart.length === 0) {
      this.showToast('سلة المشتريات فارغة!', 'danger');
      return;
    }
    this.closeDrawer();
    window.checkoutManager.goToStep(1);
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.add('active');
  }

  // ================= Size Guide Modal =================
  openSizeGuide() {
    const modal = document.getElementById('sizeGuideModal');
    if (modal) modal.classList.add('active');
  }

  // ================= Auth Modal =================
  openAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.add('active');
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }

  // ================= Toast Notifications =================
  showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    if (type === 'danger') {
      toast.style.borderRightColor = '#ef4444';
    }

    toast.innerHTML = `
      <i class="fa-solid ${type === 'danger' ? 'fa-circle-exclamation' : 'fa-circle-check'}" style="color:${type === 'danger' ? '#ef4444' : '#10b981'}; font-size:1.2rem;"></i>
      <span style="font-weight:700; font-size:0.92rem;">${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // ================= Filter Logic =================
  resetFilters() {
    this.currentFilter = {
      category: 'all',
      search: '',
      minPrice: 0,
      maxPrice: 3000,
      sort: 'popular',
      size: null
    };

    const searchInput = document.getElementById('catalogSearchInput');
    if (searchInput) searchInput.value = '';

    const sortSelect = document.getElementById('catalogSortSelect');
    if (sortSelect) sortSelect.value = 'popular';

    document.querySelectorAll('.filter-item').forEach(el => el.classList.remove('active'));
    document.querySelector('.filter-item[data-cat="all"]')?.classList.add('active');

    document.querySelectorAll('.catalog-tab-btn').forEach(el => el.classList.remove('active'));
    document.querySelector('.catalog-tab-btn[data-cat="all"]')?.classList.add('active');

    this.renderCatalog();
  }

  setupEventListeners() {
    // إغلاق الأدراج والنوافذ عند النقر خارجها
    document.getElementById('cartDrawerBackdrop')?.addEventListener('click', () => this.closeDrawer());
    document.getElementById('closeCartDrawerBtn')?.addEventListener('click', () => this.closeDrawer());
    document.getElementById('openCartBtn')?.addEventListener('click', () => this.openDrawer());
    document.getElementById('checkoutBtnFromDrawer')?.addEventListener('click', () => this.openCheckoutModal());

    // أزرار فئات الكتالوج
    document.querySelectorAll('.filter-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.filter-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        this.currentFilter.category = item.dataset.cat || 'all';
        this.renderCatalog();
      });
    });

    // تبويبات الفئات في الكتالوج
    document.querySelectorAll('.catalog-tab-btn').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.catalog-tab-btn').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentFilter.category = tab.dataset.cat || 'all';
        this.renderCatalog();
      });
    });

    // شريط البحث المباشر
    const searchInput = document.getElementById('catalogSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.currentFilter.search = e.target.value;
        this.renderCatalog();
      });
    }

    // تحديد الفرز
    const sortSelect = document.getElementById('catalogSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentFilter.sort = e.target.value;
        this.renderCatalog();
      });
    }

    // تصفية أزرار المقاسات في الكتالوج
    document.querySelectorAll('.filter-size-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        if (chip.classList.contains('active')) {
          chip.classList.remove('active');
          this.currentFilter.size = null;
        } else {
          document.querySelectorAll('.filter-size-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          this.currentFilter.size = chip.dataset.size;
        }
        this.renderCatalog();
      });
    });

    // استمارة تسجيل الدخول
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail')?.value;
        const pass = document.getElementById('loginPass')?.value;
        const res = await window.authManager.login(email, pass);
        if (res.success) {
          this.showToast(res.message);
          this.closeModal('authModal');
        } else {
          this.showToast(res.message, 'danger');
        }
      });
    }

    // استمارة التسجيل الجديد
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('regName')?.value;
        const email = document.getElementById('regEmail')?.value;
        const pass = document.getElementById('regPass')?.value;
        const phone = document.getElementById('regPhone')?.value;
        const res = await window.authManager.register(name, email, pass, phone);
        if (res.success) {
          this.showToast(res.message);
          this.closeModal('authModal');
        } else {
          this.showToast(res.message, 'danger');
        }
      });
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new LuxuryApp();
  window.app.init();
});
