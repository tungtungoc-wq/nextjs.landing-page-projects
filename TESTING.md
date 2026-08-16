# 🧪 Testing Guide - Registration System

## ✅ What's Been Implemented

### 1. **Backend API** (`/app/api/register/route.ts`)
   - ✅ Form validation (name, email, phone required)
   - ✅ Email format validation (regex)
   - ✅ Phone number validation (10-11 digits)
   - ✅ Error handling with proper status codes
   - ✅ Resend email integration
   - ✅ Beautiful HTML email template

### 2. **Email Service** (Resend)
   - ✅ Professional HTML email template
   - ✅ Student information display
   - ✅ Gradient header design
   - ✅ Clickable links (email, phone)
   - ✅ Timestamp in Vietnamese locale

### 3. **Frontend Form** (`/app/tieng-trung-tue-lam/page.tsx`)
   - ✅ Modal with backdrop blur
   - ✅ 6 form fields (name, email, phone, level, course, notes)
   - ✅ HTML5 validation
   - ✅ Loading state with spinner
   - ✅ Success/Error messages
   - ✅ Auto-close after success (2 seconds)
   - ✅ Disabled buttons during submission

### 4. **Styling Improvements** (`/app/globals.css`)
   - ✅ Smooth animations (300ms transitions)
   - ✅ Hover effects on cards and buttons
   - ✅ Loading spinner animation
   - ✅ Pulse animation for messages
   - ✅ Form input focus glow
   - ✅ Backdrop blur effects

## 📋 Test Checklist

### Local Testing (No API Key)

1. **Start Server**
   ```bash
   npm run dev
   ```

2. **Navigate to Page**
   - URL: `http://localhost:3000/tieng-trung-tue-lam`

3. **Open Registration Modal**
   - Click any "Đăng Ký Ngay" button
   - Modal should appear with smooth animation

4. **Test Form Validation**
   - [ ] Try submit empty form → Should show HTML5 validation errors
   - [ ] Enter invalid email (e.g., "abc") → Should show "Please include an '@' in the email address"
   - [ ] Enter short phone (e.g., "123") → Should show validation error
   - [ ] Enter correct data → Should submit successfully

5. **Test Loading State**
   - [ ] During submission: Submit button shows spinner + "Đang xử lý..."
   - [ ] Both buttons disabled during submission
   - [ ] Form inputs remain disabled

6. **Test Success Response**
   - [ ] Green success message appears
   - [ ] Message: "Đăng ký thành công! Chúng tôi sẽ liên hệ sớm nhất."
   - [ ] Modal auto-closes after 2 seconds
   - [ ] Form resets to empty

7. **Console Logs (Without API Key)**
   - Open DevTools → Console
   - Should see: `⚠️ Resend API key not configured - email not sent`
   - Should see: `Registration data: {...}`

### With Resend API Key

1. **Setup API Key**
   - Follow instructions in `SETUP_EMAIL.md`
   - Add `RESEND_API_KEY` to `.env.local`

2. **Restart Server**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

3. **Submit Form**
   - Fill out all fields correctly
   - Click "Đăng Ký Ngay"

4. **Check Console Logs**
   - Should see: `✅ Email sent successfully to admin`
   - No error messages

5. **Check Email Inbox**
   - Check email at `ADMIN_EMAIL` (infor@tiengtrungtuelam.vn)
   - Should receive professional HTML email
   - Verify all student data is correct

6. **Check Resend Dashboard**
   - Login to [resend.com/home](https://resend.com/home)
   - Go to **Logs**
   - Should see sent email with status "delivered"

### Edge Cases

1. **Invalid Email Format**
   ```
   Input: "notanemail"
   Expected: Browser validation error
   ```

2. **Short Phone Number**
   ```
   Input: "123"
   Expected: "Please match the requested format" (10-11 digits)
   ```

3. **Long Phone Number**
   ```
   Input: "123456789012345"
   Expected: Validation error
   ```

4. **Vietnamese Characters in Name**
   ```
   Input: "Nguyễn Văn Á"
   Expected: Works perfectly ✅
   ```

5. **Empty Optional Fields**
   ```
   Leave "Trình độ" and "Khóa học" empty
   Expected: Form submits, shows "Chưa chọn" in email
   ```

6. **Close Modal During Submission**
   ```
   Start submitting form → Try clicking backdrop or X button
   Expected: Buttons are disabled, can't close
   ```

7. **Network Error**
   ```
   Disconnect internet → Submit form
   Expected: Red error message: "Không thể kết nối đến server"
   ```

## 🐛 Known Issues & Limitations

### Current Limitations:
1. **No Database**: Form data not saved (only sent via email)
2. **No Admin Dashboard**: Can't view submissions in web UI
3. **No Auto-Reply**: Student doesn't receive confirmation email
4. **Rate Limiting**: Free tier = 100 emails/day

### Future Improvements:
- [ ] Add database (MongoDB/PostgreSQL) to store registrations
- [ ] Send confirmation email to student
- [ ] Admin dashboard to view/manage registrations
- [ ] Export data to CSV
- [ ] Duplicate prevention (same email)
- [ ] reCAPTCHA to prevent spam

## 🚀 Deployment Testing

After deploying to Vercel/Netlify:

1. **Set Environment Variables**
   - `RESEND_API_KEY`
   - `ADMIN_EMAIL`
   - `FROM_EMAIL`

2. **Test on Production URL**
   - Submit test registration
   - Verify email arrives
   - Check Resend logs

3. **Monitor Errors**
   - Check Vercel/Netlify logs
   - Check Resend dashboard for delivery failures

## 📊 Success Metrics

✅ **Backend Working If:**
- API returns `200 OK` status
- Validation errors return `400 Bad Request`
- Console shows email sent log

✅ **Frontend Working If:**
- Form submits without page refresh
- Loading state appears
- Success message shows
- Modal closes automatically

✅ **Email Service Working If:**
- Email arrives in inbox within 10 seconds
- HTML template renders correctly
- All data displays properly
- Links (email, phone) are clickable

## 🔍 Debugging Tips

### Email Not Arriving?

1. Check **Spam/Junk folder**
2. Verify `ADMIN_EMAIL` is correct
3. Check Resend logs for delivery status
4. Try with different email provider (Gmail, Outlook)

### API Errors?

1. Open DevTools → Network tab
2. Submit form
3. Click on `/api/register` request
4. Check Response tab for error details

### Server Not Starting?

1. Check if port 3000 is available:
   ```bash
   netstat -ano | findstr :3000
   ```
2. Kill process if needed
3. Try different port:
   ```bash
   PORT=3001 npm run dev
   ```

## 📞 Need Help?

- Review `SETUP_EMAIL.md` for email configuration
- Check `.env.local` for correct API key
- Verify Resend dashboard shows active API key
- Test with simple data first (no special characters)
