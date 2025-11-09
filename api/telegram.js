// api/telegram.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    // ✅ Parse body manual
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { token, method, params } = body || {};

    if (!token || !method) {
      return res.status(400).json({ error: "Missing token or method" });
    }

    const apiUrl = `https://api.telegram.org/bot${token}/${method}`;

    const telegramRes = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: params ? JSON.stringify(params) : undefined,
    });

    const text = await telegramRes.text();
    res.status(telegramRes.status).send(text);
  } catch (err) {
    console.error("Relay error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}
