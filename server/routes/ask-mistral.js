// routes/ask-mistral.js
import express from "express";
import dotenv from "dotenv";
import { InferenceClient } from "@huggingface/inference";
dotenv.config();
const router = express.Router();
const client = new InferenceClient(process.env.HF_TOKEN);

router.post("/", async (req, res) => {
  try {
    const { prompt, metrics } = req.body;

    const context = `
You are an expert on geography and environmental science helping your buddy. Answer the student's question,

--- Region Data ---
Latitude: ${metrics.lat}
Longitude: ${metrics.lon}
NDVI (Vegetation Index): ${metrics.ndvi}
LST (Land Surface Temp): ${metrics.lst}°C
Rainfall (annual): ${metrics.rainfall} mm
Water Frequency: ${metrics.waterFreq}%
Population Density: ${metrics.popDensity} people/km²

--- Student's Question ---
"${prompt}"

--- Guidelines for Response ---
1. You're the student's buddy, so answer like one.
2. Figure out the name of the region based on the metrics.
3. Answer the question in a one liner before explaining it and breaking it down.
4. Provide a detailed explanation with clarity, based specifically on what student asks.
5. Use the metrics to aid your answer.
6. Ask 1 or 2 follow-up questions to engage the student in deeper thinking.
7. Suggest relevant learning links or resources


Respond in a friendly, intelligent tone like a passionate professor.
`;

    const chatCompletion = await client.chatCompletion({
      provider: "nebius",
      model: "mistralai/Mistral-Small-3.1-24B-Instruct-2503",
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: context }],
        },
      ],
    });

    const answer = chatCompletion.choices[0].message.content;

    res.status(200).json({ answer });
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
