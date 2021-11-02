# NFT Generator
## Overview
Project with the base logic for generating an NFT collection. Has an implementation for a basic "collection generator". To create your own project you'll need to implement the BaseNftGenerator that creates the proper NFT metadata that then maps to the correct image layers.

## Running
To run the generator with the example implementation and default config values:
```
npm start
```
Available arguments:

`--inputDir` or `-i`: Changes the directory of the input images.

`--outputDir` or `-o`: Changes the directory to export the nft images.

`--outputExt` or `-e`: Changes the file type of the generated images. All extensions supported by ImageMagick are valid here

`--count` or `-c`: Changes the number of NFTs that will be randomly generated. It's important that you don't pic too large a number. If the number of possible unique NFTs is fewer than the number being generated, the program will run forever.

### Ex:
```
npm start -- -i ./my-input-dir -o ./my-output-dir -e jpg -c 100
```
