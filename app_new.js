import React, { useState } from "react";
import axios from "axios";

const GEMINI_API_KEY = "your-key"; // Replace with your actual API key
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const callGeminiAPI = async (lifestyle, foodhabits) => {
  try {
    const prompt = "Provide the response in well formatted html with basic css. Your a fiteness coach, analyse my lifestyle and food habits and create a personalised fitness plan for me . Here is my lifestyle information : " + lifestyle + " here is my food habits : " + foodhabits;

    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received";;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return null;
  }
};

const App = () => {
  const [lifestyle, setLifestyle] = useState("");
  const [foodhabits, setFoodhabits] = useState("");
  const [responseText, setResponseText] = useState("");

  const handleGenerateResponse = async () => {
    if (!lifestyle || !foodhabits) return;
    const result = await callGeminiAPI(lifestyle, foodhabits);
    if (result) {
      setResponseText(result);
    }
  };

  return (
    <div>
      <h2>Gemini API Call</h2>
      <input
        type="text"
        value={lifestyle}
        onChange={(e) => setLifestyle(e.target.value)}
        placeholder="Enter Lifestyle"
      />
      <input
        type="text"
        value={foodhabits}
        onChange={(e) => setFoodhabits(e.target.value)}
        placeholder="Enter Food Habits"
      />
      <button onClick={handleGenerateResponse}>Generate Response</button>
      {responseText && <div dangerouslySetInnerHTML={{ __html: responseText }} />}
    </div>
  );
};

export default App;
