import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { addRegistration } from '@/lib/firebase';
import { sendRegistrationNotification } from '@/lib/telegram';

const resend = new Resend(process.env.RESEND_API_KEY);

// Map values for display
const levelMap: Record<string, string> = {
  zero: 'Chưa biết gì',
  'hsk1-2': 'HSK 1-2 (Sơ cấp)',
  'hsk3-4': 'HSK 3-4 (Trung cấp)',
  'hsk5-6': 'HSK 5-6 (Nâng cao)',
  'hsk7-9': 'HSK 7-9 (Thành thạo)',
};

const courseMap: Record<string, string> = {
  hsk: 'HSK 1-6',
  communication: 'Tiếng Trung Giao Tiếp',
  business: 'Tiếng Trung Thương Mại',
  factory: 'Tiếng Trung Công Xưởng',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, level, course, message, registration_type } = body;

    // Validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Thiếu thông tin bắt buộc' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Email không hợp lệ' },
        { status: 400 }
      );
    }

    // Phone validation (10-11 digits)
    const phoneRegex = /^[0-9]{10,11}$/;
    const cleanPhone = phone.replace(/\s/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, error: 'Số điện thoại không hợp lệ' },
        { status: 400 }
      );
    }

    const levelDisplay = level ? levelMap[level] || level : 'Chưa chọn';
    const courseDisplay = course ? courseMap[course] || course : 'Chưa chọn';
    const registrationType = registration_type || 'full';
    const typeDisplay = registrationType === 'trial' ? '🎁 Học Thử Miễn Phí' : '💳 Đăng Ký Khóa Học';
    const typeColor = registrationType === 'trial' ? '#10b981' : '#3b82f6';

    // Email to Admin
    const adminEmailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .info-row { display: flex; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
    .info-label { font-weight: bold; width: 40%; color: #4b5563; }
    .info-value { width: 60%; color: #1f2937; }
    .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; }
    .emoji { font-size: 32px; margin-bottom: 10px; }
    .badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="emoji">🎓</div>
      <h2 style="margin: 0;">Đăng Ký Học Mới</h2>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Tiếng Trung Tuệ Lâm</p>
      <div class="badge" style="background-color: ${typeColor}; color: white;">${typeDisplay}</div>
    </div>
    <div class="content">
      <div class="info-box">
        <h3 style="margin-top: 0; color: #1f2937;">👤 Thông tin học viên</h3>
        <div class="info-row">
          <div class="info-label">Họ và Tên:</div>
          <div class="info-value">${name}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Email:</div>
          <div class="info-value"><a href="mailto:${email}">${email}</a></div>
        </div>
        <div class="info-row">
          <div class="info-label">Số điện thoại:</div>
          <div class="info-value"><a href="tel:${cleanPhone}">${phone}</a></div>
        </div>
        <div class="info-row">
          <div class="info-label">Trình độ:</div>
          <div class="info-value">${levelDisplay}</div>
        </div>
        <div class="info-row" style="border-bottom: none;">
          <div class="info-label">Khóa học:</div>
          <div class="info-value">${courseDisplay}</div>
        </div>
      </div>

      ${message ? `
      <div class="info-box">
        <h3 style="margin-top: 0; color: #1f2937;">💬 Ghi chú</h3>
        <p style="margin: 0; color: #4b5563; white-space: pre-wrap;">${message}</p>
      </div>
      ` : ''}

      <div class="footer">
        <p>📧 Email tự động từ website Tiếng Trung Tuệ Lâm</p>
        <p>⏰ ${new Date().toLocaleString('vi-VN')}</p>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    // Save to Firestore
    let registrationId: string | null = null;
    try {
      registrationId = await addRegistration({
        name,
        email,
        phone: cleanPhone,
        level,
        course,
        message,
        registration_type: registrationType,
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown',
      });
      console.log(`✅ Registration saved to Firestore with ID: ${registrationId}`);
    } catch (dbError) {
      console.error('❌ Failed to save to Firestore:', dbError);
      // Continue even if DB fails
    }

    // Send email - Try Resend first, fallback to Nodemailer
    let emailSent = false;

    // Try Resend
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_your_api_key_here') {
      try {
        await resend.emails.send({
          from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
          to: process.env.ADMIN_EMAIL || 'infor@tiengtrungtuelam.vn',
          subject: `${registrationType === 'trial' ? '🎁' : '🎓'} ${typeDisplay}: ${name}`,
          html: adminEmailContent,
        });
        console.log('✅ Email sent via Resend');
        emailSent = true;
      } catch (emailError) {
        console.error('❌ Resend failed:', emailError);
      }
    }

    // Fallback to Nodemailer (Gmail SMTP)
    if (!emailSent && process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        await transporter.sendMail({
          from: `"Tiếng Trung Tuệ Lâm" <${process.env.GMAIL_USER}>`,
          to: process.env.ADMIN_EMAIL || 'infor@tiengtrungtuelam.vn',
          subject: `${registrationType === 'trial' ? '🎁' : '🎓'} ${typeDisplay}: ${name}`,
          html: adminEmailContent,
        });

        console.log('✅ Email sent via Gmail (Nodemailer)');
        emailSent = true;
      } catch (gmailError) {
        console.error('❌ Gmail fallback failed:', gmailError);
      }
    }

    if (!emailSent) {
      console.log('⚠️ No email service configured - registration saved to database only');
    }

    // Send Telegram notification
    let telegramSent = false;
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const telegramResponse = await sendRegistrationNotification({
          name,
          email,
          phone: cleanPhone,
          level,
          course,
          message,
          registration_type: registrationType,
          created_at: new Date().toLocaleString('vi-VN'),
        });

        if (telegramResponse.ok) {
          console.log('✅ Telegram notification sent successfully');
          telegramSent = true;
        } else {
          console.error('❌ Telegram notification failed:', telegramResponse.description);
        }
      } catch (telegramError) {
        console.error('❌ Telegram error:', telegramError);
      }
    } else {
      console.log('⚠️ Telegram not configured - skipping notification');
    }

    return NextResponse.json({
      success: true,
      message: 'Đăng ký thành công! Chúng tôi sẽ liên hệ sớm nhất.',
      data: {
        id: registrationId,
        name,
        email,
        phone,
      },
      notifications: {
        email: emailSent,
        telegram: telegramSent,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Có lỗi xảy ra. Vui lòng thử lại!' },
      { status: 500 }
    );
  }
}

