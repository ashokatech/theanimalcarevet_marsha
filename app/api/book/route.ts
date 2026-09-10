import { NextResponse } from 'next/server';
import { createRecord, getRecords } from '@/lib/database';
import { z } from 'zod';

const bookingSchema = z.object({
  pet: z.string().min(1),
  owner: z.string().min(1),
  phone: z.string().min(1),
  date: z.string(),
  time: z.string(),
  reason: z.string().min(1),
  species: z.enum(['Dog', 'Cat', 'Bird', 'Other']).optional(),
  breed: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const normalizedBody = {
      ...body,
      pet: body.pet || body.petName,
      owner: body.owner || body.ownerName,
    };
    
    const parsedData = bookingSchema.safeParse(normalizedBody);
    if (!parsedData.success) {
      return NextResponse.json({ error: 'Invalid data', details: parsedData.error }, { status: 400 });
    }

    const { pet, owner, phone, date, time, reason, species, breed } = parsedData.data;

    const existingPatients = await getRecords('patients', { pet, owner });
    
    if (existingPatients.length === 0) {
      await createRecord('patients', {
        pet,
        owner,
        phone,
        species: species || 'Other',
        breed: breed || '',
      });
    }

    const appointmentId = await createRecord('appointments', {
      pet,
      owner,
      phone,
      date,
      time,
      reason,
      status: 'Requested'
    });

    return NextResponse.json({ success: true, id: appointmentId });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to book appointment' }, { status: 500 });
  }
}
