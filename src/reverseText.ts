import * as fs from 'fs';

class Stack<T> {
  private items: T[] = [];

  push(item: T) {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

function reverseWordsAndPunctuation(text: string): string {
  const wordsAndPunctuation = text.match(/[\w\d'’]+|[.,!?;:]/g); // Separa palavras e pontuações
  if (!wordsAndPunctuation) return '';

  const stack = new Stack<string>();

  for (const token of wordsAndPunctuation) {
    stack.push(token);
  }

  const reversedText = wordsAndPunctuation
    .map(() => stack.pop())
    .join(' ')
    .trim();

  return reversedText;
}

function processFile(inputFileName: string, outputFileName: string) {
  try {
    const inputText = fs.readFileSync(inputFileName, 'utf-8');
    const reversedText = reverseWordsAndPunctuation(inputText);

    fs.writeFileSync(outputFileName, reversedText);
    console.log(`File '${outputFileName}' has been created with the reversed text.`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

if (process.argv.length < 4) {
  console.error('Usage: node reverseText.js input.txt output_out.txt');
} else {
  const inputFileName = process.argv[2];
  const outputFileName = process.argv[3];

  processFile(inputFileName, outputFileName);
}
