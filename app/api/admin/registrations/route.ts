import { NextRequest, NextResponse } from 'next/server';
import {
  getAllRegistrations,
  getStatistics,
  deleteRegistration,
} from '@/lib/firebase';

// Simple password protection (in production, use proper auth)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;

  const [type, credentials] = authHeader.split(' ');
  if (type !== 'Basic') return false;

  const decoded = Buffer.from(credentials, 'base64').toString();
  const [, password] = decoded.split(':');

  return password === ADMIN_PASSWORD;
}

// GET - Get all registrations or statistics
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin Area"' },
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const limit = searchParams.get('limit');

  try {
    if (action === 'stats') {
      const stats = await getStatistics();
      return NextResponse.json({ success: true, data: stats });
    }

    const registrations = await getAllRegistrations();

    if (limit) {
      const limitNum = parseInt(limit);
      return NextResponse.json({
        success: true,
        data: registrations.slice(0, limitNum)
      });
    }

    return NextResponse.json({ success: true, data: registrations });
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a registration
export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin Area"' },
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { success: false, error: 'Missing ID' },
      { status: 400 }
    );
  }

  try {
    const deleted = await deleteRegistration(id);
    if (deleted) {
      return NextResponse.json({
        success: true,
        message: 'Registration deleted',
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Registration not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
