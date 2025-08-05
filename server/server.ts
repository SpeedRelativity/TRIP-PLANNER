import tripRoutes from "./routes/tripRoutes"
import express from "express"
import connectDb from "./config/db";
import dotenv from "dotenv"
import itineraryRoute from "./routes/itineraryRoute"
import cors from "cors";
dotenv.config();



const app = express();
const PORT=process.env.PORT;

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json())
app.use("/trips", tripRoutes);
app.use('/api/itinerary', itineraryRoute);

// main function to start server.
const main = async () => {
  await connectDb();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

app.get("/", (req, res) => {
  res.send("Trip Planner API is live!");
});


main();