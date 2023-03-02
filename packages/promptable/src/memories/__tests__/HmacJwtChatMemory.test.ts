import { HmacJwtChatMemory, DecodedJwtChatHistory } from "@memory/HmacJwtChatMemory";
import jsonwebtoken from 'jsonwebtoken';

const JWT_REGEX = /^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/;
const HMAC = "secret";
const EMPTY_CONVO_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib3RNZXNzYWdlcyI6W10sInVzZXJNZXNzYWdlcyI6W10sImJvdE5hbWUiOiJBc3Npc3RhbnQiLCJ1c2VyTmFtZSI6IlVzZXIiLCJzdGFydGluZ1NwZWFrZXIiOiJ1c2VyIiwiaWF0IjoxNjc3NjQ4ODMyfQ.c7nPreITD51ZY3E7oM7CwM3k2PE6yaKv7amkz07IDeQ";

test("HmacJwtChatMemory", async () => {
    const jwtMemory = await new HmacJwtChatMemory(EMPTY_CONVO_JWT, HMAC);
    expect(jwtMemory.get()).toEqual('')
    const firstJwt = jwtMemory.seralize();
    expect(firstJwt.match(JWT_REGEX)).toHaveLength(1)
    const firstJwtDecoded = jsonwebtoken.verify(firstJwt, HMAC) as DecodedJwtChatHistory
    delete firstJwtDecoded.iat;
    expect(firstJwtDecoded).toEqual({
        botMessages: [],
        botName: 'Assistant',
        startingSpeaker: 'user',
        userMessages: [],
        userName: 'User'
    })

    const USER_MESSAGE = "USER_MESSAGE"
    jwtMemory.addUserMessage(USER_MESSAGE)
    const BOT_MESSAGE = "BOT_MESSAGE"
    jwtMemory.addBotMessage(BOT_MESSAGE)
    const secondJwt = jwtMemory.seralize();
    expect(jwtMemory.get()).toEqual('User: USER_MESSAGE\nAssistant: BOT_MESSAGE')
    expect(secondJwt.match(JWT_REGEX)).toHaveLength(1)
    expect(firstJwt).not.toEqual(secondJwt);

    const secondJwtDecoded = jsonwebtoken.verify(secondJwt, HMAC) as DecodedJwtChatHistory
    delete secondJwtDecoded.iat;
    expect(secondJwtDecoded).toEqual({
        botMessages: [BOT_MESSAGE],
        botName: 'Assistant',
        startingSpeaker: 'user',
        userMessages: [USER_MESSAGE],
        userName: 'User'
    });

    jwtMemory.clear();
    expect(jwtMemory.get()).toEqual('')
    const thirdJwt = jwtMemory.seralize();
    const thirdJwtDecoded = jsonwebtoken.verify(thirdJwt, HMAC) as DecodedJwtChatHistory
    delete thirdJwtDecoded.iat;
    expect(thirdJwtDecoded).toEqual({
        botMessages: [],
        botName: 'Assistant',
        startingSpeaker: 'user',
        userMessages: [],
        userName: 'User'
    })
});
