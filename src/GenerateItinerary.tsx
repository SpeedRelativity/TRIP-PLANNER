

const generateItinerary = async (prompt: string) => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY
  

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        
          {
          role: "system",
          content: "You are a travel assistant. ONLY respond with a valid JSON object. Do not include any explanation or formatting. Start and end with `{}` only. Include a Title"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2048
    })
  })

  const data = await response.json()
  
  return data.choices[0].message.content
}

export default generateItinerary
