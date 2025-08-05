export const generateItinerary = async (prompt: string) => {
  console.log("Calling backend with prompt:", prompt);

  const response = await fetch("http://localhost:5000/api/itinerary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  console.log("Got response object:", response);

  if (!response.ok) {
    throw new Error(`Backend returned ${response.status}`);
  }

  const data = await response.json();
  console.log("Final JSON data:", data);
  return data;
};
