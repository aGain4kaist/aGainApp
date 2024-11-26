const { getDistance, format_date, getWebUrl } = require('../utils/helpers');
const UserModel = require('../models/userModel');

async function edit_user(user) {
  user.profile_picture = await getWebUrl('user/' + user.profile_picture);
  return user;
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    console.log(users);
    const items = await users.map((user) => edit_user(user));
    Promise.all(items).then((result) => {
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching users');
  }
};

exports.getUserByID = async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.params.id);
    res.json(await edit_user(user));
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching user');
  }
};

exports.getUserTicket = async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.params.id);
    res.json({ ticket: user.tickets });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching user');
  }
};
