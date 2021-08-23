// const db = require('./postgres.js');
// const contains = require('validator/lib/contains');
// const fs = require('fs');
// const fastcsv = require('fast-csv')
// const args = require('minimist')(process.argv.slice(2));
const currentDirectory = process.cwd();
// const csvWriter = require("csv-write-stream");
// const writer = csvWriter();
// // const pgp = require('pg-promise')({
// //   capSQL: true
// // });

// // const connectionObject = {
// //   user: 'postgres',
// //   host: '13.58.242.41',
// //   database: 'postgres',
// //   password: 'postgres',
// //   port: 5432,
// //   idleTimeoutMillis: 0,
// //   connectionTimeoutMillis: 0
// // }
// // const db = pgp(connectionObject);

// // function summarySeed () {
// //   console.log('seeding')
// //   db.tx('massive-insert', t => {
// //     const processData = data => {
// //       if (data) {
// //         const insert = pgp.helpers.insert(data, summary);
// //         return t.none(insert);
// //       }
// //     };
// //     return t.sequence(index => createSummary().then(processData))
// //   })
// //   .then(data => {

// //     console.log('Total reviews batches:', data.total, ', Duration:', data.duration);
// // })
// //   .catch(error => {

// //     console.log(error);
// //   });
// // }

// // summarySeed();


// const lorem = new LoremIpsum({
//   sentencesPerParagraph: {
//     max: 6,
//     min: 4
//   },
//   wordsPerSentence: {
//     max: 16,
//     min: 8
//   },
//   suffix: " "
// });



// // seedPostgresSummaryCSV = () => {
// //   console.log(" -- postgres books create csv started -- ");

// //   const createCsvFile = () => {
// //     writer.pipe(fs.createWriteStream(`./summary.csv`));

// //     for (var i = 1; i <= 10000; i++) {
// //       console.log("id", i);
// //       writer.write({
// //         summary: lorem.generateParagraphs(2),
// //         short_summary: lorem.generateParagraphs(1),
// //         copyright: '©' + 1998 + ' ' + lorem.generateWords(2)
// //       });
// //     }

// //     writer.end();
// //     console.log(" -- postgres summary create csv done -- ");
// //   };

// //   return new Promise((resolve, reject) => {
// //     resolve(createCsvFile());
// //   })
// //     .then(() => {
// //       return this.seedPostgresSaveCSV("summary", "summary");
// //     })
// //     .then((value) => {
// //       console.log(
// //         " -- postgres save csv query query end --",
// //         value.command,
// //         "-",
// //         value.rowCount
// //       );
// //       postgres.end();
// //     })
// //     .catch((error) => {
// //       console.log("database seeding", error);
// //     });
// // };

// // const seedPostgresSummary = async (table, csvFile) => {
// //   const summaries = await db.query(
// //     `COPY ${table} (summary, short_summary, copyright) FROM '${currentDirectory}/${csvFile}.csv' WITH (FORMAT CSV, HEADER true, DELIMITER ',');`
// //   )
// //   return;
// // };

// // seedPostgresSummary('summary', 'summary');



// function seedDatabase() {
//   let csvData = [];
//   console.log(csvData)
//   return (
//     fastcsv
//     .parse()
//     .validate((data) => !contains(data[0], ','))
//     .on('data', (data) => {
//       csvData.push(data);
//     })
//     .on('data-invalid', (row, rowNumber) =>
//       console.log(`Invalid [rowNumber=${rowNumber}] [row=${JSON.stringify(row)}]`)
//     )
//   )
//   .on('end', () => {
//     const query = `COPY summary (summary, short_summary, copyright) FROM '${currentDirectory}/summaries.csv' WITH (FORMAT CSV, DELIMITER ',');`


//     db.connect((err,client, done) => {
//       if (err) throw err;

//       try {
//         client.query(query)
//           .then((res) => {
//             console.log('done')
//           })
//           .catch((err) => {
//             console.log(err);
//           })

//       } finally {
//         done();
//       }
//     })
//   })
// }
// async function seed() {
//   await writeToCsvFile();
//   console.log('written')
//   let stream = fs.createReadStream(filename);
//   stream.pipe(seedDatabase())
// }


// seed();




// CREATE TABLE summary (
//   bookId serial PRIMARY KEY,
//   summary TEXT,
//   short_summary TEXT,
//   copyright VARCHAR (50)
// )

const fs = require("fs");
const Pool = require("pg").Pool;
const pgp = require('pg-promise')()
const fastcsv = require("fast-csv");
const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const filename = 'summary.csv';
const stream = fs.createWriteStream(filename);

const pool = new Pool({
  host: '3.17.37.49',
  user:'postgres',
  database:'postgres',
  password:'postgres',
  port: 5432
});

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

};

function writeToCsvFile() {
  let rows = 1000;
  for (let index = 0; index <= rows; index++) {
    stream.write(createSummary(), 'utf-8')
  }
  stream.end();
}

async function seed() {
  await writeToCsvFile();
  console.log('written')
  let streams = fs.createReadStream("summary.csv");
  let csvData = [];

  let csvStream = fastcsv
    .parse()
    .on("data", function(data) {
      csvData.push(data);
    })
    .on("end", function() {
      const pool = new Pool({
          host: '3.17.37.49',
          user:'postgres',
          database:'postgres',
          password:'postgres',
          port: 5432
        });

        const query = `COPY summary (summary, short_summary, copyright) FROM '${currentDirectory}/summaries.csv' WITH (FORMAT CSV, DELIMITER ',');`

      pool.connect((err, client, done) => {
        if (err) throw err;

        try {
          // csvData.forEach(row => {
          //   client.query(query, row, (err, res) => {
          //     if (err) {
          //       console.log(err.stack);
          //     }
          //   });
          // });
          client.query(query)
          .then((res) => {
            console.log('done')
          })
          .catch((err) => {
            console.log(err);
          })

        } finally {
          done();
        }
      });
    });

  streams.pipe(csvStream);
}

seed();

