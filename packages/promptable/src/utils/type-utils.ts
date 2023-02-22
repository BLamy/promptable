import { S } from 'ts-toolbelt';

export type ExtractFormatObject<TPrompt extends string> = {
  // Split on {{ and loop through result
  [K in S.Split<TPrompt, '{{'>[number] 
    // Scan everything up until }} into TName
    as K extends `${infer TName}}}${string}` ? TName 
      // Yeet anything that doesn't fit this pattern
      : never]: 
        // Type everything as a string
        string;
} 

// We still need a copy of source type to have source and distributed types
type Permutation<T, C = T> = 
  // Here we checks that source type is not empty
  [T] extends [never] ? [] 
    // Base case for recusion
    : C extends infer U ? 
      // 
      [U, ...Permutation<Exclude<T, U>>] : [];

export type ExtractVariableNames<TPrompt extends string> = Permutation<keyof ExtractFormatObject<TPrompt>>

