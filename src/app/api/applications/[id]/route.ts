import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db';
import { Application } from '@/models/Application';

const JWT_SECRET = process.env.JWT_SECRET || 'vfs-global-secret-key-2024';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const token = request.headers.get('cookie')?.split('token=')[1]?.split(';')[0];

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    const application = await Application.findById(id).populate('userId', 'email firstName lastName phone');

    if (!application) {
      return NextResponse.json({ message: 'Application not found' }, { status: 404 });
    }

    if (application.userId._id.toString() !== decoded.userId && decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ application }, { status: 200 });
  } catch (error) {
    console.error('Get application error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const token = request.headers.get('cookie')?.split('token=')[1]?.split(';')[0];

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    const data = await request.json();

    const application = await Application.findById(id);
    if (!application) {
      return NextResponse.json({ message: 'Application not found' }, { status: 404 });
    }

    if (application.userId.toString() !== decoded.userId && decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );

    return NextResponse.json(
      { message: 'Application updated', application: updatedApplication },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update application error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
