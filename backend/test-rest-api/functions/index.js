// Firebase SDK 불러오기
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get, child } = require('firebase/database'); // Realtime Database
const { getFirestore, collection, getDocs, doc, getDoc } = require('firebase/firestore'); // Firestore

// Firebase 설정 정보 (Firebase Console에서 복사하여 붙여넣기)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Realtime Database에서 데이터 불러오기
const getDataFromRealtimeDatabase = async () => {
    const db = getDatabase();
    const dbRef = ref(db);

    try {
        const snapshot = await get(child(dbRef, 'users'));
        if (snapshot.exists()) {
            console.log('Realtime Database data:', snapshot.val());
        } else {
            console.log('No data available in Realtime Database');
        }
    } catch (error) {
        console.error('Error fetching data from Realtime Database:', error);
    }
};

// Firestore에서 데이터 불러오기
const getDataFromFirestore = async () => {
    const db = getFirestore(app);

    try {
        // 전체 'users' 컬렉션 문서 가져오기
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });

        // 특정 문서 가져오기 (예: 'users' 컬렉션의 'USER_ID' 문서)
        const docRef = doc(db, 'users', 'USER_ID');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log('Firestore document data:', docSnap.data());
        } else {
            console.log('No such document in Firestore');
        }
    } catch (error) {
        console.error('Error fetching data from Firestore:', error);
    }
};

// 함수 실행
getDataFromRealtimeDatabase();
getDataFromFirestore();
