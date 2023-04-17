import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
