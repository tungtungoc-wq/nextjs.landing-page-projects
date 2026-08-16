# Form Đăng Ký Tư Vấn

## 📝 Các Trường Form

### Thông Tin Bắt Buộc

1. **Họ và Tên** (`name`)
   - Kiểu: Text
   - Required: ✅ Có
   - Validation: Không được để trống
   - Placeholder: "Nguyễn Văn A"

2. **Email** (`email`)
   - Kiểu: Email
   - Required: ✅ Có
   - Validation: Format email hợp lệ
   - Placeholder: "email@example.com"

3. **Số Điện Thoại** (`phone`)
   - Kiểu: Tel
   - Required: ✅ Có
   - Validation: 10-11 số
   - Pattern: `[0-9]{10,11}`
   - Placeholder: "0931 593 386"

### Thông Tin Tùy Chọn

4. **Trình Độ HSK Hiện Tại** (`level`)
   - Kiểu: Select dropdown
   - Required: ❌ Không
   - Options:
     - `""` - "Chọn trình độ"
     - `"zero"` - "Chưa biết gì"
     - `"hsk1-2"` - "HSK 1-2 (Sơ cấp)"
     - `"hsk3-4"` - "HSK 3-4 (Trung cấp)"
     - `"hsk5-6"` - "HSK 5-6 (Nâng cao)"
     - `"hsk7-9"` - "HSK 7-9 (Thành thạo)"

5. **Khóa Học Quan Tâm** (`course`)
   - Kiểu: Select dropdown
   - Required: ❌ Không
   - Options:
     - `""` - "Chọn khóa học"
     - `"hsk"` - "HSK 1-6"
     - `"communication"` - "Tiếng Trung Giao Tiếp"
     - `"business"` - "Tiếng Trung Thương Mại"
     - `"factory"` - "Tiếng Trung Công Xưởng"

6. **Nội Dung Cần Tư Vấn** (`message`)
   - Kiểu: Textarea
   - Required: ❌ Không
   - Rows: 3
   - Placeholder: "Bạn có câu hỏi gì muốn tư vấn?"

### Trường Ẩn

7. **Loại Đăng Ký** (`registration_type`)
   - Kiểu: Hidden (được set tự động)
   - Values:
     - `"trial"` - Học thử miễn phí (từ nút CTA xanh lá)
     - `"full"` - Đăng ký khóa học (từ nút CTA xanh dương)

---

## 🔄 Flow Hoạt Động

### 1. User Action
```
User nhấn nút:
├─ "Đăng Ký Học Thử Miễn Phí" → registration_type = "trial"
└─ "Đăng Ký Khóa Học" → registration_type = "full"
      ↓
Modal form hiện ra với các trường đã nêu trên
```

### 2. Form Submit
```
User điền thông tin và nhấn "Đăng Ký Ngay"
      ↓
Frontend validation (browser-level)
      ↓
POST request → /api/register
```

### 3. Backend Processing
```
API Route: /app/api/register/route.ts
      ↓
1. Validate dữ liệu (name, email, phone)
2. Clean phone number (loại bỏ space)
3. Map display values (level, course)
      ↓
4. Lưu vào Database (SQLite)
   ├─ Registration table
   └─ Ghi log IP, User Agent
      ↓
5. Gửi Email Thông Báo (Resend/Nodemailer)
   ├─ To: ADMIN_EMAIL (infor@tiengtrungtuelam.vn)
   └─ HTML template với thông tin học viên
      ↓
6. Gửi Telegram Notification
   ├─ To: TELEGRAM_CHAT_ID (-8814485779)
   └─ HTML format message
      ↓
7. Return JSON response
```

### 4. Response Handling
```json
{
  "success": true,
  "message": "Đăng ký thành công! Chúng tôi sẽ liên hệ sớm nhất.",
  "data": {
    "id": 123,
    "name": "Nguyễn Văn A",
    "email": "email@example.com",
    "phone": "0931593386"
  },
  "notifications": {
    "email": true,
    "telegram": true
  }
}
```

### 5. Frontend Feedback
```
Success:
├─ Hiển thị thông báo xanh (success alert)
├─ Reset form sau 2 giây
└─ Đóng modal tự động

Error:
├─ Hiển thị thông báo đỏ (error alert)
└─ Form không reset, user có thể sửa và submit lại
```

---

## 📊 Data Mapping

### Level Display Mapping
```javascript
{
  "zero": "Chưa biết gì",
  "hsk1-2": "HSK 1-2 (Sơ cấp)",
  "hsk3-4": "HSK 3-4 (Trung cấp)",
  "hsk5-6": "HSK 5-6 (Nâng cao)",
  "hsk7-9": "HSK 7-9 (Thành thạo)"
}
```

### Course Display Mapping
```javascript
{
  "hsk": "HSK 1-6",
  "communication": "Tiếng Trung Giao Tiếp",
  "business": "Tiếng Trung Thương Mại",
  "factory": "Tiếng Trung Công Xưởng"
}
```

### Registration Type Display
```javascript
{
  "trial": {
    icon: "🎁",
    label: "HỌC THỬ MIỄN PHÍ",
    color: "#10b981" // green
  },
  "full": {
    icon: "🎓",
    label: "ĐĂNG KÝ KHÓA HỌC",
    color: "#3b82f6" // blue
  }
}
```

---

## 🎨 UI Components

### Modal Form
- **Component**: Client Component (`"use client"`)
- **State Management**: React useState
- **File**: `app/tieng-trung-tue-lam/page.tsx`
- **Styling**: Tailwind CSS + Animate.css

### Form States
```javascript
const [showRegisterModal, setShowRegisterModal] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitStatus, setSubmitStatus] = useState<{
  type: 'success' | 'error',
  message: string
} | null>(null);
const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  level: "",
  course: "",
  message: "",
  registration_type: "full"
});
```

---

## 🔐 Security & Validation

### Frontend Validation
- HTML5 built-in validation
- Required fields
- Email format check
- Phone pattern: `[0-9]{10,11}`

### Backend Validation
```typescript
// Required fields check
if (!name || !email || !phone) {
  return 400 - "Thiếu thông tin bắt buộc"
}

// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return 400 - "Email không hợp lệ"
}

// Phone validation
const phoneRegex = /^[0-9]{10,11}$/;
const cleanPhone = phone.replace(/\s/g, '');
if (!phoneRegex.test(cleanPhone)) {
  return 400 - "Số điện thoại không hợp lệ"
}
```

### Data Sanitization
- Phone number: Remove spaces before save
- HTML content: Escaped in email template
- Telegram message: HTML escape function

---

## 📧 Notification Details

### Email Notification
- **Service**: Resend (primary) / Nodemailer (fallback)
- **To**: `ADMIN_EMAIL` env variable
- **Subject**: `🎁/🎓 [TYPE]: [NAME]`
- **Format**: HTML template với gradient header
- **Include**: All form data + IP + User Agent + Timestamp

### Telegram Notification
- **Service**: Telegram Bot API
- **To**: `TELEGRAM_CHAT_ID` env variable
- **Format**: HTML parse mode
- **Include**: All form data + Timestamp
- **Preview**: Disabled
- **Notification**: Enabled

---

## 🗄️ Database Schema

```sql
CREATE TABLE registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  level TEXT,
  course TEXT,
  message TEXT,
  registration_type TEXT DEFAULT 'full',
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🧪 Testing

### Manual Test
1. Run dev server: `npm run dev`
2. Open: `http://localhost:3000/tieng-trung-tue-lam`
3. Click "Đăng Ký Học Thử Miễn Phí"
4. Fill form với data test
5. Submit

### Expected Results
- ✅ Form submit thành công
- ✅ Success message hiển thị
- ✅ Form reset sau 2s
- ✅ Modal đóng tự động
- ✅ Email đến admin inbox
- ✅ Telegram message trong nhóm
- ✅ Record trong database

### Test Cases

#### Test Case 1: Valid Full Registration
```json
{
  "name": "Nguyễn Văn A",
  "email": "test@example.com",
  "phone": "0931593386",
  "level": "zero",
  "course": "hsk",
  "message": "Tôi muốn học từ đầu",
  "registration_type": "full"
}
```
Expected: ✅ Success

#### Test Case 2: Valid Trial Registration
```json
{
  "name": "Trần Thị B",
  "email": "test2@example.com",
  "phone": "0912345678",
  "level": "hsk1-2",
  "course": "communication",
  "message": "",
  "registration_type": "trial"
}
```
Expected: ✅ Success

#### Test Case 3: Missing Required Field
```json
{
  "name": "",
  "email": "test@example.com",
  "phone": "0931593386"
}
```
Expected: ❌ "Thiếu thông tin bắt buộc"

#### Test Case 4: Invalid Email
```json
{
  "name": "Test User",
  "email": "invalid-email",
  "phone": "0931593386"
}
```
Expected: ❌ "Email không hợp lệ"

#### Test Case 5: Invalid Phone
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "123"
}
```
Expected: ❌ "Số điện thoại không hợp lệ"

---

## 📱 Responsive Design

Form modal responsive trên:
- ✅ Desktop (md+): 2-column grid for email/phone, level/course
- ✅ Mobile (<md): Single column, stack all fields
- ✅ Max height: 90vh với scroll nếu cần

---

## 🎯 User Journey

```
Landing Page
    ↓
User scrolls và xem thông tin khóa học
    ↓
User click CTA button (Hero/Pricing/Sticky Footer)
    ↓
Modal form xuất hiện
    ↓
User điền thông tin (3 required, 3 optional)
    ↓
User submit form
    ↓
Loading state (button disabled, spinner)
    ↓
Success/Error feedback
    ↓
If success: Form reset → Modal close → User happy 😊
```

---

**Tóm tắt:** Form đăng ký đơn giản, dễ dùng, với 3 trường bắt buộc (name, email, phone) và 3 trường tùy chọn (level, course, message). Sau khi submit sẽ gửi thông báo qua Email + Telegram đến admin.
