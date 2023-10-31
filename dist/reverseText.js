"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
class Stack {
    constructor() {
        this.items = [];
    }
    push(item) {
        this.items.push(item);
    }
    pop() {
        return this.items.pop();
    }
    isEmpty() {
        return this.items.length === 0;
    }
}
function reverseWordsAndPunctuation(text) {
    const wordsAndPunctuation = text.match(/[\w\d'’]+|[.,!?;:]/g); // Separa palavras e pontuações
    if (!wordsAndPunctuation)
        return '';
    const stack = new Stack();
    for (const token of wordsAndPunctuation) {
        stack.push(token);
    }
    const reversedText = wordsAndPunctuation
        .map(() => stack.pop())
        .join(' ')
        .trim();
    return reversedText;
}
function processFile(inputFileName, outputFileName) {
    try {
        const inputText = fs.readFileSync(inputFileName, 'utf-8');
        const reversedText = reverseWordsAndPunctuation(inputText);
        fs.writeFileSync(outputFileName, reversedText);
        console.log(`File '${outputFileName}' has been created with the reversed text.`);
    }
    catch (error) {
        console.error('An error occurred:', error);
    }
}
if (process.argv.length < 4) {
    console.error('Usage: node reverseText.js input.txt output_out.txt');
}
else {
    const inputFileName = process.argv[2];
    const outputFileName = process.argv[3];
    processFile(inputFileName, outputFileName);
}
