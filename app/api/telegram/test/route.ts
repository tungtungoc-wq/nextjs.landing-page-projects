import { NextRequest, NextResponse } from 'next/server';
import { testTelegramConnection, sendTelegramMessage } from '@/lib/telegram';

/**
 * API endpoint để test kết nối Telegram Bot
 * GET /api/telegram/test - Kiểm tra bot token
 * POST /api/telegram/test - Gửi test message
 */

export async function GET(request: NextRequest) {
  try {
    // Kiểm tra cấu hình
    if (!process.env.TELEGRAM_BOT_TOKEN) {
      return NextResponse.json(
        {
          success: false,
          error: 'TELEGRAM_BOT_TOKEN không được cấu hình trong .env.local',
        },
        { status: 400 }
      );
    }

    if (!process.env.TELEGRAM_CHAT_ID) {
      return NextResponse.json(
        {
          success: false,
          error: 'TELEGRAM_CHAT_ID không được cấu hình trong .env.local',
        },
        { status: 400 }
      );
    }

    // Test kết nối
    const result = await testTelegramConnection();

    if (result.ok) {
      return NextResponse.json({
        success: true,
        message: 'Telegram bot đã được cấu hình thành công!',
        bot: result.result,
        config: {
          chat_id: process.env.TELEGRAM_CHAT_ID,
        },
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.description,
          error_code: result.error_code,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Telegram test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Có lỗi xảy ra khi kiểm tra Telegram bot',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, chat_id } = body;

    if (!process.env.TELEGRAM_BOT_TOKEN) {
      return NextResponse.json(
        {
          success: false,
          error: 'TELEGRAM_BOT_TOKEN không được cấu hình',
        },
        { status: 400 }
      );
    }

    const targetChatId = chat_id || process.env.TELEGRAM_CHAT_ID;

    if (!targetChatId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Chat ID không được cung cấp',
        },
        { status: 400 }
      );
    }

    const testMessage = message || `🧪 <b>Test Message</b>\n\nĐây là tin nhắn test từ Tiếng Trung Tuệ Lâm\n\n⏰ ${new Date().toLocaleString('vi-VN')}`;

    const result = await sendTelegramMessage({
      chat_id: targetChatId,
      text: testMessage,
      parse_mode: 'HTML',
    });

    if (result.ok) {
      return NextResponse.json({
        success: true,
        message: 'Tin nhắn test đã được gửi thành công!',
        result: result.result,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.description,
          error_code: result.error_code,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Telegram send test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Có lỗi xảy ra khi gửi tin nhắn test',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
