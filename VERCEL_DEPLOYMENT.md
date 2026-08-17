# 🚀 Deploy Lên Vercel - Hướng Dẫn Đầy Đủ

## 📋 Tổng Quan

Hướng dẫn deploy landing page Tiếng Trung Tuệ Lâm lên Vercel với Telegram Bot integration.

---

## 🔧 Bước 1: Chuẩn Bị Environment Variables

### Danh Sách Environment Variables Cần Thiết

```bash
# ========================================
# EMAIL SERVICE
# ========================================
RESEND_API_KEY=re_your_api_key_here
ADMIN_EMAIL=infor@tiengtrungtuelam.vn
FROM_EMAIL=onboarding@resend.dev

# Hoặc dùng Gmail (nếu không dùng Resend)
# GMAIL_USER=your-email@gmail.com
# GMAIL_APP_PASSWORD=your-16-char-app-password

# ========================================
# TELEGRAM BOT
# ========================================
TELEGRAM_BOT_TOKEN=8695432862:AAG5Vuufy9pbSP6MFW4DOXSZ_ti3KuTrNBY
TELEGRAM_CHAT_ID=-5215723822

# ========================================
# ADMIN DASHBOARD
# ========================================
ADMIN_PASSWORD=admin123
```

---

## 🌐 Bước 2: Deploy Lên Vercel

### Option A: Deploy qua Vercel Dashboard (Khuyến nghị)

#### 1. Đăng Nhập Vercel

1. Truy cập: https://vercel.com
2. Đăng nhập bằng GitHub account
3. Click **"Add New Project"**

#### 2. Import Repository

1. Chọn repository: `nextjs.landing-page-projects`
2. Click **"Import"**

#### 3. Configure Project

**Framework Preset:** Next.js (tự động phát hiện)

**Root Directory:** `./` (default)

**Build Command:** `npm run build` (default)

**Output Directory:** `.next` (default)

#### 4. Thêm Environment Variables

**⚠️ QUAN TRỌNG:** Phải thêm đầy đủ environment variables trước khi deploy!

1. Trong màn hình **"Configure Project"**
2. Mở rộng phần **"Environment Variables"**
3. Thêm từng biến một:

| Key | Value | Environment |
|-----|-------|-------------|
| `RESEND_API_KEY` | `re_your_api_key_here` | Production |
| `ADMIN_EMAIL` | `infor@tiengtrungtuelam.vn` | Production |
| `FROM_EMAIL` | `onboarding@resend.dev` | Production |
| `TELEGRAM_BOT_TOKEN` | `8695432862:AAG5Vuufy9pbSP6MFW4DOXSZ_ti3KuTrNBY` | Production |
| `TELEGRAM_CHAT_ID` | `-5215723822` | Production |
| `ADMIN_PASSWORD` | `admin123` | Production |

**Cách thêm:**
```
1. Key: TELEGRAM_BOT_TOKEN
2. Value: 8695432862:AAG5Vuufy9pbSP6MFW4DOXSZ_ti3KuTrNBY
3. Environment: Production ✓ (checked)
4. Click "Add"

Lặp lại cho tất cả các biến
```

#### 5. Deploy

1. Click **"Deploy"**
2. Đợi 2-5 phút
3. ✅ Done!

---

### Option B: Deploy qua Vercel CLI

#### 1. Cài Đặt Vercel CLI

```powershell
# Cài Vercel CLI global
npm install -g vercel

# Hoặc dùng npx (không cần cài)
npx vercel
```

#### 2. Login

```powershell
vercel login
```

#### 3. Deploy

```powershell
# Deploy lần đầu
vercel

# Hoặc deploy thẳng production
vercel --prod
```

#### 4. Thêm Environment Variables

```powershell
# Thêm từng biến
vercel env add TELEGRAM_BOT_TOKEN production
# Paste value: 8695432862:AAG5Vuufy9pbSP6MFW4DOXSZ_ti3KuTrNBY

vercel env add TELEGRAM_CHAT_ID production
# Paste value: -5215723822

vercel env add ADMIN_EMAIL production
# Paste value: infor@tiengtrungtuelam.vn

# ... (lặp lại cho tất cả biến)
```

#### 5. Redeploy

```powershell
# Sau khi add env, deploy lại
vercel --prod
```

---

## 🔐 Bước 3: Thêm/Sửa Environment Variables Sau Khi Deploy

### Qua Vercel Dashboard (Dễ nhất)

1. Vào: https://vercel.com/dashboard
2. Chọn project của bạn
3. Vào tab **"Settings"**
4. Sidebar: Click **"Environment Variables"**

#### Thêm Biến Mới

1. **Key:** `TELEGRAM_BOT_TOKEN`
2. **Value:** `8695432862:AAG5Vuufy9pbSP6MFW4DOXSZ_ti3KuTrNBY`
3. **Environment:**
   - ✅ **Production** (bắt buộc)
   - ✅ Preview (tùy chọn)
   - ✅ Development (tùy chọn)
4. Click **"Add"** hoặc **"Save"**

#### Sửa Biến Đã Có

1. Tìm biến cần sửa trong danh sách
2. Click nút **"Edit"** (icon bút chì)
3. Sửa Value
4. Click **"Save"**

#### Xóa Biến

1. Tìm biến cần xóa
2. Click nút **"Remove"** (icon thùng rác)
3. Confirm

### Qua Vercel CLI

```powershell
# List tất cả env vars
vercel env ls

# Thêm mới
vercel env add VARIABLE_NAME production

# Remove
vercel env rm VARIABLE_NAME production

# Pull về local (để test)
vercel env pull .env.local
```

---

## 🔄 Bước 4: Redeploy Sau Khi Thay Đổi Env

**⚠️ QUAN TRỌNG:** Sau khi thêm/sửa environment variables, BẮT BUỘC phải redeploy!

### Option 1: Trigger Redeploy Qua Dashboard

1. Vào project dashboard
2. Tab **"Deployments"**
3. Click vào deployment mới nhất
4. Click **"Redeploy"** (nút 3 chấm)
5. Confirm

### Option 2: Redeploy Qua CLI

```powershell
vercel --prod
```

### Option 3: Push Code Mới

```powershell
git add .
git commit -m "Update config"
git push origin main

# Vercel tự động redeploy
```

---

## 📸 Screenshot Guide

### 1. Environment Variables Tab

```
┌─────────────────────────────────────────┐
│ Settings                                 │
├─────────────────────────────────────────┤
│ General                                  │
│ Domains                                  │
│ ► Environment Variables      ← Click    │
│ Git                                      │
│ Functions                                │
└─────────────────────────────────────────┘
```

### 2. Add Environment Variable

```
┌──────────────────────────────────────────────────┐
│ Add Environment Variable                          │
├──────────────────────────────────────────────────┤
│ Key:   [TELEGRAM_BOT_TOKEN________________]      │
│                                                   │
│ Value: [8695432862:AAG5Vuufy9pbSP6MFW...]       │
│        [Show Value]                              │
│                                                   │
│ Environment:                                      │
│ ☑ Production                                     │
│ ☐ Preview                                        │
│ ☐ Development                                    │
│                                                   │
│        [Cancel]  [Add] ← Click                   │
└──────────────────────────────────────────────────┘
```

### 3. Environment Variables List

```
┌───────────────────────────────────────────────────┐
│ Environment Variables                              │
├───────────────────────────────────────────────────┤
│ TELEGRAM_BOT_TOKEN                                │
│ 8695432862:AAG5... (hidden)      [Edit] [Remove]│
│ Production, Preview                               │
│                                                   │
│ TELEGRAM_CHAT_ID                                  │
│ -5215723822                       [Edit] [Remove]│
│ Production, Preview                               │
│                                                   │
│ ADMIN_EMAIL                                       │
│ infor@tiengtrung... (hidden)      [Edit] [Remove]│
│ Production                                        │
└───────────────────────────────────────────────────┘
```

---

## ✅ Bước 5: Verify Deployment

### 1. Kiểm Tra Build Success

1. Vào **"Deployments"** tab
2. Deployment status: **"Ready"** ✅
3. Nếu **"Failed"** ❌ → Click vào xem log

### 2. Test Landing Page

```
https://your-project-name.vercel.app/tieng-trung-tue-lam
```

**Checklist:**
- [ ] Page load thành công
- [ ] CSS/images hiển thị đúng
- [ ] Form đăng ký hiển thị
- [ ] Click "Đăng Ký Học Thử" → Modal mở

### 3. Test Form Submission

**Điền form test:**
- Họ tên: Test Production
- Email: test@production.com
- SĐT: 0931593386
- Trình độ: Chưa biết gì
- Khóa học: HSK 1-6
- Ghi chú: Test từ Vercel production

**Click Submit**

**Verify:**
- [ ] Form submit thành công
- [ ] Success message hiển thị
- [ ] Email đến admin inbox ✉️
- [ ] Telegram message trong nhóm 📱
- [ ] Record trong database (xem admin dashboard)

### 4. Test Admin Dashboard

```
https://your-project-name.vercel.app/admin/registrations
Password: admin123
```

- [ ] Login thành công
- [ ] Thấy danh sách registrations
- [ ] Test registration hiển thị

---

## 🐛 Troubleshooting

### Issue 1: Build Failed

**Lỗi:** `Error: Missing environment variables`

**Fix:**
1. Vào Settings → Environment Variables
2. Đảm bảo tất cả biến đã được thêm
3. Check "Production" environment
4. Redeploy

### Issue 2: Telegram Không Gửi

**Lỗi:** Form submit thành công nhưng không có message Telegram

**Debug:**

1. **Check Environment Variables:**
   ```
   Settings → Environment Variables
   - TELEGRAM_BOT_TOKEN: ✓
   - TELEGRAM_CHAT_ID: ✓
   ```

2. **Check Runtime Logs:**
   ```
   Deployments → [Latest] → Functions
   → View logs
   → Tìm "Telegram notification"
   ```

3. **Test Manually:**
   ```
   https://your-project.vercel.app/api/telegram/test
   ```

**Common Fixes:**
- Bot token sai → Update env
- Chat ID sai → Verify với `.\test-telegram.ps1`
- Bot chưa vào nhóm production → Add bot

### Issue 3: Database Not Working

**Lỗi:** `SQLITE_CANTOPEN` hoặc database errors

**Giải pháp:**

Vercel sử dụng **serverless functions** → không thể dùng SQLite file-based.

**Option A: Dùng Vercel Postgres (Khuyến nghị)**

1. Install Vercel Postgres:
   ```powershell
   npm install @vercel/postgres
   ```

2. Vercel Dashboard → Storage → Create Database

3. Update `lib/db.ts` để dùng Postgres

**Option B: Dùng External Database**

- Supabase (free tier)
- PlanetScale (free tier)
- Railway Postgres
- Neon Database

**Option C: Keep SQLite for Development Only**

- Production: Chỉ gửi email + Telegram
- Không lưu database
- Hoặc gửi data đến external API/service

---

## 🔐 Security Best Practices

### 1. Environment Variables

**✅ DO:**
- Tạo bot riêng cho production
- Sử dụng nhóm Telegram riêng cho production
- Change `ADMIN_PASSWORD` thành mật khẩu mạnh
- Add `.env.local` vào `.gitignore`

**❌ DON'T:**
- Commit `.env.local` lên Git
- Share bot token công khai
- Dùng chung bot dev/production
- Để admin password mặc định

### 2. Bot Token Security

**Nếu bot token bị leak:**

1. Revoke token qua @BotFather
2. Tạo token mới
3. Update Vercel env vars
4. Redeploy

### 3. Group Chat ID

**Production Group:**
- Tạo nhóm Telegram riêng cho production
- Đừng dùng chung với dev/test
- Monitor messages thường xuyên

---

## 📊 Monitoring & Analytics

### 1. Vercel Analytics

**Enable:**
1. Project Settings → Analytics
2. Toggle ON
3. View dashboard

**Metrics:**
- Page views
- Form submissions
- API calls
- Response times

### 2. Check Logs

**Runtime Logs:**
```
Deployments → [Latest] → Functions
→ /api/register → View Logs
```

**Tìm:**
```
✅ Email sent via Resend
✅ Telegram notification sent successfully
✅ Registration saved to database
```

### 3. Error Tracking

**Add Sentry (Optional):**

```powershell
npm install @sentry/nextjs
```

Configure in `next.config.js`

---

## 🚀 Production Checklist

### Pre-Deploy

- [ ] All environment variables added
- [ ] Production bot created
- [ ] Production Telegram group created
- [ ] Bot added to production group
- [ ] Admin password changed
- [ ] `.env.local` in `.gitignore`

### Post-Deploy

- [ ] Build successful
- [ ] Landing page loads
- [ ] Form submission works
- [ ] Email notification received
- [ ] Telegram notification received
- [ ] Admin dashboard accessible
- [ ] Custom domain configured (optional)

---

## 🌍 Custom Domain (Optional)

### Thêm Domain Riêng

1. **Mua domain** (Namecheap, GoDaddy, etc.)

2. **Add Domain vào Vercel:**
   ```
   Project → Settings → Domains
   → Add Domain
   → Input: tiengtrungtuelam.vn
   ```

3. **Configure DNS:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

4. **Wait for DNS propagation** (5-30 minutes)

5. **Auto SSL:** Vercel tự động cấp SSL certificate

---

## 📞 Support

### Vercel Resources

- Dashboard: https://vercel.com/dashboard
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

### Project Docs

- [README_TELEGRAM.md](README_TELEGRAM.md)
- [SETUP_COMPLETE.md](SETUP_COMPLETE.md)
- [TELEGRAM_SETUP.md](TELEGRAM_SETUP.md)

---

## 🎯 Quick Reference

### Environment Variables (Production)

```bash
TELEGRAM_BOT_TOKEN=8695432862:AAG5Vuufy9pbSP6MFW4DOXSZ_ti3KuTrNBY
TELEGRAM_CHAT_ID=-5215723822
ADMIN_EMAIL=infor@tiengtrungtuelam.vn
FROM_EMAIL=onboarding@resend.dev
RESEND_API_KEY=re_your_api_key_here
ADMIN_PASSWORD=admin123
```

### Deploy Commands

```powershell
# Deploy via CLI
vercel --prod

# Add env var
vercel env add VARIABLE_NAME production

# Pull env to local
vercel env pull .env.local

# View logs
vercel logs
```

### Useful Links

```
Production URL: https://your-project.vercel.app
Test API: https://your-project.vercel.app/api/telegram/test
Admin: https://your-project.vercel.app/admin/registrations
```

---

**🎊 Chúc bạn deploy thành công! 🎊**

---

*Last Updated: 2026-08-17*  
*Status: Ready for Production*
