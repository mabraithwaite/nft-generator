import { BaseNftGenerator } from './base-nft-generator.js';

const ratios = {
    r: 30,
    o: 25,
    y: 20,
    g: 15,
    b: 10,
    p: 5
};
const ratioKeys = Object.keys(ratios).sort();
const sizes = ['xl', 'l', 'm', 's', 'xs'];

export class ColorNftGenerator extends BaseNftGenerator {
    constructor(inputDir, outputDir, outputFileExt) {
        super(inputDir, outputDir, outputFileExt);
    }

    namePrefix() {
        return 'Color Box #';
    }

    generateNft() {
        const nft = {};
        let prev;
        for (const size of sizes) {
            let color;
            do {
                color = this._getColor();
            } while (prev === color);
            nft[size] = color;
            prev = color;
        }
        return nft;
    }

    getNftHash(nft) {
        return sizes.map((size) => nft[size]).join('');
    }

    getImageLayers(nft) {
        return sizes.map((size) => this._getInputFilePath(size, nft[size]));
    }

    _getInputFilePath(size, color) {
        return `${this.inputDir}/${size}-${color}.png`;
    }

    _getColor() {
        const ranNum = Math.random() * 100;
        let ratio = 0;
        for (const key of ratioKeys) {
            ratio += ratios[key];
            if (ranNum < ratio) {
                return key;
            }
        }
        throw new Error('Not able to generate a color');
    }
}
