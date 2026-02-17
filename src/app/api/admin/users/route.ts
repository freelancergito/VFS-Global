import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'vfs-global-secret-key-2024';

export async function GET(request: Request) {
  try {
    await connectDB();
    const token = request.headers.get('cookie')?.split('token=')[1]?.split(';')[0];

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };

    if (decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const users = await User.find().sort({ createdAt: -1 }).select('-password');

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
