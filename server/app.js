require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const routes = require('./routes')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/classic_fox_live_code_1', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database classic_fox_live_code_1 connected')
});

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routes)

app.listen(port, () => {
  console.log(`listen on port ${port}`)
})