import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

// Initialize Firebase Admin
if (!getApps().length) {
  try {
    // Try to use service account file first (local development)
    const serviceAccount = require('../firebase-service-account.json');

    initializeApp({
      credential: cert(serviceAccount),
    });

    console.log('✅ Firebase initialized with service account file');
  } catch (error) {
    // Fallback to environment variable (Vercel production)
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

      initializeApp({
        credential: cert(serviceAccount),
      });

      console.log('✅ Firebase initialized with environment variable');
    } else {
      console.error('❌ Firebase service account not found');
      throw new Error('Firebase configuration missing');
    }
  }
}

const db = getFirestore();

export interface FirebaseRegistration {
  id?: string;
  name: string;
  email: string;
  phone: string;
  level?: string;
  course?: string;
  message?: string;
  registration_type: string;
  ip_address?: string;
  user_agent?: string;
  created_at: Date | Timestamp;
}

// Add registration to Firestore
export async function addRegistration(data: Omit<FirebaseRegistration, 'id' | 'created_at'>): Promise<string> {
  const docRef = await db.collection('registrations').add({
    ...data,
    created_at: Timestamp.now(),
  });

  console.log(`✅ Registration saved to Firestore with ID: ${docRef.id}`);
  return docRef.id;
}

// Get all registrations
export async function getAllRegistrations(): Promise<FirebaseRegistration[]> {
  const snapshot = await db.collection('registrations')
    .orderBy('created_at', 'desc')
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    created_at: doc.data().created_at.toDate(),
  } as FirebaseRegistration));
}

// Get registration by ID
export async function getRegistrationById(id: string): Promise<FirebaseRegistration | null> {
  const doc = await db.collection('registrations').doc(id).get();

  if (!doc.exists) {
    return null;
  }

  return {
    id: doc.id,
    ...doc.data(),
    created_at: doc.data()?.created_at.toDate(),
  } as FirebaseRegistration;
}

// Delete registration
export async function deleteRegistration(id: string): Promise<boolean> {
  try {
    await db.collection('registrations').doc(id).delete();
    console.log(`✅ Registration ${id} deleted from Firestore`);
    return true;
  } catch (error) {
    console.error('❌ Failed to delete registration:', error);
    return false;
  }
}

// Get statistics
export async function getStatistics() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const allSnapshot = await db.collection('registrations').get();
  const total = allSnapshot.size;

  const todaySnapshot = await db.collection('registrations')
    .where('created_at', '>=', Timestamp.fromDate(todayStart))
    .get();
  const today = todaySnapshot.size;

  const weekSnapshot = await db.collection('registrations')
    .where('created_at', '>=', Timestamp.fromDate(weekAgo))
    .get();
  const week = weekSnapshot.size;

  const monthSnapshot = await db.collection('registrations')
    .where('created_at', '>=', Timestamp.fromDate(monthAgo))
    .get();
  const month = monthSnapshot.size;

  return { total, today, week, month };
}

// Search by email
export async function searchByEmail(email: string): Promise<FirebaseRegistration[]> {
  const snapshot = await db.collection('registrations')
    .where('email', '==', email)
    .orderBy('created_at', 'desc')
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    created_at: doc.data().created_at.toDate(),
  } as FirebaseRegistration));
}

export { db };
