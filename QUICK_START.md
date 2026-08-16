# 🚀 Quick Start - Cấu Hình Telegram Bot

## ❗ Lỗi "chat not found"

Nếu bạn gặp lỗi này, có nghĩa bot chưa được thêm vào nhóm Telegram.

---

## 📋 Các Bước Cấu Hình (5 phút)

### Bước 1: Tìm Bot của bạn

Bot username: **@Claude_code_aptech_bot**

Hoặc tìm bằng link: https://t.me/Claude_code_aptech_bot

### Bước 2: Thêm Bot vào Nhóm

#### Cách 1: Qua App Telegram

1. Mở nhóm Telegram của bạn (ID: `-8814485779`)
2. Nhấn vào tên nhóm ở đầu màn hình
3. Chọn **"Add Members"** hoặc **"Thêm thành viên"**
4. Tìm: `@Claude_code_aptech_bot`
5. Nhấn **Add** để thêm bot vào nhóm

#### Cách 2: Qua Link

1. Mở link này: https://t.me/Claude_code_aptech_bot
2. Nhấn **Start** để bắt đầu chat với bot
3. Trong nhóm của bạn, nhấn **Add Members**
4. Chọn bot từ danh sách

### Bước 3: Cấp Quyền cho Bot (Tùy chọn)

Bot cần quyền gửi tin nhắn. Có 2 cách:

#### Option A: Bot làm Admin (Khuyến nghị)

1. Trong nhóm, nhấn vào tên nhóm
2. Chọn **Administrators** hoặc **Quản trị viên**
3. Nhấn **Add Administrator**
4. Chọn `@Claude_code_aptech_bot`
5. Chỉ cần bật quyền: **"Post Messages"** hoặc **"Gửi tin nhắn"**
6. Các quyền khác có thể tắt
7. Nhấn **Save**

#### Option B: Group Không Hạn Chế

Nếu không muốn bot làm admin:

1. Nhấn vào tên nhóm → **Edit** → **Permissions**
2. Đảm bảo **"Send Messages"** được bật cho **"All Members"**
3. Bot sẽ gửi được tin nhắn như một thành viên bình thường

---

## ✅ Bước 4: Test Lại

Sau khi thêm bot vào nhóm, test lại:

### Test qua PowerShell

```powershell
$body = @{} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/telegram/test" -Method POST -Body $body -ContentType "application/json"
```

### Test qua Browser

Hoặc dùng công cụ như Postman:
- URL: `http://localhost:3000/api/telegram/test`
- Method: `POST`
- Body: `{}`

### Kết quả mong đợi

Nếu thành công, bạn sẽ thấy:
```json
{
  "success": true,
  "message": "Tin nhắn test đã được gửi thành công!",
  "result": { ... }
}
```

Và trong nhóm Telegram sẽ có tin nhắn test từ bot! 🎉

---

## 🧪 Bước 5: Test Form Đăng Ký

1. Mở landing page: http://localhost:3000/tieng-trung-tue-lam
2. Nhấn nút **"Đăng Ký Học Thử Miễn Phí"**
3. Điền thông tin:
   ```
   Họ tên: Nguyễn Văn Test
   Email: test@example.com
   SĐT: 0931593386
   Trình độ: Chưa biết gì
   Khóa học: HSK 1-6
   Ghi chú: Test từ form đăng ký
   ```
4. Nhấn **"Đăng Ký Ngay"**
5. Kiểm tra nhóm Telegram → sẽ thấy thông báo đẹp mắt! ✨

---

## 🔧 Khắc Phục Sự Cố

### Bot đã thêm vào nhóm nhưng vẫn lỗi?

**Kiểm tra Chat ID:**

1. Trong nhóm, forward một tin nhắn bất kỳ đến bot: @userinfobot
2. Bot sẽ trả về thông tin chat, bao gồm Chat ID
3. Đảm bảo Chat ID là số âm (ví dụ: `-8814485779`)
4. Cập nhật lại trong file `.env.local`:
   ```bash
   TELEGRAM_CHAT_ID=-8814485779
   ```
5. Restart dev server

### Bot bị kick khỏi nhóm?

- Thêm lại bot như Bước 2
- Đảm bảo bot có quyền như Bước 3

### Vẫn không hoạt động?

Kiểm tra log trong terminal:
```powershell
# Xem console log của dev server
# Sẽ có message:
# ✅ Telegram notification sent successfully
# hoặc
# ❌ Telegram notification failed: [error details]
```

---

## 📊 Cấu Trúc Tin Nhắn

Khi có đăng ký mới, bot sẽ gửi tin nhắn như sau:

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

## 🎯 Tóm Tắt Checklist

- [ ] Thêm bot `@Claude_code_aptech_bot` vào nhóm
- [ ] Cấp quyền "Post Messages" cho bot
- [ ] Test API endpoint: `POST /api/telegram/test`
- [ ] Thấy tin nhắn test trong nhóm
- [ ] Test form đăng ký trên landing page
- [ ] Thấy thông báo đăng ký mới trong nhóm

---

## 🆘 Cần Giúp Đỡ?

Nếu vẫn gặp vấn đề:

1. **Kiểm tra Bot Token**
   ```bash
   # File .env.local
   TELEGRAM_BOT_TOKEN=8695432862:AAG5Vuufy9pbSP6MFW4DOXSZ_ti3KuTrNBY
   ```

2. **Kiểm tra Chat ID**
   ```bash
   # File .env.local
   TELEGRAM_CHAT_ID=-8814485779
   ```

3. **Restart Dev Server**
   ```powershell
   # Ctrl+C để stop server
   npm run dev
   ```

4. **Xem Console Log**
   - Mở terminal đang chạy `npm run dev`
   - Xem log khi submit form
   - Tìm dòng có `✅` hoặc `❌` về Telegram

---

**Chúc bạn cấu hình thành công! 🎉**

Sau khi hoàn tất, mọi đăng ký mới từ landing page sẽ tự động gửi thông báo về nhóm Telegram của bạn.
