const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/UserRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/netflix')
  .then(() => {
    console.log('database connected');
  })
  .catch(() => {
    console.log('database failed connection');
  });

app.use('/api/user', userRouter);

app.use(errorHandler);

app.listen(5000, () => {
  console.log('server is listening to the port 5000');
});
