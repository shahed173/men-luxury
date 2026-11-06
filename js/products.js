/**
 * متجر الأزياء الرجالية الفاخر - Products Module
 * يحتوي على بيانات المنتجات ودوال الجلب والفلترة والفرز
 * يدعم العمل المزدوج: الاتصال التلقائي بـ REST API مع توفر قاعدة بيانات محلية مدمجة
 */

const API_BASE = '/api';

// قائمة المنتجات الافتراضية المدمجة (تعمل فوراً في المتصفح وتتطابق مع الـ Seed)
const initialFallbackProducts = [
  {
    id: 1,
    name: 'بدلة توكسيدو ملكية سوداء فاخرة',
    slug: 'royal-black-tuxedo-suit',
    category_slug: 'suits',
    category_name: 'بدلات رسمية',
    description: 'بدلة توكسيدو مصممة خصيصاً للمناسبات والاحتفالات الكبرى، مصنوعة من صوف الميرينو الفاخر بياقة ساتان إيطالي وتفصيل Slim-Fit فائق الدقة يمنحك حضوراً آسراً.',
    details: 'المادة: 95% صوف ميرينو ممتاز، 5% حرير ناعم | الياقة: ساتان لميع كلاسيكي | القصة: Slim Fit إيطالي | الغسيل: تنظيف جاف فقط.',
    price: 1850.00,
    original_price: 2300.00,
    stock_quantity: 14,
    sizes: ['48 (S)', '50 (M)', '52 (L)', '54 (XL)', '56 (XXL)'],
    colors: ['#0f172a', '#1e293b', '#000000'],
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=80'
    ],
    is_featured: true,
    is_bestseller: true,
    rating: 4.9,
    reviews_count: 38
  },
  {
    id: 2,
    name: 'بدلة كلاسيكية زرقاء كحلية من الصوف الخالص',
    slug: 'navy-blue-classic-wool-suit',
    category_slug: 'suits',
    category_name: 'بدلات رسمية',
    description: 'بدلة عمل رسمية بلون كحلي داكن ملكي، تجمع بين الراحة طوال ساعات العمل والأناقة الخالدة لاجتماعات العمل والمناسبات الرسمية.',
    details: 'المادة: 100% صوف نقي خفيف ومريح للتنفس | بطانة حريرية داخلية مقاومة للعرق | بطرف أزرار قرن طبيعي.',
    price: 1450.00,
    original_price: 1750.00,
    stock_quantity: 20,
    sizes: ['48 (S)', '50 (M)', '52 (L)', '54 (XL)'],
    colors: ['#1e3a8a', '#0f172a'],
    images: [
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=900&q=80'
    ],
    is_featured: true,
    is_bestseller: true,
    rating: 4.8,
    reviews_count: 24
  },
  {
    id: 3,
    name: 'بدلة رمادية عصرية ذات نقوش مربعات ناعمة (Glen Check)',
    slug: 'grey-plaid-tailored-suit',
    category_slug: 'suits',
    category_name: 'بدلات رسمية',
    description: 'تصميم أوروبي عصري بنقشة مربعات دقيقة ومميزة تمنحك طابعاً عصرياً مميزاً في الفعاليات واللقاءات الراقية.',
    details: 'صوف مخلوط خفيف الوزن | قصّة مريحة Modern Fit | جيوب مزدوجة مائلة مع لمسات داخلية فاخرة.',
    price: 1600.00,
    original_price: 1950.00,
    stock_quantity: 9,
    sizes: ['50 (M)', '52 (L)', '54 (XL)'],
    colors: ['#64748b', '#475569'],
    images: [
      'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80'
    ],
    is_featured: false,
    is_bestseller: false,
    rating: 4.7,
    reviews_count: 15
  },
  {
    id: 4,
    name: 'قميص أبيض ناصع من القطن المصري الفاخر (Giza Cotton)',
    slug: 'egyptian-cotton-white-shirt',
    category_slug: 'shirts',
    category_name: 'قمصان فاخرة',
    description: 'قميص أبيض كلاسيكي مصنوع من أجود خيوط القطن المصري طويل التيلة، بملمس حريري ناعم ومقاومة فائقة للتجعد ليبقى مظهره أنيقاً طوال اليوم.',
    details: 'خامة 100% قطن جيزة مصري | تقنية مقاومة التجعد Non-Iron | ياقة فرنسية كلاسيكية متناسقة مع ربطة العنق.',
    price: 320.00,
    original_price: 400.00,
    stock_quantity: 35,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#ffffff', '#f8fafc'],
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80'
    ],
    is_featured: true,
    is_bestseller: true,
    rating: 4.9,
    reviews_count: 72
  },
  {
    id: 5,
    name: 'قميص أكسفورد أزرق سماوي كاجوال وأنيق',
    slug: 'oxford-sky-blue-shirt',
    category_slug: 'shirts',
    category_name: 'قمصان فاخرة',
    description: 'قميص أكسفورد المنسوج بعناية، مثالي للأيام العادية في العمل أو الخروجات المسائية مع ياقة بأزرار Button-Down.',
    details: 'نسيج أكسفورد متين وفاخر | أزرار لؤلؤية طبيعية | قصّة عصرية Regular Fit تمنح حرية الحركة.',
    price: 290.00,
    original_price: 350.00,
    stock_quantity: 28,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#93c5fd', '#bfdbfe', '#ffffff'],
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80'
    ],
    is_featured: true,
    is_bestseller: false,
    rating: 4.8,
    reviews_count: 41
  },
  {
    id: 6,
    name: 'قميص كتان طبيعي بيج للصيف والإجازات',
    slug: 'pure-linen-beige-summer-shirt',
    category_slug: 'shirts',
    category_name: 'قمصان فاخرة',
    description: 'قميص صيفي من الكتان النقي خفيف ومنعش، خيار لا غنى عنه لإطلالات العطلات الفاخرة والأجواء الدافئة.',
    details: '100% كتان طبيعي عالي التهوية | ملمس مريح وناعم ومظهر غير متكلف وغاية في الفخامة.',
    price: 340.00,
    original_price: null,
    stock_quantity: 18,
    sizes: ['M', 'L', 'XL'],
    colors: ['#e2d9cc', '#f5ebe0'],
    images: [
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=900&q=80'
    ],
    is_featured: false,
    is_bestseller: true,
    rating: 4.6,
    reviews_count: 19
  },
  {
    id: 7,
    name: 'بنطال تشينو كلاسيكي كحلي بقصة مدببة (Slim Chino)',
    slug: 'classic-navy-slim-chino',
    category_slug: 'pants',
    category_name: 'بناطيل رجالية',
    description: 'بنطال تشينو مريح جداً مصنوع من القطن المطاطي الناعم، مناسب تماماً للإطلالات الذكية (Smart Casual).',
    details: '98% قطن ممتاز، 2% ألياف إيلاستين للمرونة | جيوب خلفية مخفية بزر أنيق | حزام داخلي مانع للانزلاق.',
    price: 310.00,
    original_price: 380.00,
    stock_quantity: 30,
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['#1e293b', '#0f172a', '#334155'],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80'
    ],
    is_featured: true,
    is_bestseller: true,
    rating: 4.8,
    reviews_count: 53
  },
  {
    id: 8,
    name: 'بنطال رسمي صوف خفيف رمادي فحمي مع حزام جانبي',
    slug: 'charcoal-tailored-trousers-side-adjusters',
    category_slug: 'pants',
    category_name: 'بناطيل رجالية',
    description: 'بنطال رسمي إيطالي الطراز بحزام جانبي معدني بدل حلقات الحزام التقليدية، يمنح قوامك مظهراً متناسقاً ورفيع المستوى.',
    details: '100% صوف خفيف فائق النعومة | طية أمامية حادة (Pleated) | حزام تعديل جانبي إيطالي نحاسي.',
    price: 490.00,
    original_price: 590.00,
    stock_quantity: 15,
    sizes: ['31', '32', '34', '36'],
    colors: ['#334155', '#475569'],
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80'
    ],
    is_featured: false,
    is_bestseller: true,
    rating: 4.9,
    reviews_count: 31
  },
  {
    id: 9,
    name: 'ساعة كلاسيكية سويسرية بسوار جلد تمساح طبيعي أسود',
    slug: 'swiss-classic-leather-watch',
    category_slug: 'accessories',
    category_name: 'إكسسوارات وأحذية',
    description: 'تحفة ميكانيكية دقيقة بقرص كلاسيكي مطلي بالذهب وميناء أبيض نقي، تضيف لمسة فخامة استثنائية لمعصمك.',
    details: 'حركة أوتوماتيكية دقيقة | زجاج ياقوتي مقاوم للخدش Sapphire Crystal | مقاومة للماء حتى عمق 50 متراً.',
    price: 1250.00,
    original_price: 1600.00,
    stock_quantity: 12,
    sizes: ['قطر 40 ملم'],
    colors: ['#000000', '#b45309'],
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80'
    ],
    is_featured: true,
    is_bestseller: true,
    rating: 5.0,
    reviews_count: 48
  },
  {
    id: 10,
    name: 'حزام جلد طبيعي إيطالي بوجهين (أسود / بني داكن)',
    slug: 'reversible-italian-leather-belt',
    category_slug: 'accessories',
    category_name: 'إكسسوارات وأحذية',
    description: 'حزام مصنوع يدوياً في فلورنسا من جلد العجل الطبيعي المحبب مع إبزيم معدني فاخر قابل للدوران للتبديل بين الأسود والبني.',
    details: 'جلد طبيعي 100% | إبزيم من الستانلس ستيل المقاوم للصدأ والتآكل | عرض 3.5 سم مناسب للبدلات والجينز.',
    price: 260.00,
    original_price: 320.00,
    stock_quantity: 40,
    sizes: ['90 سم', '95 سم', '100 سم', '105 سم'],
    colors: ['#000000', '#451a03'],
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=900&q=80'
    ],
    is_featured: false,
    is_bestseller: true,
    rating: 4.8,
    reviews_count: 64
  },
  {
    id: 11,
    name: 'أزرار أكمام ملكية مطلية بذهب عيار 18 مع حجر أونيكس أسود',
    slug: 'gold-plated-onyx-cufflinks',
    category_slug: 'accessories',
    category_name: 'إكسسوارات وأحذية',
    description: 'أزرار أكمام فاخرة تمنح أطراف قميصك الرسمي بريقاً مهيباً وتفصيلاً يكتمل به مظهرك في المناسبات.',
    details: 'نحاس نقي مطلي بطبقة سميكة من الذهب عيار 18 | مرصعة بحجر الأونيكس الطبيعي المصقول | علبة فاخرة.',
    price: 210.00,
    original_price: 280.00,
    stock_quantity: 25,
    sizes: ['مقاس موحد'],
    colors: ['#d97706', '#000000'],
    images: [
      'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=900&q=80'
    ],
    is_featured: true,
    is_bestseller: false,
    rating: 4.9,
    reviews_count: 27
  }
];

class ProductsStore {
  constructor() {
    this.products = [...initialFallbackProducts];
    this.categories = [
      { id: 'all', name: 'كافة المنتجات', slug: 'all' },
      { id: 'suits', name: 'بدلات رسمية', slug: 'suits', icon: 'fa-user-tie' },
      { id: 'shirts', name: 'قمصان فاخرة', slug: 'shirts', icon: 'fa-shirt' },
      { id: 'pants', name: 'بناطيل رجالية', slug: 'pants', icon: 'fa-person' },
      { id: 'accessories', name: 'إكسسوارات وأحذية', slug: 'accessories', icon: 'fa-gem' }
    ];
    this.isBackendOnline = false;
  }

  // محاولة الجلب من الـ Backend API، وفي حال عدم التوفر نستخدم البيانات المحلية
  async init() {
    try {
      const res = await fetch(`${API_BASE}/products`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.products && data.products.length > 0) {
          this.products = data.products;
          this.isBackendOnline = true;
          console.log('⚡ متصل بالخادم الخلفي (Backend Connected)');
        }
      }
    } catch (err) {
      console.log('ℹ️ يعمل في النمط المستقل (Standalone Browser Mode)');
    }
    return this.products;
  }

  getAll() {
    return this.products;
  }

  getById(id) {
    return this.products.find(p => p.id === Number(id) || p.slug === id);
  }

  filterProducts({ category = 'all', search = '', minPrice = 0, maxPrice = Infinity, sort = 'popular', size = null }) {
    let result = [...this.products];

    // تصفية الفئة
    if (category && category !== 'all') {
      result = result.filter(p => p.category_slug === category);
    }

    // تصفية البحث
    if (search && search.trim() !== '') {
      const term = search.trim().toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term)
      );
    }

    // تصفية السعر
    result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);

    // تصفية المقاس
    if (size) {
      result = result.filter(p => p.sizes && p.sizes.includes(size));
    }

    // الفرز
    switch (sort) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'popular':
      default:
        result.sort((a, b) => (b.reviews_count || 0) - (a.reviews_count || 0));
        break;
    }

    return result;
  }
}

window.productsStore = new ProductsStore();
