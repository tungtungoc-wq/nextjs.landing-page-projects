# Landing Page Improvements - Hướng dẫn áp dụng

## ✅ Đã hoàn thành:

### 1. Font "Be Vietnam Pro"
- ✅ Đã tạo layout riêng cho trang tieng-trung-tue-lam
- ✅ Import font với weights: 400, 500, 600, 700, 800
- ✅ Hỗ trợ tiếng Việt đầy đủ

### 2. Custom CSS Classes
Đã thêm vào `globals.css`:
- `.btn-primary` - Nút với hover effect scale + shadow
- `.card-hover` - Card với hover translateY + border
- `.link-underline` - Link với underline slide animation
- `.icon-hover` - Icon scale + màu cam
- `.heading-primary`, `.heading-secondary` - Typography
- `.body-text` - Text với line-height 1.75
- `.section-padding` - Padding responsive
- `.card-grid` - Grid với gap responsive

### 3. Intersection Observer
- ✅ Đã thêm useEffect cho scroll animations
- ✅ Tự động thêm class `animate__animated` khi element visible
- ✅ Sử dụng attribute `data-animation` để định nghĩa animation

## 📋 Cần áp dụng thủ công:

### Cách sử dụng animations:

#### Section Headings:
```jsx
<h2 
  className="heading-secondary text-4xl mb-6"
  data-animation="animate__fadeInUp"
>
  Tiêu đề
</h2>
```

#### Cards (stagger effect):
```jsx
{items.map((item, index) => (
  <div 
    key={index}
    className="card-hover"
    data-animation="animate__fadeInUp"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {/* Card content */}
  </div>
))}
```

#### Buttons:
```jsx
<button className="btn-primary bg-blue-600 hover:bg-blue-700 ...">
  Đăng Ký
</button>
```

#### Navigation Links:
```jsx
<a className="link-underline">Menu Item</a>
```

#### Icons:
```jsx
<Phone className="icon-hover w-6 h-6" />
```

### Spacing Guidelines:

#### Desktop (lg):
- Section padding: `py-32`
- Card gap: `gap-8`
- Container max-width: `max-w-7xl`

#### Tablet (md):
- Section padding: `py-24`
- Card gap: `gap-6`

#### Mobile:
- Section padding: `py-20`
- Card gap: `gap-4`

### Colors (màu cam chủ đạo):
- Primary: `#EF6B33` (cam)
- Hover: `#DF6B33` (cam đậm)
- Blue: `#3B82F6` (xanh hiện tại)

## 🚀 Next Steps:

1. Áp dụng `data-animation` cho tất cả sections
2. Thay thế các button với class `btn-primary`
3. Thêm `card-hover` cho tất cả cards
4. Cập nhật navigation links với `link-underline`
5. Test responsive trên mobile, tablet, desktop

## 📝 Ví dụ section hoàn chỉnh:

```jsx
<section className="section-padding bg-slate-800/50" id="benefits">
  <div className="container mx-auto px-4">
    <h2 
      className="heading-secondary text-4xl text-center mb-12"
      data-animation="animate__fadeInUp"
    >
      Lợi Ích Khi Học
    </h2>
    
    <div className="card-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {benefits.map((item, index) => (
        <div 
          key={index}
          className="card-hover bg-white/10 p-6 rounded-xl"
          data-animation="animate__fadeInUp"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <item.icon className="icon-hover w-10 h-10 mb-4 text-blue-400" />
          <h3 className="heading-secondary text-lg mb-2">{item.title}</h3>
          <p className="body-text text-sm text-gray-400">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```
