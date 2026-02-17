import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db';
import { Appointment } from '@/models/Appointment';
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
    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    let appointments;
    if (user.role === 'admin') {
      appointments = await Appointment.find()
        .sort({ createdAt: -1 })
        .populate('userId', 'email firstName lastName')
        .populate('applicationId', 'referenceNumber visaType')
        .populate('centerId', 'name address city');
    } else {
      appointments = await Appointment.find({ userId: user._id })
        .sort({ createdAt: -1 })
        .populate('applicationId', 'referenceNumber visaType')
        .populate('centerId', 'name address city');
    }

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    console.error('Get appointments error:', error);
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
    const { applicationId, centerId, date, time } = await request.json();

    if (!applicationId || !centerId || !date || !time) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const appointment = await Appointment.create({
      userId: decoded.userId,
      applicationId,
      centerId,
      date,
      time,
      status: 'scheduled',
    });

    return NextResponse.json(
      { message: 'Appointment booked', appointment },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create appointment error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
