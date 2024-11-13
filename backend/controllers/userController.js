const { getDistance, format_date } = require('../utils/helpers');
const { admin } = require('../config/firebaseAdmin');
const UserModel = require('../models/userModel');
const bucket = admin.storage().bucket();