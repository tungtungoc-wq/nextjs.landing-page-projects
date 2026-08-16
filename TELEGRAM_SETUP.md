# Hướng Dẫn Cấu Hình Telegram Bot

## 📋 Tổng Quan

Hệ thống đã được tích hợp Telegram Bot để tự động gửi thông báo khi có đăng ký học mới từ landing page. Bot hỗ trợ gửi tin nhắn đến:

- ✅ **Cá nhân (User)**: Gửi đến 1 người dùng cụ thể
- ✅ **Nhóm (Group)**: Gửi đến nhóm Telegram (public/private)
- ✅ **Kênh (Channel)**: Gửi đến kênh Telegram

---

## 🔧 Các Bước Cấu Hình

### 1. Bot Token (Đã có)

**Bot Token của bạn:**
```
8695432862:AAG5Vuufy9pbSP6MFW4DOXSZ_ti3KuTrNBY
```

Bot này đã được tạo sẵn qua [@BotFather](https://t.me/BotFather).

---

### 2. Thêm Bot Vào Nhóm

**ID nhóm của bạn:** `-8814485779`

#### Cách thêm bot vào nhóm:

1. Mở nhóm Telegram của bạn
2. Nhấn vào tên nhóm → **Add Members**
3. Tìm bot của bạn (tên bot có thể tìm bằng cách chat với @BotFather)
4. Thêm bot vào nhóm

#### Cấp quyền cho bot:

1. Vào **Group Settings** → **Administrators**
2. Thêm bot làm admin (hoặc cấp quyền "Post Messages")
3. Nếu không muốn bot làm admin, đảm bảo:
   - Group setting: **All Members** có thể gửi tin nhắn
   - Bot đã được thêm vào nhóm thành công

---

### 3. Cấu Hình File `.env.local`

File `.env.local` đã được cập nhật với các giá trị sau:

```bash
# ========================================
# TELEGRAM BOT INTEGRATION
# ========================================

# Telegram Bot Token
TELEGRAM_BOT_TOKEN=8695432862:AAG5Vuufy9pbSP6MFW4DOXSZ_ti3KuTrNBY

# Telegram Chat ID (Group ID)
TELEGRAM_CHAT_ID=-8814485779
```

✅ **Đã cấu hình xong!**

---

## 🧪 Kiểm Tra Kết Nối

### Cách 1: Qua API Endpoint

#### Test kết nối bot:
```bash
# GET request - Kiểm tra bot token
curl http://localhost:3000/api/telegram/test
```

#### Gửi tin nhắn test:
```bash
# POST request - Gửi tin nhắn test
curl -X POST http://localhost:3000/api/telegram/test \
  -H "Content-Type: application/json" \
  -d '{}'
```

#### Gửi tin nhắn custom:
```bash
curl -X POST http://localhost:3000/api/telegram/test \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from Tuệ Lâm!"}'
```

### Cách 2: Qua Trình Duyệt

Mở trình duyệt và truy cập:
```
http://localhost:3000/api/telegram/test
```

Bạn sẽ thấy response JSON với thông tin bot.

### Cách 3: Test Đăng Ký Thật

1. Chạy dev server:
   ```bash
   npm run dev
   ```

2. Mở landing page: `http://localhost:3000/tieng-trung-tue-lam`

3. Nhấn nút **"Đăng Ký Học Thử Miễn Phí"**

4. Điền thông tin và submit form

5. Kiểm tra nhóm Telegram → sẽ thấy thông báo mới!

---

## 📱 Lấy Chat ID

Nếu bạn muốn gửi đến nhóm/kênh/user khác, cần lấy Chat ID:

### Cách 1: Dùng Bot Get ID

1. Truy cập [@userinfobot](https://t.me/userinfobot)
2. Nhấn **Start**
3. Bot sẽ trả về User ID của bạn

Hoặc:

1. Truy cập [@getidsbot](https://t.me/getidsbot)
2. Nhấn **Start**
3. Forward một tin nhắn từ nhóm/kênh → bot sẽ trả về Chat ID

### Cách 2: Qua Telegram API

#### Với nhóm (Group):

1. Thêm bot vào nhóm
2. Gửi 1 tin nhắn bất kỳ trong nhóm
3. Truy cập URL:
   ```
   https://api.telegram.org/bot8695432862:AAG5Vuufy9pbSP6MFW4DOXSZ_ti3KuTrNBY/getUpdates
   ```
4. Tìm `"chat":{"id":-123456789,...}` → ID âm là Group ID

#### Với kênh (Channel):

1. Thêm bot vào kênh với quyền post
2. Post 1 tin nhắn trong kênh
3. Truy cập URL getUpdates (như trên)
4. Tìm Channel ID (cũng là số âm)

---

## 🎨 Format Tin Nhắn

Tin nhắn gửi về Telegram có định dạng HTML đẹp mắt:

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

## 🔄 Gửi Đến Nhiều Nơi

Hiện tại hệ thống chỉ gửi đến 1 chat ID được cấu hình trong `.env.local`.

Nếu muốn gửi đến nhiều nơi (VD: vừa nhóm, vừa admin), bạn có thể:

### Option 1: Sửa code trong `app/api/register/route.ts`

```typescript
// Gửi đến nhiều chat ID
const chatIds = [
  -8814485779,     // Nhóm chính
  123456789,       // Admin 1
  987654321,       // Admin 2
];

for (const chatId of chatIds) {
  await sendRegistrationNotification(data, chatId);
}
```

### Option 2: Tạo nhiều biến env

```bash
# .env.local
TELEGRAM_CHAT_ID_GROUP=-8814485779
TELEGRAM_CHAT_ID_ADMIN=123456789
```

---

## ❗ Xử Lý Lỗi

### Bot không gửi được tin nhắn?

**Kiểm tra:**

1. ✅ Bot đã được thêm vào nhóm chưa?
2. ✅ Bot có quyền gửi tin nhắn không?
3. ✅ Chat ID có đúng không? (nhóm phải là số âm)
4. ✅ Bot token có đúng không?

### Bot bị kick khỏi nhóm?

Nếu bot bị xóa khỏi nhóm:
1. Thêm lại bot vào nhóm
2. Test lại bằng API `/api/telegram/test`

### Tin nhắn không có format đẹp?

Đảm bảo:
- `parse_mode: 'HTML'` đã được set
- Không có ký tự HTML đặc biệt chưa được escape

---

## 📊 Monitoring

Hệ thống log các event Telegram trong console:

- ✅ `Telegram notification sent successfully` → Gửi thành công
- ❌ `Telegram notification failed` → Gửi thất bại
- ⚠️ `Telegram not configured` → Chưa cấu hình

Xem log trong terminal khi chạy `npm run dev`.

---

## 🔒 Bảo Mật

**⚠️ QUAN TRỌNG:**

1. **KHÔNG commit** file `.env.local` lên Git
2. Bot token phải được giữ bí mật
3. Nên tạo bot mới cho production (khác với development)
4. Chỉ cấp quyền tối thiểu cho bot (không cần admin nếu không cần thiết)

---

## 🎯 Tóm Tắt

✅ Bot Token đã có: `8695432862:AAG5Vuufy9pbSP6MFW4DOXSZ_ti3KuTrNBY`  
✅ Group ID đã có: `-8814485779`  
✅ Code đã tích hợp Telegram  
✅ Khi có đăng ký mới → Tự động gửi thông báo về nhóm  

**Các bước còn lại:**
1. Thêm bot vào nhóm Telegram
2. Test bằng API: `http://localhost:3000/api/telegram/test`
3. Đăng ký thử trên landing page để xem kết quả

---

## 🆘 Cần Trợ Giúp?

Nếu gặp vấn đề, hãy:

1. Kiểm tra console log trong terminal
2. Test qua API endpoint `/api/telegram/test`
3. Đảm bảo bot đã được thêm vào nhóm và có quyền
4. Kiểm tra lại Chat ID (nhóm phải là số âm)

---

**Chúc bạn cấu hình thành công! 🎉**
