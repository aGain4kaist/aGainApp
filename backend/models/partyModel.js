const { db } = require('../config/firebaseAdmin');

const PartyModel = {
  // 모든 파티를 Firestore에서 가져오는 메소드
  async getAllParties() {
    const snapshot = await db.collection('Party').get();
    return snapshot.docs.map((doc) => ({ ...doc.data() }));
  },

  // 특정 ID를 사용하여 Firestore에서 특정 파티를 가져오는 메소드
  async getPartyById(id) {
    const doc = await db
      .collection('Party')
      .where('id', '==', Number(id))
      .get();
    return doc.empty ? null : { ...doc.docs[0].data() };
  },

  // 새로운 파티를 Firestore에 추가하는 메소드
  async createParty(partyData) {
    const docRef = await db.collection('Party').add(partyData);
    return { id: docRef.id, ...partyData };
  },

  // 특정 파티를 Firestore에서 업데이트하는 메소드
  async updateParty(id, partyData) {
    const snapshot = await db
      .collection('Party')
      .where('id', '==', Number(id))
      .get();
    const doc = snapshot.docs[0];
    await db.collection('Party').doc(doc.id).set(partyData, { merge: true });
    return { ...partyData };
  },

  // 특정 파티를 Firestore에서 삭제하는 메소드
  async deleteParty(id) {
    await db.collection('Party').where('id', '==', Number(id)).delete();
    return { message: `Party with ID ${id} deleted` };
  },
};

module.exports = PartyModel;
