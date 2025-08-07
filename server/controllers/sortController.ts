import axios from "axios";
import * as dotenv from 'dotenv';

dotenv.config()
console.log("sort.ts sent to backend received");
const sortTrip = async (request: any, response: any) => {
    try {
        const {activities} = request.body;
        if(!activities) {
            console.log("Missing activities");
            return response.status(400).json({error: "Missing required fields"});
        }
        console.log("Received activities");
        const prompt = `You are a travel planning assistant. Given a list of activities, sort them into a 3-day travel itinerary with time-based scheduling. Use this format:

{
  "Title": "Final Japan Itinerary",
  "Days": [
    {
      "Day": "Day 1",
      "Schedule": [
        {
          "time": "9:00 AM",
          "title": "Tokyo Skytree Visit",
          "location": "Tokyo",
          "notes": "Start the day with a panoramic view."
        },
        ...
      ]
    },
    ...
  ]
}

Activities:
${JSON.stringify(activities, null, 2)}`

const groqResponse = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
    model: "llama-3.3-70b-versatile",
    messages: [
          { role: "system", content: prompt },
          { role: "user", content: "Sort this into a travel timeline and return in the exact format above. Only respond with valid JSON. No markdown, no explanations." }
        ],
        temperature: 0.7,
        max_tokens: 2048
}, {
    headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
    }
});
     console.log("groq response received");
    const parsed = JSON.parse(groqResponse.data.choices[0].message.content);
    response.status(200).json(parsed);

    } catch (error) {
        console.error("Error sorting trip:", error);
        return response.status(500).json({ error: "Failed to sort trip" });
        
    }
};

export default sortTrip