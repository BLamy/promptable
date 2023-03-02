import { Prompt } from "@prompts/Prompt";

test("Prompt Class", () => {
  const p = new Prompt("this is a {{test}}", { test: "123" });

  // saves the template
  expect(p.template.text).toEqual("this is a {{test}}");

  // Valid, returns a new prompt
  // const formattedPrompt = p.format({ test: "123" });
  expect(p.text).toEqual("this is a 123");
  // expect(formattedPrompt).not.toBe(p);

  // Invalid
  // expect(p.format({ invalid: "123" }).text).toEqual("this is a {{test}}");
});

test("Prompt without variables", () => {
  const p = new Prompt("this is a test", {});

  // saves the template
  expect(p.template.text).toEqual("this is a test");

  // Valid, returns a new prompt
  // const formattedPrompt = p.format({ test: "123" });
  expect(p.text).toEqual("this is a test");
  // expect(p).not.toBe(p);

  // Invalid
  // expect(p.format({ invalid: "123" })).toEqual("this is a test");
});
