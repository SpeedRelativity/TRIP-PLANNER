// used to make requests to the backend
import axios from "axios";

const BASE_URL = "http://localhost:5001";

export const saveTrip = async (trip: {
    title: string;
    prompt: string;
    activities: {
        id: string;
        title: string;
        location: string;
        description: string;
    }[];
    generatedItinerary: string;
}) => {
    try {
        const response = await axios.post(`${BASE_URL}/save-trip`, trip);
        return response.data;
    } catch (error) {
        return error
    }
}