import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebaseConfig';  // Firestore 설정 불러오기

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "messages"));
        querySnapshot.forEach((doc) => {
          console.log(doc.data());  // 데이터를 콘솔에 출력
          setMessage(doc.data().text);  // 'text' 필드를 가져오기
        });
      } catch (error) {
        console.error("Error fetching messages:", error);  // 에러 확인
      }
    };
  
    fetchMessage();
  }, []);

  return (
    <>
     <h1>Firestore에서 가져온 메시지:</h1>
     <p>{message}</p>
    </>
  )
}

export default App;
