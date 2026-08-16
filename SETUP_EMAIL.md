# 📧 Hướng Dẫn Setup Email Service

## Bước 1: Tạo Tài Khoản Resend

1. Truy cập [https://resend.com](https://resend.com)
2. Đăng ký tài khoản miễn phí (100 emails/ngày)
3. Xác thực email của bạn

## Bước 2: Lấy API Key

1. Đăng nhập vào Resend Dashboard
2. Vào **API Keys** trong menu bên trái
3. Click **Create API Key**
4. Đặt tên cho key (ví dụ: "Production") và chọn quyền "Sending access"
5. Copy API key (chỉ hiển thị 1 lần!)

## Bước 3: Cấu Hình `.env.local`

Mở file `.env.local` trong thư mục gốc và cập nhật:

```env
# Resend API Key (paste key vừa copy)
RESEND_API_KEY=re_abcd1234...

# Admin email nhận thông báo đăng ký
ADMIN_EMAIL=infor@tiengtrungtuelam.vn

# From email (mặc định dùng onboarding@resend.dev)
FROM_EMAIL=onboarding@resend.dev
```

## Bước 4: Verify Domain (Tùy chọn)

Để gửi email từ domain riêng (ví dụ: `noreply@tiengtrungtuelam.vn`):

1. Vào **Domains** trong Resend Dashboard
2. Click **Add Domain**
3. Nhập domain của bạn: `tiengtrungtuelam.vn`
4. Thêm DNS records (TXT, MX, CNAME) vào domain provider
5. Đợi verify (thường 5-15 phút)
6. Cập nhật `FROM_EMAIL` trong `.env.local`:
   ```env
   FROM_EMAIL=noreply@tiengtrungtuelam.vn
   ```

## Bước 5: Test

1. Khởi động dev server:
   ```bash
   npm run dev
   ```

2. Truy cập trang: `http://localhost:3000/tieng-trung-tue-lam`

3. Click "Đăng Ký Ngay" và điền form

4. Submit form → Check email tại `ADMIN_EMAIL`

## Troubleshooting

### Email không gửi được?

1. **Kiểm tra API Key**: Đảm bảo `RESEND_API_KEY` trong `.env.local` chính xác
2. **Xem console logs**: Mở terminal chạy `npm run dev` để xem logs
3. **Check Resend Dashboard**: Vào **Logs** để xem lịch sử gửi email
4. **Verify domain**: Nếu dùng custom domain, đảm bảo đã verify

### Lỗi "Invalid API Key"?

- API key sai hoặc đã bị xóa
- Tạo API key mới và cập nhật `.env.local`

### Email vào Spam?

- Nếu dùng `onboarding@resend.dev`: Bình thường với free tier
- **Giải pháp**: Verify domain riêng (Bước 4)

## Production Deployment

### Vercel/Netlify/Railway:

1. Vào **Environment Variables** trong dashboard
2. Thêm 3 biến:
   - `RESEND_API_KEY`
   - `ADMIN_EMAIL`
   - `FROM_EMAIL`

3. Redeploy website

## Nâng Cấp (Tùy Chọn)

Free tier (100 emails/ngày) đủ cho testing. Nếu cần nhiều hơn:

- **Pro Plan**: $20/tháng - 50,000 emails
- **Enterprise**: Contact sales

## Tài Liệu Resend

- [Resend Docs](https://resend.com/docs)
- [API Reference](https://resend.com/docs/api-reference/introduction)
- [Domain Setup Guide](https://resend.com/docs/dashboard/domains/introduction)
