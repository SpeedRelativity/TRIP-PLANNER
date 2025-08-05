import tripRoutes from "./routes/tripRoutes"
import express from "express"
import dotenv from "dotenv"
dotenv.config();

const app = express();
const PORT=process.env.PORT;

app.use(express.json())
app.use("/trips", tripRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("Trip Planner API is live!");
});

