const { db } = require('../config/firebaseAdmin');

const UserModel = {
  async getAllUsers() {
    const snapshot = await db.collection('User').get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async getUserbyId(id) {
    const doc = await db.collection('User').doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },

  async createUser(userData) {
    const docRef = await db.collection('User').add(userData);
    return { id: docRef.id, ...userData };
  },

  async updateUser(id, userData) {
    await db.collection('User').doc(id).set(userData, { merge: true });
    return { id, ...userData };
  },

  async deleteUser(id) {
    await db.collection('User').doc(id).delete();
    return { message: `User with ID ${id} deleted` };
  },
};

module.exports = UserModel;
