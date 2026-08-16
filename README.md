# 🎓 Tiếng Trung Tuệ Lâm - Landing Page & Registration System

Full-stack Next.js landing page với hệ thống đăng ký học viên tự động.

## ✨ Features

### 🎨 Frontend
- ✅ Landing page chuyên nghiệp với 10 sections
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth scroll animations với Intersection Observer
- ✅ Hover effects (300ms transitions)
- ✅ Modal form đăng ký với validation
- ✅ Loading states & success/error messages
- ✅ Custom SVG logo với chữ Hán
- ✅ Floating Zalo chat button
- ✅ Real testimonial images

### ⚙️ Backend
- ✅ REST API endpoint (`/api/register`)
- ✅ Form validation (email, phone, required fields)
- ✅ SQLite database để lưu registrations
- ✅ Dual email service (Resend + Gmail fallback)
- ✅ Beautiful HTML email templates
- ✅ Error handling & logging

### 📊 Admin Dashboard
- ✅ Admin panel tại `/admin/registrations`
- ✅ Password protection (Basic Auth)
- ✅ Statistics cards (today, week, month, total)
- ✅ View all registrations
- ✅ Delete registrations
- ✅ Export to CSV
- ✅ Real-time refresh

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Pages
- **Landing Page**: http://localhost:3000/tieng-trung-tue-lam
- **Admin Dashboard**: http://localhost:3000/admin/registrations

### 4. Test Registration
1. Click "Đăng Ký Ngay" button
2. Fill out form
3. Submit → Data saved to SQLite database!
4. View registrations in Admin Dashboard (password: `admin123`)

## 📧 Email Setup (Optional)

Đã có **3 options** để gửi email:

### Option 1: Không cần setup gì (Mặc định) ✅
- ✅ Registrations vẫn được lưu vào database
- ✅ Xem được trong Admin Dashboard
- ✅ Export CSV
- ❌ Không gửi email tự động

### Option 2: Resend (Recommended)
```env
RESEND_API_KEY=re_your_key_here
```
- 100 emails/ngày miễn phí
- Hướng dẫn: [SETUP_EMAIL.md](SETUP_EMAIL.md)

### Option 3: Gmail SMTP (Fallback)
```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
```
- Unlimited emails
- Guide: https://support.google.com/accounts/answer/185833

## 🔐 Admin Dashboard

### Access
URL: http://localhost:3000/admin/registrations

### Default Password
```
admin123
```

### Change Password
Edit `.env.local`:
```env
ADMIN_PASSWORD=your_secure_password_here
```

### Features
- 📊 Statistics dashboard (total, today, week, month)
- 📋 View all registrations in table
- 🗑️ Delete individual registrations
- 📥 Export all data to CSV
- 🔄 Real-time refresh
- 📱 Responsive design

## 📂 Project Structure

```
.
├── app/
│   ├── tieng-trung-tue-lam/
│   │   ├── page.tsx              # Landing page
│   │   └── layout.tsx            # Be Vietnam Pro font
│   ├── admin/
│   │   └── registrations/
│   │       └── page.tsx          # Admin dashboard
│   └── api/
│       ├── register/
│       │   └── route.ts          # Registration API
│       └── admin/
│           └── registrations/
│               └── route.ts      # Admin API
├── lib/
│   └── db.ts                     # SQLite database utilities
├── data/
│   └── registrations.db          # SQLite database (auto-created)
├── public/
│   └── images/
│       └── testimonials/         # Student photos
├── .env.local                    # Environment variables
└── README.md                     # This file
```

## 🗄️ Database Schema

**Table**: `registrations`

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key (auto-increment) |
| name | TEXT | Họ và tên |
| email | TEXT | Email address |
| phone | TEXT | Số điện thoại |
| level | TEXT | Trình độ (optional) |
| course | TEXT | Khóa học quan tâm (optional) |
| message | TEXT | Ghi chú (optional) |
| created_at | DATETIME | Timestamp |
| ip_address | TEXT | IP của người đăng ký |
| user_agent | TEXT | Browser info |

## 🛠️ Tech Stack

- **Framework**: Next.js 16.3.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Animate.css
- **Database**: SQLite (better-sqlite3)
- **Email**: Resend, Nodemailer
- **Icons**: Lucide React
- **Fonts**: Be Vietnam Pro (Google Fonts)

## 📊 API Endpoints

### POST `/api/register`
Tạo registration mới

**Request Body**:
```json
{
  "name": "Nguyễn Văn A",
  "email": "email@example.com",
  "phone": "0931593386",
  "level": "beginner",
  "course": "hsk",
  "message": "Muốn tư vấn về HSK"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Đăng ký thành công!",
  "data": {
    "id": 1,
    "name": "Nguyễn Văn A",
    "email": "email@example.com",
    "phone": "0931593386"
  }
}
```

### GET `/api/admin/registrations`
Lấy danh sách registrations (requires auth)

**Headers**:
```
Authorization: Basic base64(:password)
```

**Query Params**:
- `action=stats` - Get statistics
- `limit=10` - Get recent N registrations

### DELETE `/api/admin/registrations?id=1`
Xóa registration (requires auth)

## 🧪 Testing

Test checklist: [TESTING.md](TESTING.md)

### Quick Test

1. **Test Landing Page**
   ```
   http://localhost:3000/tieng-trung-tue-lam
   ```

2. **Test Registration Form**
   - Click "Đăng Ký Ngay"
   - Fill: Name, Email, Phone
   - Submit → Should see success message

3. **Check Database**
   ```
   http://localhost:3000/admin/registrations
   Password: admin123
   ```
   Should see your registration!

4. **Export CSV**
   - Click "Xuất CSV" button
   - Open downloaded file
   - Should see your data

## 🌐 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Add Environment Variables** in Vercel Dashboard:
   ```
   ADMIN_PASSWORD=your_secure_password
   ADMIN_EMAIL=infor@tiengtrungtuelam.vn
   ```

4. **Note**: SQLite won't persist on Vercel (use PostgreSQL/MongoDB for production)

## 📝 Environment Variables

Copy `.env.local` and customize:

```env
# Email Service (optional - choose one)
RESEND_API_KEY=re_your_key_here           # Option 1: Resend
GMAIL_USER=your@gmail.com                  # Option 2: Gmail
GMAIL_APP_PASSWORD=16-char-password        # Option 2: Gmail

# General
ADMIN_EMAIL=infor@tiengtrungtuelam.vn     # Where to send notifications
FROM_EMAIL=onboarding@resend.dev          # From address
ADMIN_PASSWORD=admin123                    # Admin dashboard password (CHANGE THIS!)
```

## 🐛 Troubleshooting

### Registration form not working?
- Check console for errors
- Verify API route: http://localhost:3000/api/register
- Check database exists: `data/registrations.db`

### Admin dashboard shows empty?
- Submit a test registration first
- Check password: `admin123`
- Verify database has data

### Email not sending?
- ✅ It's OK! Registrations are still saved
- Add Resend or Gmail credentials to `.env.local`
- Restart server after adding env variables

### Database locked error?
- Close SQLite browser/editor
- Restart dev server

## 📞 Contact

**Tiếng Trung Tuệ Lâm**
- 📍 Chung Cư THT New City, Lai Xá, Hoài Đức, Hà Nội
- 📞 0931593386
- 📧 infor@tiengtrungtuelam.vn
- 💬 Zalo: https://zalo.me/0931593386

---

Made with ❤️ using Next.js & Claude Code
