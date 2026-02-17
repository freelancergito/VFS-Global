import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Application } from '@/models/Application';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const referenceNumber = searchParams.get('referenceNumber');
    const passportNumber = searchParams.get('passportNumber');

    if (!referenceNumber && !passportNumber) {
      return NextResponse.json(
        { message: 'Reference number or passport number is required' },
        { status: 400 }
      );
    }

    let application;
    if (referenceNumber) {
      application = await Application.findOne({ referenceNumber })
        .populate('userId', 'firstName lastName email')
        .select('-documents');
    } else if (passportNumber) {
      application = await Application.findOne({ 'passportDetails.passportNumber': passportNumber })
        .populate('userId', 'firstName lastName email')
        .select('-documents');
    }

    if (!application) {
      return NextResponse.json(
        { message: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ application }, { status: 200 });
  } catch (error) {
    console.error('Track application error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
