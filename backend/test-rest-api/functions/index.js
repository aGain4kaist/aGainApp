// 필요한 패키지 가져오기
const express = require("express");
const admin = require("firebase-admin");
const app = express();
const port = 3000;

// Firebase Admin SDK 초기화
const serviceAccount = require("./serviceAccountKey.json"); // Firebase 서비스 계정 키 파일

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://again-server-5156a.firebaseio.com', // Firebase Realtime Database URL
  storageBucket: 'gs://again-server-5156a.appspot.com'
});

const R = 6371; // 지구의 반지름 (킬로미터 단위)

function getDistance(lat1, lon1, lat2, lon2) {
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // 거리 (킬로미터 단위)
}

// Firestore 인스턴스 가져오기
const db = admin.firestore();
const bucket = admin.storage().bucket();

// 미들웨어 설정 (JSON 데이터를 파싱하기 위해 사용)
app.use(express.json());


// 1. GET: Firestore에서 모든 문서 조회, 거리순으로 return
app.get('/party', async (req, res) => {
  try {
    const snapshot = await db.collection('Party').get();
    const docs = snapshot.docs;
    const {latitude, longitude} = req.query;
    let items = []
    docs.forEach((doc) =>
    {
        const distance = getDistance(latitude, longitude, doc.data().location[0], doc.data().location[1]);
        items.push({distance: distance, ...doc.data()});
    });
    /*snapshot.forEach(doc => {
      items.push({ id: doc.id, ...doc.data() });
    });
    */
   items.sort((a,b) => a.distance - b.distance);
    res.json(items);
  } catch (error) {
    res.status(500).send('Error fetching data from Firebase');
  }
});

// 2. GET: Firestore에서 특정 문서 조회
app.get('/party/:id', async (req, res) => {
  const id = req.params.id;
  const {latitude, longitude} = req.query;
  try {
    const doc = await db.collection('Party').doc(id).get();
    if (doc.exists) {
        const data = doc.data();
        const distance = getDistance(latitude, longitude, doc.data().location[0], doc.data().location[1]);
        res.json({ distance: distance, ...doc.data() });
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching data from Firebase');
  }
});
/*
// 3. POST: Firestore에 새 문서 추가
app.post('/api/items', async (req, res) => {
  try {
    const newItem = {
      name: req.body.name,
      description: req.body.description,
    };
    const docRef = await db.collection('items').add(newItem);
    res.status(201).json({ id: docRef.id, ...newItem });
  } catch (error) {
    res.status(500).send('Error adding new item to Firebase');
  }
});

// 4. PUT: Firestore에서 문서 업데이트
app.put('/api/items/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const item = {
      name: req.body.name,
      description: req.body.description,
    };
    await db.collection('items').doc(id).set(item, { merge: true });
    res.json({ id, ...item });
  } catch (error) {
    res.status(500).send('Error updating item in Firebase');
  }
});

// 5. DELETE: Firestore에서 문서 삭제
app.delete('/api/items/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await db.collection('items').doc(id).delete();
    res.json({ message: `Item with ID ${id} deleted` });
  } catch (error) {
    res.status(500).send('Error deleting item from Firebase');
  }
});
*/

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/*
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
*/