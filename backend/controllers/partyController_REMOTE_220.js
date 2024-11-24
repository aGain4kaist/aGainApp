const PartyModel = require('../models/partyModel');
const { getDistance, format_date } = require('../utils/helpers');
const { admin } = require('../config/firebaseAdmin');

const bucket = admin.storage().bucket();

async function edit_party(party, latitude, longitude) {
  const distance = getDistance(
    latitude,
    longitude,
    party.location[0],
    party.location[1]
  );
  const file = bucket.file(party.image);
  const signedUrls = await file.getSignedUrl({
    action: 'read',
    expires: '03-09-2500', // URL의 만료 날짜를 설정하세요 (예: 2500년 3월 9일까지 유효)
  });
  party.image = signedUrls[0];
  party.date = [format_date(party.date[0]), format_date(party.date[1])];
  party.distance = distance;
  return party;
  /*
    file.getSignedUrl({
      action: 'read',
      expires: '03-09-2500' // URL의 만료 날짜를 설정하세요 (예: 2500년 3월 9일까지 유효)
    }).then((signedUrls) => {
      party.image = signedUrls[0];
      party.date = [format_date(party.date[0]), format_date(party.date[1])];
      party.distance = distance;
      console.log(party);
      return party;
    }).catch((error) => {
      console.error("Error generating URL:", error);
    });
    */
}

exports.getAllParties = async (req, res) => {
  try {
    const parties = await PartyModel.getAllParties();
    const { latitude, longitude } = req.query;

    const items = parties.map(
      async (party) => await edit_party(party, latitude, longitude)
    );
    Promise.all(items).then((result) => {
      result.sort((a, b) => a.distance - b.distance);
      res.json(result);
    });
  } catch (error) {
    console.log(error);

    res.status(500).send('Error fetching parties');
  }
};

exports.getPartyById = async (req, res) => {
  try {
    const party = await PartyModel.getPartyById(req.params.id);
    if (party) {
      const { latitude, longitude } = req.query;

      const item = await edit_party(party, latitude, longitude);
      res.json(item);
    } else {
      res.status(404).send('Party not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching party');
  }
};

exports.getClothesOfParty = async (req, res) => {
  try {
    const party = await PartyModel.getPartyById(req.params.id);
    if (party) {
      res.json(party.cloth);
    } else {
      res.status(404).send('Party not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching clothes');
  }
};
