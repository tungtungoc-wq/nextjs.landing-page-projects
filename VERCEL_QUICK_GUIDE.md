# 🚀 Vercel Deploy - Hướng Dẫn Nhanh 5 Phút

## 📋 Environment Variables Cần Copy

```bash
TELEGRAM_BOT_TOKEN=8695432862:AAG5Vuufy9pbSP6MFW4DOXSZ_ti3KuTrNBY
TELEGRAM_CHAT_ID=-5215723822
ADMIN_EMAIL=infor@tiengtrungtuelam.vn
FROM_EMAIL=onboarding@resend.dev
RESEND_API_KEY=re_your_api_key_here
ADMIN_PASSWORD=admin123
```

---

## 🎯 5 Bước Deploy

### Bước 1: Đăng Nhập Vercel

1. Vào: https://vercel.com
2. Click **"Sign Up"** hoặc **"Login"**
3. Chọn **"Continue with GitHub"**
4. Authorize Vercel

---

### Bước 2: Import Project

1. Click **"Add New"** → **"Project"**
2. Tìm repository: `nextjs.landing-page-projects`
3. Click **"Import"**

---

### Bước 3: Thêm Environment Variables

**Trong màn hình Configure Project:**

1. Mở rộng **"Environment Variables"** (click để expand)

2. **Thêm từng biến một:**

   **Biến 1:**
   ```
   Key:   TELEGRAM_BOT_TOKEN
   Value: 8695432862:AAG5Vuufy9pbSP6MFW4DOXSZ_ti3KuTrNBY
   ✓ Production
   ```

   **Biến 2:**
   ```
   Key:   TELEGRAM_CHAT_ID
   Value: -5215723822
   ✓ Production
   ```

   **Biến 3:**
   ```
   Key:   ADMIN_EMAIL
   Value: infor@tiengtrungtuelam.vn
   ✓ Production
   ```

   **Biến 4:**
   ```
   Key:   FROM_EMAIL
   Value: onboarding@resend.dev
   ✓ Production
   ```

   **Biến 5:**
   ```
   Key:   RESEND_API_KEY
   Value: re_your_api_key_here
   ✓ Production
   ```

   **Biến 6:**
   ```
   Key:   ADMIN_PASSWORD
   Value: admin123
   ✓ Production
   ```

3. **Click "Add"** sau mỗi biến

---

### Bước 4: Deploy

1. Click **"Deploy"** (nút lớn màu đen)
2. Đợi 2-5 phút
3. ✅ Xong!

---

### Bước 5: Test

**Khi build xong:**

1. Click **"Visit"** để mở site
2. Hoặc vào: `https://your-project-name.vercel.app`
3. Test form: `/tieng-trung-tue-lam`

---

## 📝 Chi Tiết Từng Biến

| Key | Giải Thích | Value Mẫu |
|-----|------------|-----------|
| `TELEGRAM_BOT_TOKEN` | Token bot từ @BotFather | `8695432862:AAG5...` |
| `TELEGRAM_CHAT_ID` | ID nhóm Telegram (số âm) | `-5215723822` |
| `ADMIN_EMAIL` | Email nhận thông báo | `infor@tiengtrungtuelam.vn` |
| `FROM_EMAIL` | Email người gửi | `onboarding@resend.dev` |
| `RESEND_API_KEY` | API key từ Resend.com | `re_...` |
| `ADMIN_PASSWORD` | Mật khẩu admin dashboard | `admin123` |

---

## 🔧 Sửa Environment Variables Sau Khi Deploy

### Cách 1: Qua Dashboard (Dễ nhất)

1. **Vào project dashboard**
   - https://vercel.com/dashboard
   - Click vào project của bạn

2. **Vào Settings → Environment Variables**
   ```
   Settings (tab top)
   → Environment Variables (sidebar left)
   ```

3. **Thêm/Sửa/Xóa biến**
   - Click **"Edit"** để sửa
   - Click **"Add"** để thêm mới
   - Click **"Remove"** để xóa

4. **⚠️ BẮT BUỘC: Redeploy**
   ```
   Deployments (tab top)
   → Click deployment mới nhất
   → ... (3 dots) → Redeploy
   ```

---

### Cách 2: Qua CLI

```powershell
# Install Vercel CLI (lần đầu)
npm install -g vercel

# Login
vercel login

# Add env var
vercel env add TELEGRAM_BOT_TOKEN production
# Paste: 8695432862:AAG5Vuufy9pbSP6MFW4DOXSZ_ti3KuTrNBY

# Redeploy
vercel --prod
```

---

## ✅ Checklist Deploy

**Before Deploy:**
- [ ] Đã có tất cả 6 environment variables
- [ ] Bot token đúng
- [ ] Chat ID đúng (số âm)

**During Deploy:**
- [ ] Click "Deploy"
- [ ] Đợi build xong (2-5 phút)
- [ ] Status: "Ready" ✅

**After Deploy:**
- [ ] Site loads: `https://your-project.vercel.app`
- [ ] Landing page OK: `/tieng-trung-tue-lam`
- [ ] Form hiển thị đúng
- [ ] Test submit form
- [ ] Check email notification
- [ ] Check Telegram notification

---

## 🧪 Test Production

### 1. Test API Endpoint

Mở browser:
```
https://your-project-name.vercel.app/api/telegram/test
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "bot": {
    "username": "Claude_code_aptech_bot",
    ...
  }
}
```

### 2. Test Form Đăng Ký

1. Mở: `https://your-project.vercel.app/tieng-trung-tue-lam`
2. Click **"Đăng Ký Học Thử Miễn Phí"**
3. Điền form:
   ```
   Họ tên: Test Production
   Email: test@production.com
   SĐT: 0931593386
   Trình độ: Chưa biết gì
   Khóa học: HSK 1-6
   Ghi chú: Test từ Vercel
   ```
4. Submit
5. ✅ Check nhóm Telegram!

### 3. Test Admin Dashboard

```
https://your-project.vercel.app/admin/registrations
Password: admin123
```

---

## ❗ Lỗi Thường Gặp

### Lỗi 1: Build Failed

**Nguyên nhân:** Thiếu environment variables

**Fix:**
1. Settings → Environment Variables
2. Add đầy đủ 6 biến
3. Check ✓ Production
4. Deployments → Redeploy

---

### Lỗi 2: Telegram Không Gửi

**Nguyên nhân:** Bot token/Chat ID sai hoặc bot không trong nhóm

**Fix:**
1. Verify bot token:
   ```
   Settings → Environment Variables
   → TELEGRAM_BOT_TOKEN
   → Edit → Check value
   ```

2. Verify chat ID:
   ```
   TELEGRAM_CHAT_ID = -5215723822
   Phải là số âm!
   ```

3. Check bot trong nhóm:
   - Mở Telegram
   - Vào nhóm production
   - Members → Tìm @Claude_code_aptech_bot
   - Nếu không có → Add bot vào

4. Redeploy sau khi fix

---

### Lỗi 3: Site Không Load

**Nguyên nhân:** Build error hoặc wrong configuration

**Fix:**
1. Vào Deployments tab
2. Click deployment có status "Failed"
3. Xem build logs
4. Fix lỗi
5. Push code hoặc redeploy

---

## 🔄 Update Code Sau Deploy

### Option 1: Push Git (Tự động deploy)

```powershell
git add .
git commit -m "Update feature"
git push origin main

# Vercel tự động detect & deploy
```

### Option 2: Manual Redeploy

```
Vercel Dashboard
→ Deployments
→ Latest deployment
→ ... (3 dots)
→ Redeploy
```

---

## 🌐 Custom Domain (Optional)

### Thêm Domain Riêng

1. **Mua domain** (VD: tiengtrungtuelam.vn)

2. **Add vào Vercel:**
   ```
   Project Settings
   → Domains
   → Add: tiengtrungtuelam.vn
   ```

3. **Configure DNS:**
   
   Vào nhà cung cấp domain (Namecheap, GoDaddy, etc.)
   
   **Add records:**
   ```
   Type: A
   Host: @
   Value: 76.76.21.21

   Type: CNAME
   Host: www
   Value: cname.vercel-dns.com
   ```

4. **Đợi 5-30 phút** (DNS propagation)

5. ✅ Done! Auto SSL

---

## 📞 Cần Giúp?

### Vercel Resources

- **Dashboard:** https://vercel.com/dashboard
- **Docs:** https://vercel.com/docs
- **Support:** https://vercel.com/support

### Project Docs

- **Chi tiết:** [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)
- **Telegram:** [README_TELEGRAM.md](README_TELEGRAM.md)

---

## 🎯 Quick Reference

### Production URLs

```bash
# Site
https://your-project-name.vercel.app

# Landing page
https://your-project-name.vercel.app/tieng-trung-tue-lam

# Test API
https://your-project-name.vercel.app/api/telegram/test

# Admin
https://your-project-name.vercel.app/admin/registrations
```

### CLI Commands

```powershell
# Deploy
vercel --prod

# View logs
vercel logs

# List env vars
vercel env ls

# Add env var
vercel env add KEY_NAME production
```

---

**🎉 Xong! Site đã online! 🎉**

---

*Time to complete: ~5 minutes*  
*Difficulty: ⭐⭐ (Easy)*
