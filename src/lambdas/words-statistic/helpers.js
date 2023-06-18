const Dictionary = require('./dictionary');

function parseText(text) {
    return text.split(' ');
}

const statisticTemplate = {
  noun: 0,
  verb: 0,
  adjective: 0,
  adverb: 0,
  preposition: 0,
  conjunction: 0,
  pronoun: 0,
  interjection: 0,
  determiner: 0,
  numeral: 0
}

function countWordsTypes(words) {
  let statistic = Object.assign({}, statisticTemplate);
  statistic = words.reduce((accum, word) => {
    const type = Dictionary[word];
    
    if (type) {
      accum[type] += 1;
    }
    
    return accum
  }, statistic);

  return statistic
}

module.exports = {
  parseText,
  countWordsTypes
}