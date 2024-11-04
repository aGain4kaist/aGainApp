const { db } = require('../config/firebaseAdmin');
const { getDistance } = require('../utils/helpers');

exports.getAllParties = async (req, res) => {
  try {
    const snapshot = await db.collection('Party').get();
    const docs = snapshot.docs;
    const { latitude, longitude } = req.query;
    let items = [];

    docs.forEach((doc) => {
      const distance = getDistance(
        latitude,
        longitude,
        doc.data().location[0],
        doc.data().location[1]
      );
      items.push({ distance: distance, ...doc.data() });
    });

    items.sort((a, b) => a.distance - b.distance);
    res.json(items);
  } catch (error) {
    res.status(500).send('Error fetching parties');
  }
};

exports.getPartyById = async (req, res) => {
  const id = req.params.id;
  const { latitude, longitude } = req.query;
  try {
    const doc = await db.collection('Party').doc(id).get();
    if (doc.exists) {
      const data = doc.data();
      const distance = getDistance(
        latitude,
        longitude,
        data.location[0],
        data.location[1]
      );
      res.json({ distance, ...data });
    } else {
      res.status(404).send('Party not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching party');
  }
};
