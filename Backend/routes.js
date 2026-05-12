import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/analyze", async (req, res) => {
  try {
    const { error } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const prompt = `
Analyze this programming error.

Return ONLY valid JSON.

Format:
{
  "explanation": "",
  "cause": "",
  "fix": "",
  "prevention": ""
}

Error:
${error}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedData = JSON.parse(cleanedText);

    res.json({
      success: true,
      data: parsedData,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

export default router;
