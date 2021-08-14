const nano = require('nano')('http://alonzosanchez:31041185@localhost:5984');
const db = nano.use('summarydb');

nano.db.create('summarydb')
.then((data) => {
  console.log('success');
}).catch((err) => {
  console.log('error');
});

module.exports = {
  db
}