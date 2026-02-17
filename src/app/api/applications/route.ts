import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db';
import { Application } from '@/models/Application';
import { User } from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'vfs-global-secret-key-2024';

function generateReferenceNumber(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'VFS-';
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const token = request.headers.get('cookie')?.split('token=')[1]?.split(';')[0];

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    let applications;
    if (user.role === 'admin') {
      applications = await Application.find().sort({ createdAt: -1 }).populate('userId', 'email firstName lastName');
    } else {
      applications = await Application.find({ userId: user._id }).sort({ createdAt: -1 });
    }

    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    console.error('Get applications error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const token = request.headers.get('cookie')?.split('token=')[1]?.split(';')[0];

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const data = await request.json();

    const referenceNumber = generateReferenceNumber();
    const application = await Application.create({
      ...data,
      userId: decoded.userId,
      referenceNumber,
      status: 'draft',
    });

    return NextResponse.json(
      { message: 'Application created', application },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create application error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
