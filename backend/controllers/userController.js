const { getDistance, format_date, getWebUrl } = require('../utils/helpers');
const UserModel = require('../models/userModel');
const ClothModel = require('../models/clothModel');

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
    res.json({ "ticket": user.tickets });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching user');
  }
};

exports.getUserExchange = async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.params.id);
    res.json({ "trades": user.exchanges });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching user');
  }
}

exports.uploadUser = async (req, res) => {
  try {
    const jsonData = req.body;
    if (!req.file) {
      return res.status(400).send({ error: 'No file uploaded.' });
    }
    const fileInfo = {
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
    };
    if (!jsonData || Object.keys(jsonData).length === 0) {
      return res.status(400).send({ error: 'No JSON data provided.' });
    }
    const id = UserModel.createUser(jsonData);
    const fileName = `${'user/user'}${id}${path.extname(fileInfo.originalName)}`;
    const fileUpload = bucket.file(fileName);
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: fileInfo.mimeType,
      },
    });

    stream.on('error', (error) => {
      console.error('Error uploading file:', error);
      res.status(500).send({ error: 'Failed to upload file.' });
    });

    stream.on('finish', async () => {
      // 파일 업로드 완료 후 URL 생성
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      res.status(200).send({
        message: 'File and JSON data uploaded successfully.',
        documentId: documentId,
        fileUrl: publicUrl,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to process json data.');
  }
};

exports.buyCloth = async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.params.user_id);
    const cloth = await ClothModel.getClothByID(req.params.cloth_id);
    if(user.tickets == 0) {
      res.status(400).send('Not enough tickets.');
    }
    // await ClothModel.deleteCloth(req.params.cloth_id); 교환이 완료된 옷 삭제, 테스트 필요해서 주석처리함.
    const owner = await UserModel.getUserById(cloth.owner);
    owner.exchanges += 1;
    user.exchanges += 1;
    user.tickets -= 1;
    await UserModel.updateUser(user.id, user);
    await UserModel.updateUser(owner.id, owner);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching user or cloth.');
  }
}