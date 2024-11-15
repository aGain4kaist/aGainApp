const PartyModel = require('../models/partyModel');
const userModel = require('../models/userModel');
const { getDistance, format_date, getWebUrl } = require('../utils/helpers');

async function edit_party(party, latitude, longitude) {
  const distance = getDistance(
    latitude,
    longitude,
    party.location[0],
    party.location[1]
  );
  party.image = await getWebUrl(party.image);
  party.date = [format_date(party.date[0]), format_date(party.date[1])];
  party.distance = distance;
  return party;
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

exports.togglePartyLike = async (req, res) => {
  try {
    const party = await PartyModel.getPartyById(req.params.partyid);
    const user = await UserModel.getUserById(req.params.userid);
    for (let i = 0; i < party.liked_users.length; i++) {
      if (req.params.userid == party.liked_users[i]) {
        party.likes--;
        party.liked_users.splice(i, 1);
        for (let j = 0; j < user.liked_parties.length; j++) {
          if (req.params.partyid == user.liked_parties[j]) {
            user.liked_parties.splice(j, 1);
          }
        }
        await PartyModel.updateCloth(req.params.partyid, party);
        await UserModel.updateUser(req.params.userid, user);
        res.json(party);
      }
    }
    party.liked_users.push(req.params.userid);
    user.liked_parties.push(req.params.partyid);
    party.liked_users = [...new Set(party.liked_users)]; // 중복 제거
    party.likes = party.liked_users.length;
    user.liked_parties = [...new Set(user.liked_parties)]; // 중복 제거
    await ClothModel.updateCloth(req.params.partyid, party);
    await UserModel.updateUser(req.params.userid, user);
    res.json(party);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching party or user');
  }
};
