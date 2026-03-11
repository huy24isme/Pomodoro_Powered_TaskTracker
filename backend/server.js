const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./src/routes');
const { env } = require('./src/config');

dotenv.config();

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
  })
);
app.use(express.json());

app.use('/api', routes);

app.listen(env.port, () => {
  console.log(`Backend server is running on port ${env.port}`);
});
