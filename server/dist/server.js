"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tripRoutes_1 = __importDefault(require("./routes/tripRoutes"));
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const itineraryRoute_1 = __importDefault(require("./routes/itineraryRoute"));
const cors_1 = __importDefault(require("cors"));
const sortRoute_1 = __importDefault(require("./routes/sortRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || "5000", 10);
const allowedOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use((0, cors_1.default)({
    origin: allowedOrigin,
    credentials: true
}));
app.use(express_1.default.json());
app.use("/trip", tripRoutes_1.default);
app.use('/api/itinerary', itineraryRoute_1.default);
app.use("/api/sort", sortRoute_1.default);
// main function to start server.
const main = async () => {
    await (0, db_1.default)();
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
};
app.get("/", (req, res) => {
    res.send("Trip Planner API is live!");
});
main();
