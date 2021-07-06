const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/summary');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connection Successful!');
});

let summarySchema = new mongoose.Schema({
  id: { type: Number, unique: true, index: true},
  summary: { type: String, required: true },
  short_summary: { type: String, required: true },
  copyright: { type: String, required: true }
});

let Summary = mongoose.model('Summary', summarySchema);
Summary.createIndexes();

module.exports = { Summary, mongoose, db};





