import { tools, toolSchemas } from "./server.js";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function agentLoop(task) {
  let messages = [
    { role: "system", content: "You are a browser automation agent." },
    { role: "user", content: task }
  ];

  while (true) {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages,
      tools: toolSchemas,
      tool_choice: "auto"
    });

    const msg = response.choices[0].message;

    if (!msg.tool_calls) {
      console.log("✅ Final answer:", msg.content);
      break;
    }

    for (const call of msg.tool_calls) {
      const fn = tools[call.function.name];
      const args = JSON.parse(call.function.arguments);
      const result = await fn(args);

      messages.push(msg);
      messages.push({
        role: "tool",
        tool_call_id: call.id,
        content: result
      });
    }
  }
}

agentLoop("Open playwright.dev and tell me the page title");

