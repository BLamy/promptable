import { Prompt, prompt } from '@prompts/Prompt';

test("Prompt Class", () => {
    const p = new Prompt("this is a {{test}}", ['test']);
    expect(p.format({ test: "123" })).toEqual("this is a 123");
    // @ts-expect-error
    expect(p.format({ invalid: "123" })).toEqual("this is a {{test}}");
    // @ts-expect-error
    new Prompt("this is a {{test}}", []);
    // @ts-expect-error
    new Prompt("this is a {{test}}", ["asdf"]);
})

test("Multiple arguments", () => {
    const p = new Prompt("this is a {{test}} {{test2}}", ["test", "test2"]);
    expect(p.format({ test: "1", test2: "2" })).toEqual("this is a 1 2")
});

test("Prompt Class", () => {
    const p = prompt("this is a {{test}}", ['test']);
    expect(p.format({ test: "123" })).toEqual("this is a 123");
    // @ts-expect-error
    expect(p.format({ invalid: "123" })).toEqual("this is a {{test}}");
})