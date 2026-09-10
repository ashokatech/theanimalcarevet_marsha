import { NextResponse } from 'next/server';
import { getSessionFromCookies } from '@/lib/auth';
import { getRecords, createRecord, updateRecord, deleteRecord, CollectionName } from '@/lib/database';
import { z } from 'zod';

const collectionSchema = z.enum(['patients', 'appointments', 'vaccinations', 'invoices', 'medical_records', 'deworming']);

const schemas = {
  patients: z.object({
    pet: z.string().min(1),
    owner: z.string().min(1),
    phone: z.string().min(1),
    species: z.enum(['Dog', 'Cat', 'Bird', 'Other']),
    breed: z.string().optional(),
    age: z.string().optional(),
    weight: z.string().optional(),
    notes: z.string().optional()
  }),
  appointments: z.object({
    pet: z.string().min(1),
    owner: z.string().min(1),
    phone: z.string().min(1),
    date: z.string(),
    time: z.string(),
    reason: z.string().min(1),
    status: z.enum(['Requested', 'Confirmed', 'Completed', 'Cancelled']),
    notes: z.string().optional()
  }),
  vaccinations: z.object({
    patientId: z.string().min(1),
    vaccine: z.string().min(1),
    given: z.string(),
    due: z.string(),
    batch: z.string().optional(),
    notes: z.string().optional()
  }),
  invoices: z.object({
    patientId: z.string().min(1),
    items: z.array(z.object({
      description: z.string(),
      quantity: z.number(),
      price: z.number()
    })),
    tax: z.number(),
    status: z.enum(['Unpaid', 'Paid']),
    date: z.string()
  }),
  medical_records: z.object({
    patientId: z.string().min(1),
    type: z.enum(['Consultation', 'Surgery', 'Lab Result', 'X-Ray', 'Follow-up']),
    date: z.string(),
    diagnosis: z.string().min(1),
    treatment: z.string().min(1),
    prescription: z.string().optional(),
    followUpDate: z.string().optional(),
    notes: z.string().optional()
  }),
  deworming: z.object({
    patientId: z.string().min(1),
    medication: z.string().min(1),
    given: z.string(),
    due: z.string(),
    weight: z.string().optional(),
    notes: z.string().optional()
  })
};

function checkAuth(request: Request) {
  const cookieHeader = request.headers.get('cookie');
  if (!getSessionFromCookies(cookieHeader)) {
    return false;
  }
  return true;
}

export async function GET(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const collection = searchParams.get('collection');

  const parsedCollection = collectionSchema.safeParse(collection);
  if (!parsedCollection.success) {
    return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
  }

  try {
    const records = await getRecords(parsedCollection.data as CollectionName);
    return NextResponse.json(records);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch records' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { collection, data, id } = body;

    const parsedCollection = collectionSchema.safeParse(collection);
    if (!parsedCollection.success) {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
    }

    const colName = parsedCollection.data as CollectionName;
    const schema = schemas[colName];
    
    const parsedData = schema.safeParse(data);
    if (!parsedData.success) {
      return NextResponse.json({ error: 'Invalid data', details: parsedData.error }, { status: 400 });
    }

    const validData = parsedData.data;

    if (colName === 'invoices') {
      const invoiceData = validData as z.infer<typeof schemas.invoices>;
      const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
      const total = subtotal + invoiceData.tax;
      (validData as any).subtotal = subtotal;
      (validData as any).total = total;
    }

    if (id) {
      await updateRecord(colName, id, validData);
      return NextResponse.json({ success: true, id });
    } else {
      const newId = await createRecord(colName, validData);
      return NextResponse.json({ success: true, id: newId });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save record' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { collection, id } = body;

    const parsedCollection = collectionSchema.safeParse(collection);
    if (!parsedCollection.success || !id) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    await deleteRecord(parsedCollection.data as CollectionName, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
  }
}
