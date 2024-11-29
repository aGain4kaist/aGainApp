const { db } = require('../config/firebaseAdmin');

const UserModel = {
  async getAllUsers() {
    const snapshot = await db.collection('User').get();
    return snapshot.docs.map((doc) => ({ ...doc.data() }));
  },

  async getUserById(id) {
    const doc = await db.collection('User').where('id', '==', Number(id)).get();
    return doc.empty ? null : { ...doc.docs[0].data() };
  },

  async createUser(userData) {
    const docRef = await db.collection('User').add(userData);
    return { id: docRef.id, ...userData };
  },

  async updateUser(id, userData) {
    const snapshot = await db
      .collection('User')
      .where('id', '==', Number(id))
      .get();
    const doc = snapshot.docs[0];
    await db.collection('User').doc(doc.id).set(userData, { merge: true });
    return { ...userData };
  },

  async deleteUser(id) {
    await db.collection('User').where('id', '==', Number(id)).delete();
    return { message: `User with ID ${id} deleted` };
  },
};

module.exports = UserModel;
