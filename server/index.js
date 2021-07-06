const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
let app = express();
app.use(compression({threshold : 0 }))
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/summary/:bookId', async (req, res) => {
  res.set({'Access-Control-Allow-Origin': '*'})
  await db.Summary.find({'id': req.params.bookId}).exec((err, result) => {
    console.log(result);
    if (err) {
      next(err);
    } else {
      res.send(result);
    }
  })
});

app.get('/api/summaries/:bookIds', async (req, res) => {
  res.set({'Access-Control-Allow-Origin': '*'})
  const ids = req.params.bookIds.split(',');
  await db.Summary.find({ id: { $in: ids } }).exec((err, result) => {
    if (err) {
      next(err);
    } else {
      res.send(result);
    }
  })
});

app.post('/api/summary', (req, res) => {
  let newSummary = new db.Summary(req.body)
  newSummary.save()
  .then(() => {
    res.sendStatus(200)
  })
  .catch(() => {
    res.sendStatus(500)
  })
})

// app.put('/api/summary/:bookId', (req, res) => {
//   const id = req.params.bookId;
//   db.Summary.updateOne({id}, )
// })

app.delete('/api/summary/:bookId', async (req, res) => {
  db.Summary.deleteOne({id: req.params.bookId})
  .then(() => {
    console.log('Deleted')
    res.send(200)
  })
  .catch((err) => {
    console.log(err)
    res.send(500)
  })
})


let port = 1220;
if(!module.parent){
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
};

module.exports = app;