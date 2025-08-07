"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tripController_1 = require("../controllers/tripController");
const router = express_1.default.Router();
router.get('/', tripController_1.getAllTrips);
router.get('/:id', tripController_1.getTripById);
router.post('/', tripController_1.createTrip);
exports.default = router;
