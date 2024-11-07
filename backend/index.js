const express = require('express');
const app = express();
const port = 3000;

const partyRoutes = require('./routes/partyRoutes');
//const userRoutes = require('./routes/userRoutes');

app.use(express.json());

// 파티 관련 라우트
app.use('/party', partyRoutes);
//app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
