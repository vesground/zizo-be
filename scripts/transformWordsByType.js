const fs = require('fs');
const { Transform } = require("stream");

const filePath = './assets/dictionary.json';

function mapFunc([type, words]) {
	return words.map(word => ({
			[word]: type,
	}))
}

function transformFunc(wordsByTypeDict) {
	const types = Object.entries(wordsByTypeDict);

	const typesWords = types
		.map(mapFunc)
		.flat()
	const typesByWords = Object.assign({}, ...typesWords);

	return typesByWords;
}

async function main() {
	const readerStream = fs.createReadStream(filePath, { encoding: 'binary'});
	const writerStream = fs.createWriteStream('./assets/typesByWords.json');

	const uppercase = new Transform({
		transform(chunk, encoding, callback) {
			const encodedChunk = chunk.toString('utf8');
			const parsedChunk = JSON.parse(encodedChunk);
			const transformedChunk = transformFunc(parsedChunk);
			const bufferChunk = Buffer.from(JSON.stringify(transformedChunk));

			callback(null, bufferChunk);
		},
	});
	
	readerStream.pipe(uppercase).pipe(writerStream);
}

main()