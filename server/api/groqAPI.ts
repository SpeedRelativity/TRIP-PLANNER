import * as dotenv from "dotenv";
import axios from "axios";
dotenv.config();


export const generateItineraryfromPrompt = async (prompt: string) => {

    const apiKey = process.env.GROQ_API_KEY

    // axios.post takes 3 parameters: url, data, configuration
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [

            {
            role: "system",
            content: `You are a travel assistant. ONLY respond with a valid JSON array of activities. Do not include any explanation or formatting. Each activity must include:

                {
                "id": "unique string ID",
                "title": "Short title of the activity",
                "location": "City or region",
                "description": "Brief description of what the activity involves"
                }

                Generate 5 diverse activities across multiple popular locations based on the user's input. Ensure JSON array is valid. No markdown, no text outside the array.`
            }
          ,
            {
            role: "user",
            content: prompt,
            },
        ],
        temperature: 0.7, // randomness
        max_tokens: 2048, // token limit to save cost
      },
      {
        // auth takes Bearer prefix with a token
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    return JSON.stringify(response.data.choices[0].message.content);
    
    
};