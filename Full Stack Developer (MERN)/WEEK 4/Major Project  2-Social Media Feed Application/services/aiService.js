async function callProvider(messages) {
  const key = process.env.AI_API_KEY;
  const base = process.env.AI_BASE_URL;
  const model = process.env.AI_MODEL;
  if (!key || !base || !model) {
    const error = new Error("AI is not configured. Add AI_API_KEY, AI_BASE_URL and AI_MODEL to backend/.env.");
    error.status = 503;
    throw error;
  }
  const response = await fetch(`${base.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model, messages, temperature: 0.7 })
  });
  if (!response.ok) throw new Error(`AI provider returned ${response.status}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "The AI provider returned no text.";
}

export async function chat(messages) {
  return callProvider(messages);
}

export async function promptTask(task, input) {
  return callProvider([
    { role: "system", content: "You are SocialHub AI. Give concise, useful social-media assistance." },
    { role: "user", content: `${task}\n\n${input}` }
  ]);
}

export async function imageAnalysis({ imageUrl, caption }) {
  return promptTask("Analyze the uploaded social-media image. Return a description, caption suggestion, hashtags and alt text. If you cannot inspect the image URL, say so clearly.", `Image URL: ${imageUrl}\nExisting caption: ${caption || "none"}`);
}
