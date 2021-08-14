const { db } = require('./couchDB.js');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;


const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 5,
    min: 3
  },
  wordsPerSentence: {
    max: 12,
    min: 5
  },
  suffix: ' '
});

const createSummary = (index) => {
  const paragraphLength = Math.floor(Math.random() * 1.5 + 2);
  const shortSummarySentenceLength = Math.floor(Math.random() * 2 + 3);
  const copyrightWordsLength = Math.floor(Math.random() * 2 + 2);
  let summary = lorem.generateParagraphs(paragraphLength);
  let short_summary = lorem.generateSentences(shortSummarySentenceLength);
  const year = Math.floor(Math.random() * 81) + 1940;
  const copyright = '©' + year + ' ' + lorem.generateWords(copyrightWordsLength) + ' (P)' + (year + Math.floor(Math.random() * 5 + 4)) + ' ' + lorem.generateWords(copyrightWordsLength);
  const summaryData = {
    _id: `${index}`,
    summary: summary,
    short_summary: short_summary,
    copyright: copyright
  };
  return summaryData;
};

const createDocs = async (index) => {
  let docs = [];
  let startIndex = 0;
  if (index === 0) {
    startIndex = index
  } else {
    startIndex = index * 10000
  }
  let endIndex = startIndex + 9999;
  for (let i = startIndex; i <= endIndex; i++) {
    let doc = createSummary(i);
    docs.push(doc);
  }
  await db.bulk({docs})
};

const seed = async () => {
  for (let i = 0; i <= 999; i++) {
    await createDocs(i);
  }
  console.log('done');
};

seed();
