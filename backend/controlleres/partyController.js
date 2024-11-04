const PartyModel = require('../models/partyModel');
const { getDistance } = require('../utils/helpers');

exports.getAllParties = async (req, res) => {
  try {
    const parties = await PartyModel.getAllParties();
    const { latitude, longitude } = req.query;

    const items = parties
      .map((party) => {
        const distance = getDistance(
          latitude,
          longitude,
          party.location[0],
          party.location[1]
        );
        return { ...party, distance };
      })
      .sort((a, b) => a.distance - b.distance);

    res.json(items);
  } catch (error) {
    res.status(500).send('Error fetching parties');
  }
};

exports.getPartyById = async (req, res) => {
  try {
    const party = await PartyModel.getPartyById(req.params.id);
    if (party) {
      const { latitude, longitude } = req.query;
      const distance = getDistance(
        latitude,
        longitude,
        party.location[0],
        party.location[1]
      );
      res.json({ ...party, distance });
    } else {
      res.status(404).send('Party not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching party');
  }
};
