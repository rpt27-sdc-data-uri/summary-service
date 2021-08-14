const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const db = require('./postgres.js');
const contains = require('validator/lib/contains');
// const { Summary, mongoose } = require('./index.js');
const fs = require('fs');
const filename = 'summary.csv';
const stream = fs.createWriteStream(filename);
const fastcsv = require('fast-csv')
const args = require('minimist')(process.argv.slice(2));


const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 6,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 8
  },
  suffix: " "
});

const createSummary = () => {
  // for (let i = 0; i < 100; i++) {
  const paragraphLength = Math.floor(Math.random() * 2 + 2);
  const shortSummarySentenceLength = Math.floor(Math.random() * 4 + 3);
  const copyrightWordsLength = Math.floor(Math.random() * 2 + 2);
  let summary = lorem.generateParagraphs(paragraphLength);
  summary = summary.replace(/\n/g,' ');
  let short_summary = lorem.generateSentences(shortSummarySentenceLength);
  short_summary = short_summary.replace(/\n/g,' ');
  const year = Math.floor(Math.random() * 81) + 1940;
  const copyright = '©' + year + ' ' + lorem.generateWords(copyrightWordsLength) + ' (P)' + (year + Math.floor(Math.random() * 5 + 4)) + ' ' + lorem.generateWords(copyrightWordsLength);
  let row = `${summary},${short_summary},${copyright}\n`;
  return row;
  // }
};

function writeToCsvFile() {
  let rows = 10000000;
  for (let index = 0; index <= rows; index++) {
    stream.write(createSummary(), 'utf-8')
  }
  stream.end();
}

// const seedCSV = (writeStream, encoding, done) => {
//   let i = lines;
//   function write() {
//     let canWrite = true;
//     do {
//       i--;
//       let summary = createSummary(i);
//       if (i===0) {
//         writeStream.write(summary, encoding, done)
//       } else {
//         writeStream.write(summary, encoding)
//       }
//     } while (i > 0 && canWrite);
//     if (i > 0 && !canWrite) {
//       writeStream.once('drain', writing);
//     }
//   }
//   write();
// };

function seedDatabase() {
  let csvData = [];
  return (
    fastcsv
    .parse()
    .validate((data) => !contains(data[0], ','))
    .on('data', (data) => {
      csvData.push(data);
    })
    .on('data-invalid', (row, rowNumber) =>
      console.log(`Invalid [rowNumber=${rowNumber}] [row=${JSON.stringify(row)}]`)
    )
  )
  .on('end', () => {
    const query = "COPY summary (summary, short_summary, copyright) FROM '/Users/alonzosanchez/sdc/Summary-Service/summary.csv' WITH (FORMAT CSV, DELIMITER ',');"
    // const query = 'INSERT INTO Summaries (id, summary, short_summary, copyright) VALUES ($1, $2, $3, $4)';

    db.connect((err,client, done) => {
      if (err) throw err;

      try {
        client.query(query, (err, res) => {
          if(err) {
            console.log('err here', err.stack)
          } else {
            console.log('inserted data')
          }
        });
        // csvData.forEach((row) => {
        //   client.query(query, row, (err,res) => {
        //     if(err) {
        //       console.log(row);
        //       console.log('the error is here', err.stack);
        //     } else {
        //       console.log('inserted ' + res.rowCount + ' row:', row);
        //     }
        //   });
        // });
      } finally {
        done();
      }
    })
  })
}
async function seed() {
  await writeToCsvFile();
  let stream = fs.createReadStream(filename);
  stream.pipe(seedDatabase())
}

// stream.write('id,summary,short_summary,copyright\n', 'utf-8');
// seedCSV(stream, 'utf-8', () => {
//   stream.end();
// });

// const seeding = () => {
//   for (let i = 0; i < 10; i++) {
//     console.log('whats up');
//     seed();
//     console.log('ran')
//   }
//   return;
// }

// seeding();

seed();



// let save = (summaryData, callback) => {
//   const query = { 'id': summaryData.id };
//   const update = { $set: {'id': summaryData.id, 'summary': summaryData.summary, 'short_summary': summaryData.short_summary, 'copyright': summaryData.copyright } };
//   const options = { upsert: true };
//   Summary.updateOne(query, update, options, callback);
// };

// for (let i = 0; i < 100; i++) {
//   const paragraphLength = Math.floor(Math.random() * 2 + 2);
//   const shortSummarySentenceLength = Math.floor(Math.random() * 4 + 3);
//   const copyrightWordsLength = Math.floor(Math.random() * 2 + 2);
//   const summary = lorem.generateParagraphs(paragraphLength);
//   const short_summary = lorem.generateSentences(shortSummarySentenceLength);
//   const year = Math.floor(Math.random() * 81) + 1940;
//   const copyright = '©' + year + ' ' + lorem.generateWords(copyrightWordsLength) + ' (P)' + (year + Math.floor(Math.random() * 5 + 4)) + ' ' + lorem.generateWords(copyrightWordsLength);

//   const summaryData = {
//     id: i,
//     summary: summary,
//     short_summary: short_summary,
//     copyright: copyright
//   };
//   save(summaryData, function(err, res) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(i, ': ' + JSON.stringify(res));
//       if (i === 99) {
//         mongoose.connection.close();
//         process.exit();
//       }
//     }
//   });



// }
CREATE TABLE summary (
  bookId serial PRIMARY KEY,
  summary TEXT,
  short_summary TEXT,
  copyright VARCHAR (50)
)

// D
