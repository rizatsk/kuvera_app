import environment from '@/constants/environment';
import { deleteItem, getItem, setItem } from '@/helper/secure-store';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import {
    Auth,
    getAuth,
    GoogleAuthProvider,
    initializeAuth,
    linkWithCredential,
    Persistence,
    signInWithCredential,
} from 'firebase/auth';

const secureStorePersistence = {
    type: 'LOCAL' as const,
    async _get(key: string) {
        try {
            await getItem(key);
        } catch (error) {
            console.error('Error reading from SecureStore:', error);
            return null;
        }
    },
    async _remove(key: string) {
        try {
            await deleteItem(key);
        } catch (error) {
            console.error('Error removing from SecureStore:', error);
        }
    },
    async _set(key: string, value: string) {
        try {
            await setItem(key, value);
        } catch (error) {
            console.error('Error writing to SecureStore:', error);
        }
    },
    _addListener() {
        return () => { };
    },
} as Persistence;

// 2. Definisi Tipe & Config Firebase
interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

const firebaseConfig: FirebaseConfig = {
    apiKey: environment.EXPO_PUBLIC_FIREBASE_API_KEY as string,
    authDomain: environment.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
    projectId: environment.EXPO_PUBLIC_FIREBASE_PROJECT_ID as string,
    storageBucket: environment.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: environment.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
    appId: environment.EXPO_PUBLIC_FIREBASE_APP_ID as string,
};

const app: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth: Auth;

try {
  auth = getAuth(app);
} catch {
  auth = initializeAuth(app, {
    persistence: secureStorePersistence,
  });
}

const dbFirestore: Firestore = getFirestore(app);

const handleGoogleSignInWithAccessToken = async (accessToken: string) => {
  try {
    // 1. Buat credential langsung menggunakan accessToken saja
    const credential = GoogleAuthProvider.credential(null, accessToken);

    const currentUser = auth.currentUser;

    if (currentUser && currentUser.isAnonymous) {
      // 2. Jika user saat ini ANONIM, hubungkan (link) akun Google ini ke UID anonim tersebut
      const result = await linkWithCredential(currentUser, credential);
      console.log('Berhasil upgrade dari anonim ke Google! UID tetap:', result.user.uid);
    } else {
      // 3. Jika belum ada user aktif, langsung sign in biasa
      const result = await signInWithCredential(auth, credential);
      console.log('Berhasil login dengan Google! UID:', result.user.uid);
    }
  } catch (error: any) {
    if (error.code === 'auth/credential-already-in-use') {
      // Jika akun Google tersebut sudah pernah terdaftar di UID lain sebelumnya,
      // kita beralih (login) langsung ke akun Google tersebut
      console.log('Akun Google sudah terdaftar di UID lain, switching account...');
      const result = await signInWithCredential(auth, GoogleAuthProvider.credential(null, accessToken));
      console.log('Berhasil switch ke akun Google lama UID:', result.user.uid);
    } else {
      console.error('Error Google Sign-In:', error);
    }
  }
};

export { app, auth, dbFirestore, handleGoogleSignInWithAccessToken };
