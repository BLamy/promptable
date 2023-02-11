#!/usr/bin/env node

import promptSimple from "./prompt-simple";
import promptMultiple from "./prompt-sequential";
import promptParallel from "./prompt-parallel";

import embeddings from "./embeddings";
import embeddingsQA from "./embeddings-qa";
import embeddingsSearch from "./embeddings-search";

import qaSimple from "./qa-simple";
import qaChunks from "./qa-chunks";
import qaExtract from "./qa-extract";
import qaFromNotes from "./qa-from-notes";

import summarize from "./summarize";
import summarizeChunks from "./summarize-chunks";
import summarizeRecursive from "./summarize-recursive";

import parseJson from "./parse-json";
import parseCSV from "./parse-csv";

import tokenCount from "./token-count";

import splitNewlines from "./split-newlines";
import splitParagraphs from "./split-paragraphs";
import splitSentences from "./split-sentences";
import splitTokens from "./split-tokens";
import splitWords from "./split-words";

import chunkSentences from "./chunk-sentences";

// Add examples here!

const examples = {
  "prompt-simple": promptSimple,
  "prompt-multiple": promptMultiple,
  "prompt-parallel": promptParallel,

  embeddings: embeddings,
  "embeddings-qa": embeddingsQA,
  "embeddings-search": embeddingsSearch,

  "qa-simple": qaSimple,
  "qa-chunks": qaChunks,
  "qa-extract": qaExtract,
  "qa-from-notes": qaFromNotes,

  summarize: summarize,
  "summarize-chunks": summarizeChunks,
  "summarize-recursive": summarizeRecursive,

  "parse-json": parseJson,
  "parse-csv": parseCSV,

  "token-count": tokenCount,

  "split-newlines": splitNewlines,
  "split-paragraphs": splitParagraphs,
  "split-sentences": splitSentences,
  "split-tokens": splitTokens,
  "split-words": splitWords,

  "chunk-sentences": chunkSentences,
};

const isExample = (arg: string): arg is keyof typeof examples =>
  arg in examples;

async function run(args: string[]) {
  const example = args[0];
  const params = args.slice(1);

  if (!isExample(example)) {
    console.error(`Unrecognized example: ${example}`);
    return;
  }

  await examples[example](params);
}

run(process.argv.slice(2));

export {};