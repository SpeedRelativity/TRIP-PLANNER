import tripRoutes from "./routes/tripRoutes"
import express from "express"
import connectDb from "./config/db";
import dotenv from "dotenv"
import itineraryRoute from "./routes/itineraryRoute"
import cors from "cors";
import sortRoute from "./routes/sortRoute";
import { all } from "axios";
dotenv.config();



const app = express();

const allowedOrigin = process.env.CLIENT_ORIGIN?.replace(/\/$/, "") || "http://localhost:5173";
console.log(allowedOrigin);
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));


const PORT = parseInt(process.env.PORT || "5000", 10);





app.use(express.json())
app.use("/trip", tripRoutes);
app.use('/api/itinerary', itineraryRoute);
app.use("/api/sort", sortRoute);

// main function to start server.
const main = async () => {
  await connectDb();
  app.listen(PORT, '0.0.0.0' ,() => console.log(`Server running on port ${PORT}`));
}

app.get("/", (req, res) => {
  res.send("Trip Planner API is live!");
});


main();