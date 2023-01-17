const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const {checkToken} = require('./middleware/auth');
const formidableMiddleware = require('express-formidable');
require('dotenv').config();
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`;
const users = require('./routes/api/users');
const edit = require('./routes/api/edit');
const files = require('./routes/api/files'); // learning files upload

mongoose.connect(mongoUri);

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(checkToken);

app.use('/api/users', users);
app.use('/api/edit', edit);
app.use('/api/files', files); // learning files upload

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'), function (err) {
      if (err) {
        res.status(404).sendFile(path.join(__dirname, '/view/index.html'));
      }
    });
  })


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

