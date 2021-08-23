const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
// const db = require('../database/index.js');
const pool = require('../database/postgres.js')
let app = express();
app.use(compression({threshold : 0 }))
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('hi')
})

app.get('/api/summary/:bookId', (req, res) => {
  console.log('req sent')
  res.set({'Access-Control-Allow-Origin': '*'})
  const query = `Select * from summary where bookId = ${req.params.bookId}`

  pool.query(query)
  .then((response) => {
    console.log(response)
    res.send(response.rows)
  })
  .catch(err => console.error(err))
});

// app.get('/api/summaries/:bookIds', async (req, res) => {
//   res.set({'Access-Control-Allow-Origin': '*'})
//   const ids = req.params.bookIds.split(',');
//   await db.Summary.find({ id: { $in: ids } }).exec((err, result) => {
//     if (err) {
//       next(err);
//     } else {
//       res.send(result);
//     }
//   })
// });

app.post('/api/create/summary', (req, res) => {
  console.log(req.body)
  const {summary, short_summary, copyright} = req.body;
  const query = `INSERT INTO summary (summary, short_summary, copyright)
  VALUES ('${summary}', '${short_summary}', '${copyright}')`
  console.log(query)
  pool.query(query)
  .then(response => res.sendStatus(200))
  .catch(err => console.log(err));
})

// app.put('/api/summary/:bookId', (req, res) => {
//   const id = req.params.bookId;
//   db.Summary.updateOne({id}, )
// })

app.delete('/api/summary/:bookId', async (req, res) => {

  const query = `DELETE FROM summary WHERE bookId = ${req.params.bookId}`
  pool.query(query)
  .then(response => {
    console.log('deleted');
    res.sendStatus(200)
  })
  .catch(err => console.log(err))
  // db.Summary.deleteOne({id: req.params.bookId})
  // .then(() => {
  //   console.log('Deleted')
  //   res.send(200)
  // })
  // .catch((err) => {
  //   console.log(err)
  //   res.send(500)
  // })
})


let port = 1220;
if(!module.parent){
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
};

module.exports = app;