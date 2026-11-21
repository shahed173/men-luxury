/**
 * متجر الأزياء الرجالية الفاخر - Products Module (الأردن - د.أ)
 * يحتوي على بيانات المنتجات ودوال الجلب والفلترة والفرز
 */

const API_BASE = '/api';

// قائمة المنتجات الافتراضية بأسعار الدينار الأردني (د.أ)
const initialFallbackProducts = [
  {
    id: 1,
    name: 'بدلة توكسيدو ملكية سوداء فاخرة',
    slug: 'royal-black-tuxedo-suit',
    category_slug: 'suits',
    category_name: 'بدلات رسمية',
    description: 'بدلة توكسيدو مصممة خصيصاً للمناسبات والاحتفالات الكبرى، مصنوعة من صوف الميرينو الفاخر بياقة ساتان إيطالي وتفصيل Slim-Fit فائق الدقة يمنحك حضوراً آسراً.',
    details: 'المادة: 95% صوف ميرينو ممتاز، 5% حرير ناعم | الياقة: ساتان لميع كلاسيكي | القصة: Slim Fit إيطالي | الغسيل: تنظيف جاف فقط.',
    price: 240.00,
    original_price: 295.00,
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
    details: 'المادة: 100% صوف نقي خفيف ومريح للتنفس | بطانة حريرية داخلية مقاومة للعرق | أزرار قرن طبيعي.',
    price: 185.00,
    original_price: 225.00,
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
    price: 195.00,
    original_price: 240.00,
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
    price: 42.00,
    original_price: 55.00,
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
    price: 38.00,
    original_price: 48.00,
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
  }
];
