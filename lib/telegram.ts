/**
 * Telegram Bot Integration
 * Hỗ trợ gửi message đến: cá nhân (user), nhóm (group), kênh (channel)
 */

export interface TelegramMessage {
  chat_id: string | number; // User ID, Group ID (âm), hoặc Channel username (@channel)
  text: string;
  parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2';
  disable_web_page_preview?: boolean;
  disable_notification?: boolean;
}

export interface TelegramResponse {
  ok: boolean;
  result?: any;
  description?: string;
  error_code?: number;
}

export interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  level?: string;
  course?: string;
  message?: string;
  registration_type?: string;
  created_at?: string;
}

/**
 * Gửi message qua Telegram Bot API
 */
export async function sendTelegramMessage(
  message: TelegramMessage
): Promise<TelegramResponse> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    console.warn('⚠️ TELEGRAM_BOT_TOKEN not configured');
    return {
      ok: false,
      description: 'Bot token not configured',
      error_code: 401,
    };
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Telegram API Error:', error);
    return {
      ok: false,
      description: error instanceof Error ? error.message : 'Unknown error',
      error_code: 500,
    };
  }
}

/**
 * Format registration data thành Telegram message (HTML)
 */
export function formatRegistrationMessage(
  data: RegistrationData
): string {
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

  const levelDisplay = data.level ? levelMap[data.level] || data.level : 'Chưa chọn';
  const courseDisplay = data.course ? courseMap[data.course] || data.course : 'Chưa chọn';
  const registrationType = data.registration_type || 'full';
  const typeIcon = registrationType === 'trial' ? '🎁' : '🎓';
  const typeLabel = registrationType === 'trial' ? 'HỌC THỬ MIỄN PHÍ' : 'ĐĂNG KÝ KHÓA HỌC';
  const timestamp = data.created_at || new Date().toLocaleString('vi-VN');

  let message = `${typeIcon} <b>${typeLabel}</b>\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `👤 <b>Học viên:</b> ${escapeHtml(data.name)}\n`;
  message += `📧 <b>Email:</b> ${escapeHtml(data.email)}\n`;
  message += `📱 <b>SĐT:</b> <code>${escapeHtml(data.phone)}</code>\n`;
  message += `📊 <b>Trình độ:</b> ${escapeHtml(levelDisplay)}\n`;
  message += `📚 <b>Khóa học:</b> ${escapeHtml(courseDisplay)}\n`;

  if (data.message) {
    message += `\n💬 <b>Ghi chú:</b>\n<i>${escapeHtml(data.message)}</i>\n`;
  }

  message += `\n⏰ <i>${escapeHtml(timestamp)}</i>\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🌐 <a href="https://tiengtrungtuelam.vn">Tiếng Trung Tuệ Lâm</a>`;

  return message;
}

/**
 * Escape HTML characters để tránh lỗi khi gửi message
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
  };
  return text.replace(/[&<>]/g, (m) => map[m]);
}

/**
 * Gửi thông báo đăng ký mới về nhóm Telegram
 */
export async function sendRegistrationNotification(
  data: RegistrationData,
  chatId?: string | number
): Promise<TelegramResponse> {
  // Ưu tiên chatId được truyền vào, nếu không có thì dùng từ env
  const targetChatId = chatId || process.env.TELEGRAM_CHAT_ID;

  if (!targetChatId) {
    console.warn('⚠️ TELEGRAM_CHAT_ID not configured');
    return {
      ok: false,
      description: 'Chat ID not configured',
      error_code: 400,
    };
  }

  const message = formatRegistrationMessage(data);

  return await sendTelegramMessage({
    chat_id: targetChatId,
    text: message,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  });
}

/**
 * Kiểm tra kết nối Telegram bot
 */
export async function testTelegramConnection(): Promise<TelegramResponse> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    return {
      ok: false,
      description: 'Bot token not configured',
      error_code: 401,
    };
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/getMe`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Telegram Connection Test Failed:', error);
    return {
      ok: false,
      description: error instanceof Error ? error.message : 'Unknown error',
      error_code: 500,
    };
  }
}
