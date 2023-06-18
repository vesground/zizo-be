const { parseText, countWordsTypes } = require('./helpers');

module.exports.handler = async (event) => {
  const requestBody = JSON.parse(event.body || {});
  const text = requestBody.text;
  
  const words = parseText(text);
  const wordsStatistic = countWordsTypes(words)
      
  const response = {
      statusCode: 200,
      body: JSON.stringify(wordsStatistic),
  };
  return response;
};
