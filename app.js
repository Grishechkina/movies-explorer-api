const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralizedErrorHandler = require('./middlewares/centralizedErrorHandler');
require('dotenv').config();

const { PORT = 3000, DB_URL, NODE_ENV } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/moviesdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(requestLogger);

app.use(cors(
  {
    origin: [
      'https://film.o.search.nomoredomains.icu',
      'http://film.o.search.nomoredomains.icu',
      'https://http://localhost:3000',
      'http://localhost:3000',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  },
));

app.use('/api', routes);
app.use(errorLogger);
app.use(errors());

app.use(centralizedErrorHandler);

app.listen(PORT, () => {});
