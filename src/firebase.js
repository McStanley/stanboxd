import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAZpXygv3EAu2SVjYV45W_LhHr5rwpDzDA',
  authDomain: 'stanboxd.firebaseapp.com',
  projectId: 'stanboxd',
  storageBucket: 'stanboxd.appspot.com',
  messagingSenderId: '710695322703',
  appId: '1:710695322703:web:bb40ceb731e5262d61563a',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const register = async (username, email, password) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, 'users', user.uid), {
    username,
    usernameLc: username.toLowerCase(),
    registeredAt: serverTimestamp(),
  });
};

const login = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

const logout = async () => {
  await signOut(auth);
};

const isUsernameAvailable = async (username) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('usernameLc', '==', username.toLowerCase()));

  const querySnapshot = await getDocs(q);

  return !querySnapshot.size;
};

export { auth, db, isUsernameAvailable, login, logout, register, storage };
