# ✈️ AI-Powered Trip Planner


A fullstack travel planning app that uses AI to generate personalized itineraries, lets users drag and drop activities into a custom list, and intelligently sorts them — all in a beautiful, interactive UI.

🚀 Live Demo → [https://trip-planner-uo9f.onrender.com]

> Example Prompt: `3-day trip to Tokyo focused on culture and food`

---

## 🧠 Features

- AI itinerary generation using Groq (OpenAI-compatible)
- User prompts define destination, style, and constraints
- Drag-and-drop UX to build a custom activity list
- Smart sorting with AI-powered clustering logic
- Google Maps links for each activity
- MongoDB for saving trip plans
- Fully deployed on Render (frontend, backend, DB)
- Dockerized for reproducibility

---

## 🧰 Tech Stack

| Layer       | Stack                                   |
|-------------|-----------------------------------------|
| Frontend    | React + Vite + TypeScript + TailwindCSS |
| Backend     | Node.js + Express + TypeScript          |
| AI Engine   | Groq (OpenAI-compatible API)            |
| DB          | MongoDB Atlas                           |                      |
| Hosting     | Render (Static Site + Web Service)      |
| Container   | Docker + Docker Compose (for dev)       |

---

## 📸 Screenshots

<!-- Add images to `public/screenshots/` and link here -->

<p align="center">
  <img src="./public/screenshots/main.png" width="600" />
  <img src="./public/screenshots/selection.png" width="600" />
  <img src="./public/screenshots/sorted.png" width="600" />
</p>

---

## ⚙️ Running Locally (Dockerized)

### Prereqs:
- Docker + Docker Compose
- Node.js (for local-only builds)

```bash
# Clone the repo
git clone https://github.com/yourusername/TRIP-PLANNER
cd TRIP-PLANNER

# Create .env files for client and server
# Example: ./server/.env
MONGO_URI=your_mongodb_uri
CLIENT_ORIGIN=http://localhost:5173
GROQ_API_KEY=your_key_here

# Example: ./client/.env
VITE_BACKEND_URL=http://localhost:5000
VITE_GOOGLE_API_KEY=your_key_here

# Start the stack
docker-compose up --build