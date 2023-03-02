import jsonwebtoken from 'jsonwebtoken';
import { BufferedChatMemory } from './BufferedChatMemory';

export type DecodedJwtChatHistory = { 
  botMessages: string[], 
  userMessages: string[],
  botName: string,
  userName: string,
  startingSpeaker: "user" | "bot",
  iat?: number,
}

export class HmacJwtChatMemory extends BufferedChatMemory {
  constructor(
    protected token = "",
    protected hmac = "secret",
    protected botName = "Assistant",
    protected userName = "User",
    protected startingSpeaker: "user" | "bot" = "user",
    protected maxInteractionTurns = Infinity
  ) {
    super(botName, userName, startingSpeaker, maxInteractionTurns);
    if (token !== "") {
      const decodedJwt = jsonwebtoken.verify(token, hmac) as DecodedJwtChatHistory;
      if (decodedJwt.botName === botName && decodedJwt.userName === userName && decodedJwt.startingSpeaker === startingSpeaker) {
        this.botMessages = decodedJwt.botMessages;
        this.userMessages = decodedJwt.userMessages;
      }
    }
  }

  static async deserailize() {
    
  }

  seralize() {
    return jsonwebtoken.sign({ 
      botMessages: this.botMessages,
      userMessages: this.userMessages,
      botName: this.botName,
      userName: this.userName,
      startingSpeaker: this.startingSpeaker
     }, this.hmac);
  }
}
