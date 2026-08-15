# Next.js Landing Page Project

Dự án Next.js landing page được xây dựng với các công nghệ hiện đại và hỗ trợ đầy đủ tiếng Việt.

## Công nghệ sử dụng

- **Next.js 15** - Framework React với App Router và Server Components
- **TypeScript** - Hỗ trợ type-safe
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Bộ icon đẹp mắt với hơn 1000+ icons
- **Animate.css** - Thư viện animation CSS
- **Google Fonts** - Inter và Roboto Mono với hỗ trợ tiếng Việt

## Cài đặt

Dự án đã được khởi tạo sẵn với tất cả dependencies. Để chạy dự án:

```bash
npm run dev
```

Mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm start` - Chạy production server
- `npm run lint` - Kiểm tra code với ESLint

## Sử dụng Lucide Icons

```tsx
import { Heart, Star, Rocket } from "lucide-react";

export default function Component() {
  return (
    <div>
      <Heart className="w-6 h-6 text-red-500" />
      <Star className="w-6 h-6 text-yellow-500" />
      <Rocket className="w-6 h-6 text-blue-500" />
    </div>
  );
}
```

## Sử dụng Animate.css

```tsx
<div className="animate__animated animate__fadeIn">
  Nội dung với hiệu ứng fade in
</div>

<div className="animate__animated animate__bounce">
  Nội dung với hiệu ứng bounce
</div>
```

Xem thêm các hiệu ứng tại: [Animate.css Documentation](https://animate.style/)

## Tailwind CSS

Dự án sử dụng Tailwind CSS v4 (PostCSS plugin). Cấu hình đã được tối ưu với:
- Dark mode support
- Custom color variables
- Font family variables
- Responsive design

## Google Fonts

Dự án sử dụng:
- **Inter** - Font chính (sans-serif) với hỗ trợ Latin và Vietnamese
- **Roboto Mono** - Font monospace với hỗ trợ Latin và Vietnamese

Fonts được tối ưu tự động bởi Next.js với `font-display: swap`.

## Cấu trúc thư mục

```
nextjs.landing-page-projects/
├── app/
│   ├── layout.tsx          # Root layout với font và metadata
│   ├── page.tsx            # Trang chủ
│   └── globals.css         # Global styles và Tailwind
├── public/                 # Static assets
├── node_modules/
├── package.json
└── README.md
```

## Tùy chỉnh

### Thay đổi màu sắc

Chỉnh sửa file `app/globals.css`:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

### Thay đổi font

Chỉnh sửa file `app/layout.tsx`:

```tsx
import { Roboto, JetBrains_Mono } from "next/font/google";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
  display: "swap",
});
```

## Deploy

### Vercel (Khuyến nghị)

```bash
npm install -g vercel
vercel
```

### Build thủ công

```bash
npm run build
npm start
```

## Tài nguyên học tập

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [Animate.css](https://animate.style/)

## License

MIT
