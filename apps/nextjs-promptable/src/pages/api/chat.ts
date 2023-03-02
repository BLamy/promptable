// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import * as promptable from "@promptable/promptable";

const openai = new promptable.OpenAI(process.env.OPENAI_API_KEY || "");

// Note: this only works for one client at a time.
const chatHistory = new promptable.BufferedChatMemory();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userInput, clear } = JSON.parse(req.body);

  // clear the chat history
  if (clear) {
    chatHistory.clear();
    return res.status(200).json({});
  }

  // get a response

  const prompt = promptable.prompts.chatbot();

  const memoryChain = new promptable.MemoryLLMChain(
    prompt,
    openai,
    chatHistory
  );

  chatHistory.addUserMessage(userInput);
  const botOutput = await memoryChain.run({ userInput });
  chatHistory.addBotMessage(botOutput);

  res.status(200).json({ text: botOutput });
}


// import { NextResponse } from 'next/server' @port * as promptable from "@promptable/prometable";
// const openai = new promptable. OpenAI (process. env. OPENAI _API _KEY || '');
// / Note: this only works• for one client at a time. const • chatHistory = new promptable. BufferedChatMemory () ;
// export async function GET (req: Request) {
// const • {• userInput, clear } = await req. json () ;
// //•clear the chat history if (clear)
// • chatHistory.clear() ;
// return •NextResponse. ison (£}) ;
// // • get a response
// const prompt = promptable. prompts. chatbot ( )
// •const-memoryChain = new promptable. MemoryLLMChain(
// • prompt,
// •onenai.
// chatHistory
// • chatHistory. addUserMessage (userInput) :
// const-botOutput = await memoryChain. run ({ userInput }) ;
// chatHistory.addBotMessage (botOutput);
// NextResponse.