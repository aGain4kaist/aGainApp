const PartyModel = require('../models/partyModel');
const userModel = require('../models/userModel');
const { getDistance, format_date, getWebUrl } = require('../utils/helpers');

async function edit_party(party, latitude, longitude)
{
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

    const items = parties
      .map(async party => await edit_party(party, latitude, longitude));
    Promise.all(items)
      .then(result => {result.sort((a,b) => a.distance - b.distance); res.json(result);});
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
      for (let i = 0; i < cloth.liked_users.length; i++) {
          if (req.params.userid == cloth.liked_users[i]) {
              cloth.likes--;
              cloth.liked_users.splice(i, 1);
              for (let j = 0; j < user.liked_clothes.length; j++) {
                  if (req.params.clothid == user.liked_clothes[j]) {
                      user.liked_clothes.splice(j, 1);
                  }
              }
              await ClothModel.updateCloth(req.params.clothid, cloth);
              await UserModel.updateUser(req.params.userid, user);
              res.json(cloth);
          }
      }
      cloth.liked_users.push(req.params.userid);
      user.liked_clothes.push(req.params.clothid);
      cloth.liked_users = [...new Set(cloth.liked_users)]; // 중복 제거
      cloth.likes = cloth.liked_users.length;
      user.liked_cloths = [...new Set(user.liked_clothes)]; // 중복 제거
      await ClothModel.updateCloth(req.params.clothid, cloth);
      await UserModel.updateUser(req.params.userid, user);
      res.json(cloth);
  } catch (error) {
      console.log(error);
      res.status(500).send('Error fetching cloth or user');
  }
};
