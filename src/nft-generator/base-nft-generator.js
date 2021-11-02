import im from 'imagemagick';
import logUpdate from 'log-update';

const baseParams = ['-gravity', 'center', '-background', 'None', '-layers', 'Flatten'];

export class BaseNftGenerator {
    inputDir;
    outputDir;
    outputFileExt;

    constructor(inputDir, outputDir, outputFileExt) {
        this.inputDir = inputDir;
        this.outputDir = outputDir;
        this.outputFileExt = outputFileExt;
    }

    generateNftCollection(nftToGenerate) {
        const nfts = [];
        const nftHashes = new Set();
        const padding = ('' + nftToGenerate).length;
        do {
            const nft = this.generateNft();
            const nftHash = this.getNftHash(nft);
            if (!nftHashes.has(nftHash)) {
                nft.Name = this.namePrefix() + ('' + (nfts.length + 1)).padStart(padding, '0');
                nftHashes.add(nftHash);
                nfts.push(nft);
                logUpdate('nft metadata generated:', nfts.length);
            }
        } while (nfts.length < nftToGenerate);
        logUpdate.done();
        return nfts;
    }

    async writeNftImages(nfts) {
        const BATCH_SIZE = 10;
        for (let i = 0; i < nfts.length; i += BATCH_SIZE) {
            const batch = [];
            for (let j = 0; j < BATCH_SIZE && i + j < nfts.length; ++j) {
                const nft = nfts[i + j];
                const params = [
                    ...this.getImageLayers(nft),
                    ...baseParams,
                    `${this.outputDir}/${this.getNftHash(nft)}.${this.outputFileExt}`
                ];
                batch.push(params);
            }
            await Promise.all(batch.map((params) => this._writeImg(params)));
            logUpdate('nfts written:', i + batch.length);
        }
        logUpdate.done();
    }

    // Abstract

    namePrefix() {
        throw new Error('namePrefix() not implemented!');
    }

    getImageLayers(nft) {
        throw new Error('getImageLayers() not implemented!');
    }

    generateNft() {
        throw new Error('generateNft() not implemented!');
    }

    getNftHash(nft) {
        throw new Error('getNftHash() not implemented!');
    }

    // Private

    _writeImg(params) {
        return new Promise((resolve, reject) => {
            im.convert(params, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
}
