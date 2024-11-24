const { format_date, getWebUrl } = require('../utils/helpers');
const ClothModel = require('../models/clothModel');
const PartyModel = require('../models/partyModel');
const UserModel = require('../models/userModel');

async function edit_cloth(cloth) {
  cloth.image = await getWebUrl('cloth/' + cloth.image);
  cloth.upload_date = format_date(cloth.upload_date);
  return cloth;
}

exports.getAllClothes = async (req, res) => {
  try {
    const clothes = await ClothModel.getAllClothes();
    console.log(clothes);
    const items = await clothes.map((cloth) => edit_cloth(cloth));
    Promise.all(items).then((result) => {
      result.sort((a, b) => b.date - a.date);
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching clothes');
  }
};

exports.getClothByID = async (req, res) => {
  try {
    const cloth = await ClothModel.getClothByID(req.params.id);
    if (cloth) {
      const item = await edit_cloth(cloth);
      res.json(item);
    } else {
      res.status(404).send('Cloth not found');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching cloth');
  }
};

exports.getClothByPartyID = async (req, res) => {
  try {
    const party = await PartyModel.getPartyById(req.params.id);
    const ret = [];
    for (let i = 0; i < party.cloth.length; i++) {
      try {
        const cloth = await ClothModel.getClothByID(party.cloth[i]);
        ret.push(await edit_cloth(cloth));
      } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching cloth');
      }
    }
    res.json(ret.sort((a, b) => b.date - a.date));
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching party');
  }
};

exports.getClothByUserID = async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.params.id);
    const ret = [];
    for (let i = 0; i < user.my_clothes.length; i++) {
      try {
        const cloth = await ClothModel.getClothByID(user.my_clothes[i]);
        ret.push(await edit_cloth(cloth));
      } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching cloth');
      }
    }
    res.json(ret.sort((a, b) => b.date - a.date));
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching user');
  }
};

exports.getClothLike = async (req, res) => {
  try {
    const cloth = await ClothModel.getClothByID(req.params.clothid);
    if (cloth) {
      const item = await edit_cloth(cloth);
      res.json({ likes: item.likes, liked_users: item.liked_users });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching cloth');
  }
};

exports.toggleClothLike = async (req, res) => {
  try {
    const cloth = await ClothModel.getClothByID(req.params.clothid);
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