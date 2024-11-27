import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/utils/firebaseConfig'; // Firebase 초기화 파일
import { doc, getDoc, setDoc } from 'firebase/firestore';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// Utility function to generate a default user object
const createDefaultUser = (firebaseUser) => ({
  id: firebaseUser.uid,
  username: firebaseUser.displayName || 'again',
  description: '모두의 지속가능한 옷장',
  exchanges: 0,
  height: 170,
  weight: 60,
  length: 260,
  liked_clothes: [],
  liked_parties: [],
  my_clothes: [],
  profile_picture: firebaseUser.photoURL || '',
  show_body_size: true,
  tickets: 0,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //const login = (userData) => setUser(userData);
  //const logout = () => setUser(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);

      if (firebaseUser) {
        try {
          // Fetch user data from Firestore
          const userDocRef = doc(db, 'User', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            // Merge Firestore data with Firebase Auth data
            setUser({ ...firebaseUser, ...userDoc.data() });
          } else {
            // Create new user in Firestore
            const newUser = createDefaultUser(firebaseUser);

            await setDoc(userDocRef, newUser);
            setUser({ ...firebaseUser, ...newUser });
          }
        } catch (error) {
          console.error('Error fetching or creating user:', error);
          alert('사용자 정보를 불러오는 데 실패했습니다.');
          setUser(null); // Fallback to null user on error
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      console.log('로그아웃 했습니다.');
    } catch (error) {
      console.error('Error during logout:', error);
      alert('로그아웃에 실패했습니다.');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

/* export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}; */
