import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const usersRef = collection(db, 'users');

const searchMembers = async (username) => {
  const usersQuery = query(
    usersRef,
    where('usernameLc', '==', username.toLowerCase())
  );

  const usersSnapshot = await getDocs(usersQuery);

  const searchResults = usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return searchResults;
};

export default searchMembers;
