import { db } from './firebase-admin';

export type CollectionName = 'patients' | 'appointments' | 'vaccinations' | 'invoices' | 'medical_records' | 'deworming';

export async function getRecords(collection: CollectionName, filters?: Record<string, any>) {
  let query: FirebaseFirestore.Query = db.collection(collection);
  
  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      query = query.where(key, '==', value);
    }
  }
  
  const snapshot = await query.orderBy('createdAt', 'desc').get();
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function getRecord(collection: CollectionName, id: string) {
  const doc = await db.collection(collection).doc(id).get();
  if (!doc.exists) return null;
  return {
    id: doc.id,
    ...doc.data()
  };
}

export async function createRecord(collection: CollectionName, data: any) {
  const docRef = db.collection(collection).doc();
  const now = new Date().toISOString();
  await docRef.set({
    ...data,
    createdAt: now,
    updatedAt: now
  });
  return docRef.id;
}

export async function updateRecord(collection: CollectionName, id: string, data: any) {
  const docRef = db.collection(collection).doc(id);
  const now = new Date().toISOString();
  await docRef.update({
    ...data,
    updatedAt: now
  });
  return id;
}

export async function deleteRecord(collection: CollectionName, id: string) {
  await db.collection(collection).doc(id).delete();
  return true;
}
