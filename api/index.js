export default async function handler(req, res) {
  // If someone just opens the link in a browser (GET), show a clean message
  if (req.method === "GET") {
    return res.status(200).send("!");
  }

  const TARGET =
    process.env.TENDERLY_RPC ||
    "https://virtual.binance.eu.rpc.tenderly.co/ec4b27d4-2fc8-41ef-88b4-dc261db27b6e";

  try {
    const response = await fetch(TARGET, {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(response.status).send(text);
  } catch (err) {
    res.status(500).json({ error: "Proxy error", message: err.message });
  }
}

