import React, { useState } from "react";
import axios from "axios";

const GEMINI_API_KEY = "Your-api-key"; // Replace with your actual API key
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const callGeminiAPI = async (lifestyle, foodhabits) => {
  try {
    const prompt = `Lifestyle: ${lifestyle}, Food Habits: ${foodhabits}`;
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
      {responseText && <p>{responseText}</p>}
    </div>
  );
};

export default App;
