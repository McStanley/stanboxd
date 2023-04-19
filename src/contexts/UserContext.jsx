import { createContext, useContext, useMemo } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { auth, db } from '../firebase';

const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, userLoading] = useAuthState(auth);
  const docRef = user ? doc(db, 'users', user.uid) : null;
  const [userData, userDataLoading] = useDocumentData(docRef);

  const data =
    !user || !userData
      ? null
      : {
          uid: user.uid,
          username: userData.username,
        };

  const loading = userLoading || userDataLoading;

  const value = useMemo(() => [data, loading], [data, loading]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
