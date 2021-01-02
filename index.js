const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOveride = require('method-override');

app.use(express.static(path.join(__dirname,public)))

const logger = require('morgan');

app.set('view engine', 'ejs');

app.use(methodOverride((req, res) => {
  if (req.body && req.body._method) {
    const method = req.body._method;
    return method;
  }
}))

app.use(cookieParser());

app.use(logger('dev'));

const cohortRouter = require('./routes/cohorts')
app.use('/cohorts',cohortRouter);

const knex = require('./db/client');


const ADDRESS = 'localhost'; 
const PORT = 3000;
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on ${ADDRESS}:${PORT}`);
});


