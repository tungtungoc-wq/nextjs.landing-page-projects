# 📱 Telegram Bot Integration - Landing Page Tiếng Trung Tuệ Lâm

Tự động gửi thông báo đến nhóm Telegram khi có đăng ký học mới từ landing page.

---

## ⚡ Quick Start

### 1️⃣ Cài Đặt & Chạy

```bash
# Install dependencies (nếu chưa)
npm install

# Chạy dev server
npm run dev
```

### 2️⃣ Thêm Bot Vào Nhóm Telegram

**Bot Username:** `@Claude_code_aptech_bot`

**Cách thêm:**
1. Mở Telegram
2. Tìm: `@Claude_code_aptech_bot`
3. Vào nhóm của bạn → **Add Members**
4. Chọn bot → **Add**
5. Cấp quyền **"Post Messages"**

### 3️⃣ Test Kết Nối

**Cách 1: Dùng PowerShell Script (Khuyến nghị)**

```powershell
# Test bot configuration
.\test-telegram.ps1

# Gửi test message
.\test-telegram.ps1 -SendTest

# Gửi custom message
.\test-telegram.ps1 -SendTest -Message "Hello!"
```

**Cách 2: Dùng Browser**

Mở: http://localhost:3000/api/telegram/test

**Cách 3: Dùng curl**

```bash
# Check bot config
curl http://localhost:3000/api/telegram/test

# Send test message
curl -X POST http://localhost:3000/api/telegram/test \
  -H "Content-Type: application/json" \
  -d '{}'
```

### 4️⃣ Test Form Đăng Ký

1. Mở: http://localhost:3000/tieng-trung-tue-lam
2. Click **"Đăng Ký Học Thử Miễn Phí"**
3. Điền thông tin test
4. Submit
5. ✅ Kiểm tra nhóm Telegram!

---

## 📋 Form Đăng Ký

### Các Trường Form

**Bắt buộc:**
- ✅ Họ và Tên
- ✅ Email
- ✅ Số điện thoại (10-11 số)

**Tùy chọn:**
- Trình độ HSK hiện tại
- Khóa học quan tâm (HSK 1-6, Giao Tiếp, Thương Mại, Công Xưởng)
- Nội dung cần tư vấn

### Loại Đăng Ký

- 🎁 **Học Thử Miễn Phí** (trial)
- 🎓 **Đăng Ký Khóa Học** (full)

---

## 🎨 Format Thông Báo Telegram

```
🎓 ĐĂNG KÝ KHÓA HỌC
━━━━━━━━━━━━━━━━━━━━

👤 Học viên: Nguyễn Văn A
📧 Email: email@example.com
📱 SĐT: 0931593386
📊 Trình độ: Chưa biết gì
📚 Khóa học: HSK 1-6

💬 Ghi chú:
Tôi muốn học tiếng Trung từ đầu

⏰ 17/08/2026, 10:30:45
━━━━━━━━━━━━━━━━━━━━
🌐 Tiếng Trung Tuệ Lâm
```

---

## 🔧 Cấu Hình

### Environment Variables (`.env.local`)

```bash
# Telegram Bot Token (từ @BotFather)
TELEGRAM_BOT_TOKEN=8695432862:AAG5Vuufy9pbSP6MFW4DOXSZ_ti3KuTrNBY

# Chat ID (nhóm Telegram, số âm)
TELEGRAM_CHAT_ID=-8814485779
```

### Bot Information

- **Bot ID:** 8695432862
- **Username:** @Claude_code_aptech_bot
- **Name:** Claude_code_aptech_bot
- **Link:** https://t.me/Claude_code_aptech_bot

---

## 📂 Cấu Trúc Code

```
├── lib/telegram.ts              # Telegram functions
├── app/api/
│   ├── register/route.ts        # Registration API (với Telegram)
│   └── telegram/test/route.ts   # Test endpoint
├── .env.local                   # Environment variables
└── test-telegram.ps1            # Test script
```

### Key Functions

**`lib/telegram.ts`:**
- `sendTelegramMessage()` - Gửi message cơ bản
- `formatRegistrationMessage()` - Format HTML message
- `sendRegistrationNotification()` - Gửi thông báo đăng ký
- `testTelegramConnection()` - Test bot connection

**`app/api/register/route.ts`:**
- Validate form data
- Save to database
- Send email notification
- **Send Telegram notification** ← NEW
- Return response with notification status

---

## 🔄 Workflow

```
User Submit Form
    ↓
POST /api/register
    ↓
Validate & Save DB
    ↓
┌─────────────────┬──────────────────┐
│  Send Email     │  Send Telegram   │
│  (Resend/Gmail) │  (Bot API)       │
└─────────────────┴──────────────────┘
    ↓
Return Response
    ↓
Show Success/Error Message
```

---

## ❗ Troubleshooting

### Lỗi: "chat not found"

**Nguyên nhân:** Bot chưa được thêm vào nhóm

**Giải pháp:**
1. Thêm bot `@Claude_code_aptech_bot` vào nhóm
2. Cấp quyền "Post Messages"
3. Test lại

### Lỗi: "Forbidden: bot was blocked by the user"

**Nguyên nhân:** Bot bị kick khỏi nhóm

**Giải pháp:**
1. Thêm lại bot vào nhóm
2. Không kick bot ra nếu muốn nhận thông báo

### Lỗi: "TELEGRAM_BOT_TOKEN not configured"

**Nguyên nhân:** File `.env.local` chưa có bot token

**Giải pháp:**
1. Kiểm tra file `.env.local`
2. Đảm bảo có dòng: `TELEGRAM_BOT_TOKEN=...`
3. Restart dev server

### Bot không gửi được tin nhắn?

**Checklist:**
- [ ] Bot đã được thêm vào nhóm?
- [ ] Bot có quyền "Post Messages"?
- [ ] Chat ID đúng? (nhóm phải là số âm)
- [ ] Bot token đúng?
- [ ] Dev server đang chạy?

---

## 📖 Documentation

### Chi Tiết

- **TELEGRAM_SETUP.md** - Hướng dẫn cấu hình đầy đủ từ A-Z
- **QUICK_START.md** - Fix lỗi "chat not found" nhanh
- **FORM_REGISTRATION.md** - Chi tiết về form đăng ký
- **TELEGRAM_INTEGRATION_SUMMARY.md** - Tóm tắt tích hợp

### API Endpoints

#### `GET /api/telegram/test`
Kiểm tra bot configuration

**Response:**
```json
{
  "success": true,
  "bot": { "id": 8695432862, "username": "..." },
  "config": { "chat_id": "-8814485779" }
}
```

#### `POST /api/telegram/test`
Gửi test message

**Request:**
```json
{
  "message": "Test message",  // optional
  "chat_id": "-8814485779"    // optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Tin nhắn test đã được gửi thành công!"
}
```

#### `POST /api/register`
Đăng ký học (có Telegram notification)

**Request:**
```json
{
  "name": "Nguyễn Văn A",
  "email": "test@example.com",
  "phone": "0931593386",
  "level": "zero",
  "course": "hsk",
  "message": "..."
}
```

**Response:**
```json
{
  "success": true,
  "notifications": {
    "email": true,
    "telegram": true
  }
}
```

---

## 🔐 Security

**⚠️ QUAN TRỌNG:**

1. **KHÔNG commit** `.env.local` lên Git
2. Bot token phải giữ bí mật
3. Sử dụng bot khác cho production
4. Chỉ cấp quyền tối thiểu cho bot

---

## 🚀 Production Deployment

### Vercel / Railway / Render

**Environment Variables cần thêm:**

```
TELEGRAM_BOT_TOKEN=your_production_bot_token
TELEGRAM_CHAT_ID=your_production_chat_id
```

**Best Practice:**
- Tạo bot riêng cho production
- Sử dụng nhóm Telegram riêng cho production
- Monitor notification logs

---

## 🎯 Tóm Tắt

✅ **Bot đã được cấu hình**
- Token: ✓
- Chat ID: ✓
- Code: ✓
- Docs: ✓

❗ **Cần làm:**
1. Thêm bot vào nhóm Telegram
2. Test với script: `.\test-telegram.ps1 -SendTest`
3. Test form đăng ký thật

🎉 **Sau đó mọi thứ tự động!**

---

## 💡 Tips

- Dùng emoji trong message để dễ phân biệt
- Format HTML đẹp hơn Markdown
- Log error để debug dễ dàng
- Test trước khi deploy production

---

## 📞 Support

Nếu gặp vấn đề:
1. Đọc `QUICK_START.md`
2. Chạy `.\test-telegram.ps1`
3. Kiểm tra console log
4. Đảm bảo bot đã được thêm vào nhóm

---

**Happy Coding! 🚀**

*Created by Claude Code - 2026-08-17*
