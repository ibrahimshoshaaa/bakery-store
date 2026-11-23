# بكري | Bakery.com

واجهة متجر مخبز فاخرة بالعربية (RTL) — لاندنج بيج كاملة بتصميم دافئ مستوحى من
تصميم مرجعي، مبنية بـ **Next.js 16** و **React 19** و **Tailwind CSS 4**.

## المميزات

- عربي RTL بالكامل بخط Cairo (400–900)
- 11 قسم: شريط علوي + هيدر ثابت، هيرو بمنحنى مموّج وشريط برتقالي، شريط ثقة،
  منتجات، من نحن، آراء عملاء، معرض، لماذا تختارنا، مدونة، نشرة بريدية، فوتر
- سلة تسوق حقيقية (إضافة / زيادة / تقليل / حذف / المجموع + تأكيد طلب)
- مودال فيديو، بحث فوري في المنتجات، قائمة موبايل، توست تأكيد للنشرة البريدية
- 17 صورة مولّدة بأسلوب تصوير طعام دافئ + فيديو قصير للمخبز

## التشغيل

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # إنتاج — صفر أخطاء
npm run start
```

## التقنية

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (`@theme` tokens في `src/app/globals.css`)
- lucide-react للأيقونات (أيقونات السوشيال SVG مدمجة)
- الصور في `public/images/` والفيديو في `public/videos/`

## الألوان

| Token | Value |
| --- | --- |
| espresso | `#2B1409` |
| cocoa | `#3B1E0F` |
| caramel | `#E57A1F` |
| cream | `#FDF8F2` |
| ink | `#26150C` |
| muted | `#6B5B53` |
| border-warm | `#EFE5DA` |
