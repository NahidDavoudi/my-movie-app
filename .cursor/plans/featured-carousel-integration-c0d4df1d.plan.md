<!-- c0d4df1d-b86f-42e1-a817-fb7bb8e9d5b7 268016f4-0b39-470f-9c32-7395acad0b90 -->
# بازطراحی صفحه جزئیات با Layout جدید و Neumorphism

## هدف

بازطراحی کامل صفحه جزئیات فیلم/سریال با:

- Layout دو ستونه و ریسپانسیو
- استایل Neumorphism مطابق با تم سایت
- ساختار ماژولار برای توسعه آینده
- دکمه‌های دانلود پویا (کیفیت‌ها برای فیلم، فصل/اپیزود برای سریال)

## Layout جدید

### ردیف 1 (دو ستون):

- ستون چپ: اطلاعات فنی
- ستون راست: خلاصه داستان

### ردیف 2 (تمام عرض):

- بازیگران (horizontal scroll یا grid)

### ردیف 3 (دو ستون):

- ستون چپ: کامنت‌ها (از API، با fallback message)
- ستون راست: باکس دانلود
- فیلم: دکمه‌های کیفیت مختلف (1080p, 720p, 480p, etc.)
- سریال: دکمه‌های فصل و اپیزود

## مراحل

### 1. ایجاد کامپوننت‌های ماژولار

- `TechnicalInfo.tsx`: نمایش اطلاعات فنی
- `PlotSummary.tsx`: نمایش خلاصه داستان
- `CastSection.tsx`: نمایش بازیگران
- `CommentsSection.tsx`: نمایش کامنت‌ها با حالت خالی
- `DownloadBox.tsx`: دکمه‌های دانلود پویا

### 2. اعمال استایل Neumorphism

- `shadow-neumorphic-card` و سایر کلاس‌های neumorphic
- استفاده از `bg-surface`, `bg-background` با شفافیت
- Border subtle و inset shadows

### 3. Layout ریسپانسیو

- Grid 2-column برای desktop
- Stack برای mobile
- Horizontal scroll برای بازیگران در موبایل

### 4. منطق دانلود پویا

- Mock data برای کیفیت‌های مختلف فیلم
- Mock data برای فصل‌ها و اپیزودهای سریال
- UI مناسب برای هر کدام

## فایل‌های جدید

- `src/components/molecules/movie-detail/TechnicalInfo.tsx`
- `src/components/molecules/movie-detail/PlotSummary.tsx`
- `src/components/molecules/movie-detail/CastSection.tsx`
- `src/components/molecules/movie-detail/CommentsSection.tsx`
- `src/components/molecules/movie-detail/DownloadBox.tsx`

## فایل‌های تغییر

- `app/movies/[id]/page.tsx` - استفاده از کامپوننت‌های جدید

### To-dos

- [ ] ایجاد TechnicalInfo component
- [ ] ایجاد PlotSummary component
- [ ] ایجاد CastSection component
- [ ] ایجاد CommentsSection component با حالت خالی
- [ ] ایجاد DownloadBox component با منطق پویا
- [ ] بازنویسی movie detail page با layout جدید
- [ ] اعمال استایل Neumorphism بر همه components