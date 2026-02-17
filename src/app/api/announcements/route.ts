import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Announcement } from '@/models/Announcement';

export async function GET() {
  try {
    await connectDB();
    const now = new Date();
    const announcements = await Announcement.find({
      active: true,
      $or: [
        { expiresAt: { $exists: false } },
        { expiresAt: { $gte: now } }
      ]
    }).sort({ priority: -1, createdAt: -1 });

    return NextResponse.json({ announcements }, { status: 200 });
  } catch (error) {
    console.error('Get announcements error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
