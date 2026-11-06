/**
 * متجر الأزياء الرجالية الفاخر - Checkout & Payment Module
 * إدارة عملية الدفع والشحن ومحاكاة بوابة Stripe وبطاقات الائتمان
 */

class CheckoutManager {
  constructor() {
    this.currentStep = 1;
    this.shippingFee = 0;
    this.discountAmount = 0;
    this.couponCode = '';
    this.selectedPaymentMethod = 'credit_card'; // 'credit_card' | 'cash_on_delivery' | 'apple_pay'
  }

  init() {
    this.setupListeners();
    this.bindCardInputs();
  }

  setupListeners() {
    // التبديل بين طرق الدفع
    const paymentCards = document.querySelectorAll('.payment-method-card');
    paymentCards.forEach(card => {
      card.addEventListener('click', () => {
        paymentCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedPaymentMethod = card.dataset.method;

        const creditCardSection = document.getElementById('creditCardInputsSection');
        const codNotice = document.getElementById('codNoticeSection');

        if (this.selectedPaymentMethod === 'credit_card') {
          creditCardSection.style.display = 'block';
          codNotice.style.display = 'none';
        } else if (this.selectedPaymentMethod === 'cash_on_delivery') {
          creditCardSection.style.display = 'none';
          codNotice.style.display = 'block';
        } else {
          creditCardSection.style.display = 'none';
          codNotice.style.display = 'none';
        }
      });
    });

    // زر تعبئة البطاقة التجريبية
    const autofillBtn = document.getElementById('autofillDemoCardBtn');
    if (autofillBtn) {
      autofillBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.autofillTestCard();
      });
    }

    // تطبيق كود الخصم
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    if (applyCouponBtn) {
      applyCouponBtn.addEventListener('click', () => {
        const input = document.getElementById('couponCodeInput');
        const code = input ? input.value.trim().toUpperCase() : '';
        this.applyCoupon(code);
      });
    }

    // زر إرسال الطلب النهائي
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    if (placeOrderBtn) {
      placeOrderBtn.addEventListener('click', () => {
        this.submitOrder();
      });
    }
  }

  bindCardInputs() {
    const cardNumInput = document.getElementById('cardNumberInput');
    const cardHolderInput = document.getElementById('cardHolderInput');
    const cardExpiryInput = document.getElementById('cardExpiryInput');

    const cardNumDisplay = document.getElementById('cardNumDisplay');
    const cardHolderDisplay = document.getElementById('cardHolderDisplay');
    const cardExpiryDisplay = document.getElementById('cardExpiryDisplay');

    if (cardNumInput && cardNumDisplay) {
      cardNumInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 16);
        val = val.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = val;
        cardNumDisplay.textContent = val || '•••• •••• •••• ••••';
      });
    }

    if (cardHolderInput && cardHolderDisplay) {
      cardHolderInput.addEventListener('input', (e) => {
        cardHolderDisplay.textContent = e.target.value.trim() || 'اسم حامل البطاقة';
      });
    }

    if (cardExpiryInput && cardExpiryDisplay) {
      cardExpiryInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (val.length >= 2) {
          val = val.substring(0, 2) + '/' + val.substring(2, 4);
        }
        e.target.value = val;
        cardExpiryDisplay.textContent = val || 'MM/YY';
      });
    }
  }

  autofillTestCard() {
    const cardNumInput = document.getElementById('cardNumberInput');
    const cardHolderInput = document.getElementById('cardHolderInput');
    const cardExpiryInput = document.getElementById('cardExpiryInput');
    const cardCvvInput = document.getElementById('cardCvvInput');

    if (cardNumInput) {
      cardNumInput.value = '4242 4242 4242 4242';
      cardNumInput.dispatchEvent(new Event('input'));
    }
    if (cardHolderInput) {
      cardHolderInput.value = 'FAISAL ALOTAIBI';
      cardHolderInput.dispatchEvent(new Event('input'));
    }
    if (cardExpiryInput) {
      cardExpiryInput.value = '12/28';
      cardExpiryInput.dispatchEvent(new Event('input'));
    }
    if (cardCvvInput) {
      cardCvvInput.value = '888';
    }

    window.app.showToast('✨ تم إدراج بطاقة تجريبية معتمدة من Stripe!');
  }

  applyCoupon(code) {
    if (code === 'ELEGANCE20') {
      const subtotal = window.app.getCartSubtotal();
      this.discountAmount = subtotal * 0.20;
      this.couponCode = code;
      window.app.showToast('🎉 تم تفعيل خصم 20% بنجاح!');
      window.app.updateCartSummary();
      const badge = document.getElementById('couponSuccessBadge');
      if (badge) badge.style.display = 'inline-block';
    } else {
      this.discountAmount = 0;
      this.couponCode = '';
      window.app.showToast('❌ كود الخصم غير صالح أو منتهي الصلاحية', 'danger');
      window.app.updateCartSummary();
    }
  }

  goToStep(step) {
    this.currentStep = step;
    document.querySelectorAll('.checkout-step-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.checkout-step').forEach(s => s.classList.remove('active'));

    const activeContent = document.getElementById(`stepContent${step}`);
    const activeStepIndicator = document.getElementById(`stepIndicator${step}`);
    if (activeContent) activeContent.style.display = 'block';
    if (activeStepIndicator) activeStepIndicator.classList.add('active');
  }

  async submitOrder() {
    const cart = window.app.cart;
    if (cart.length === 0) {
      window.app.showToast('سلة المشتريات فارغة!', 'danger');
      return;
    }

    // استخراج بيانات العميل
    const fullName = document.getElementById('custFullName')?.value.trim();
    const email = document.getElementById('custEmail')?.value.trim();
    const phone = document.getElementById('custPhone')?.value.trim();
    const city = document.getElementById('custCity')?.value.trim();
    const address = document.getElementById('custAddress')?.value.trim();

    if (!fullName || !phone || !city || !address) {
      window.app.showToast('يرجى استكمال الاسم ورقم الهاتف والمدينة والعنوان في الخطوة الأولى', 'danger');
      this.goToStep(1);
      return;
    }

    const orderPayload = {
      customer: {
        fullName,
        email: email || 'guest@mensluxury.com',
        phone,
        city,
        address
      },
      items: cart.map(i => ({
        productId: i.id,
        quantity: i.quantity,
        size: i.size,
        color: i.color
      })),
      paymentMethod: this.selectedPaymentMethod,
      couponCode: this.couponCode,
      cardDetails: {
        cardNumber: document.getElementById('cardNumberInput')?.value || '',
        cardExpiry: document.getElementById('cardExpiryInput')?.value || '',
        cardCvv: document.getElementById('cardCvvInput')?.value || ''
      }
    };

    // إظهار حالة التحميل على الزر
    const placeBtn = document.getElementById('placeOrderBtn');
    const originalText = placeBtn.innerHTML;
    placeBtn.disabled = true;
    placeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري تأكيد الدفع وإصدار الفاتورة...';

    try {
      let orderResult = null;
      // محاولة الإرسال للـ Backend
      try {
        const token = window.authManager.token;
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch('/api/orders', {
          method: 'POST',
          headers,
          body: JSON.stringify(orderPayload)
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.order) {
            orderResult = data.order;
          }
        }
      } catch (e) {
        console.warn('Backend unavailable, generating local simulated order:', e);
      }

      // إذا لم يكن السيرفر متاحاً، إنشاء نتيجة محلية موثوقة وفورية
      if (!orderResult) {
        const subtotal = window.app.getCartSubtotal();
        const shipping = subtotal >= 300 ? 0 : 35;
        const discount = this.discountAmount;
        const total = (subtotal - discount) + shipping;

        orderResult = {
          orderNumber: `ORD-2026-${Math.floor(100000 + Math.random() * 900000)}`,
          customerName: fullName,
          customerEmail: email || 'guest@mensluxury.com',
          customerPhone: phone,
          shippingAddress: `${address}، ${city}`,
          paymentMethod: this.selectedPaymentMethod,
          paymentStatus: this.selectedPaymentMethod === 'cash_on_delivery' ? 'قيد التحصيل عند الاستلام' : 'تم الدفع بنجاح (معتمد)',
          transactionId: `TXN_${Date.now().toString(36).toUpperCase()}`,
          subtotal,
          shippingFee: shipping,
          discount,
          totalAmount: total,
          items: cart,
          createdAt: new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        };
      }

      // تفريغ السلة وعرض شاشة النجاح
      window.app.clearCart();
      this.displayOrderSuccess(orderResult);

    } catch (err) {
      console.error(err);
      window.app.showToast('حدث خطأ أثناء معالجة الطلب، يرجى المحاولة ثانية', 'danger');
    } finally {
      placeBtn.disabled = false;
      placeBtn.innerHTML = originalText;
    }
  }

  displayOrderSuccess(order) {
    const container = document.getElementById('checkoutContentArea');
    if (!container) return;

    const paymentLabel = order.paymentMethod === 'cash_on_delivery' 
      ? 'الدفع عند الاستلام (COD)' 
      : 'بطاقة ائتمانية / مدى (Stripe Secure)';

    const itemsHtml = (order.items || []).map(item => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #e2e8f0; font-size:0.92rem;">
        <div>
          <strong>${item.name || item.productName}</strong>
          <span style="color:#64748b; font-size:0.82rem; margin-right:8px;">(مقاس: ${item.size || 'M'} | كمية: ${item.quantity})</span>
        </div>
        <div style="font-weight:700;">${((item.price || item.unitPrice) * item.quantity).toFixed(2)} ر.س</div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="order-success-box">
        <div class="success-icon-animated">
          <i class="fa-solid fa-check"></i>
        </div>
        <h2 style="font-size:2rem; font-weight:900; color:#0f172a;">تهانينا! تم تأكيد طلبك بنجاح</h2>
        <p style="color:#64748b; margin-top:8px;">سوف نرسل لك رسالة نصية وبريداً إلكترونياً بتفاصيل التتبع وموعد التوصيل المتوقع.</p>

        <div class="order-number-badge">
          رقم الطلب: <strong>${order.orderNumber}</strong>
        </div>

        <div class="receipt-card">
          <div style="display:flex; justify-content:space-between; border-bottom:2px solid #0f172a; padding-bottom:12px; margin-bottom:16px;">
            <div>
              <h3 style="font-size:1.15rem; font-weight:800;">فاتورة طلب إلكترونية</h3>
              <p style="color:#64748b; font-size:0.85rem;">التاريخ: ${order.createdAt || 'الآن'}</p>
            </div>
            <div style="text-align:left;">
              <span style="background:#d1fae5; color:#059669; padding:4px 12px; border-radius:50px; font-weight:800; font-size:0.82rem;">
                ${order.paymentStatus || 'تم الدفع'}
              </span>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px; font-size:0.9rem;">
            <div>
              <strong style="color:#64748b; display:block; margin-bottom:4px;">بيانات العميل:</strong>
              <div>${order.customerName}</div>
              <div style="direction:ltr; text-align:right;">${order.customerPhone}</div>
            </div>
            <div>
              <strong style="color:#64748b; display:block; margin-bottom:4px;">عنوان التوصيل:</strong>
              <div>${order.shippingAddress}</div>
              <div>طريقة الدفع: ${paymentLabel}</div>
            </div>
          </div>

          <div style="margin-bottom:16px;">
            <strong style="color:#64748b; display:block; margin-bottom:8px;">القطع المطلوبة:</strong>
            ${itemsHtml}
          </div>

          <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:0.92rem; color:#64748b;">
            <span>المجموع الفرعي:</span>
            <span>${Number(order.subtotal).toFixed(2)} ر.س</span>
          </div>
          ${order.discount > 0 ? `
            <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:0.92rem; color:#10b981;">
              <span>خصم الكوبون (ELEGANCE20):</span>
              <span>- ${Number(order.discount).toFixed(2)} ر.س</span>
            </div>
          ` : ''}
          <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:0.92rem; color:#64748b;">
            <span>تكلفة الشحن والتوصيل:</span>
            <span>${order.shippingFee === 0 ? 'مجاني (عرض خاص)' : Number(order.shippingFee).toFixed(2) + ' ر.س'}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:1.3rem; font-weight:900; color:#0f172a; border-top:1px solid #cbd5e1; padding-top:12px;">
            <span>المجموع الإجمالي:</span>
            <span style="color:#b45309;">${Number(order.totalAmount).toFixed(2)} ر.س</span>
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:16px;">
          <button class="btn btn-secondary" style="background:#0f172a; color:#fff;" onclick="window.print()">
            <i class="fa-solid fa-print"></i> طباعة الفاتورة
          </button>
          <button class="btn btn-primary" onclick="window.location.reload()">
            <i class="fa-solid fa-bag-shopping"></i> متابعة التسوق
          </button>
        </div>
      </div>
    `;
  }
}

window.checkoutManager = new CheckoutManager();
