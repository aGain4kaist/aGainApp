import { createContext, useContext, useState } from 'react';

// 1. Context 생성
const UserContext = createContext();

// 2. Context Provider 작성
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);  // 유저 정보 상태

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Context Consumer 훅
export function useUser() {
  return useContext(UserContext);
}