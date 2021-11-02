import { DateTime } from 'luxon';
import minimist from 'minimist';
import { ColorNftGenerator } from './nft-generator/color-nft-generator.js';

async function main() {
    const start = DateTime.now();
    console.log('start:', start.toString());
    const { inputFile, outputFile, outputFileExt, count } = getInputs();

    console.log('---------- INPUTS ----------');
    console.log('nfts to generate:', count);
    console.log('input dir:', inputFile);
    console.log('output dir:', outputFile);
    console.log('output file ext:', outputFileExt);
    console.log('----------------------------');
    console.log('');

    const generator = new ColorNftGenerator(inputFile, outputFile, outputFileExt);
    const nfts = generator.generateNftCollection(count);

    console.log('nft metadata generation complete!');
    console.log('');
    console.log('timestamp:', DateTime.now().toString());
    console.log('duration:', DateTime.now().diff(start, ['minutes', 'seconds']).toObject());
    console.log('');
    console.log('writing images....');

    await generator.writeNftImages(nfts);

    console.log('');
    console.log('DONE!');
    const end = DateTime.now();
    console.log('end:', end.toString());
    console.log('duration:', end.diff(start, ['minutes', 'seconds']).toObject());
}

function getInputs() {
    const args = minimist(process.argv.slice(2));
    return {
        inputFile: args['inputDir'] || args['i'] || './test-pics',
        outputFile: args['outputDir'] || args['o'] || './generated-pics',
        outputFileExt: args['outputExt'] || args['e'] || 'png',
        count: args['count'] || args['c'] || 10
    };
}

main();
