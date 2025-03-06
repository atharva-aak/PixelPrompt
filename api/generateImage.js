export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const API_KEY = process.env.HF_API_KEY; // API key stored securely in environment variables
    const API_URL = "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "inputs": req.body.text }),
        });

        const imageBlob = await response.blob();
        const buffer = await imageBlob.arrayBuffer();
        res.setHeader("Content-Type", "image/png");
        res.send(Buffer.from(buffer));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
