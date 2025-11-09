// api/telegram.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { token, method, params } = req.body;
  if (!token || !method) {
    return res.status(400).json({ error: "token & method required" });
  }

  try {
    const url = `https://api.telegram.org/bot${token}/${method}`;
    const telegramRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: params ? JSON.stringify(params) : undefined,
    });

    const data = await telegramRes.text();
    res.status(telegramRes.status).send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
