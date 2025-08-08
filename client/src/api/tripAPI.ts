// used to make requests to the backend
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const saveTrip = async (trip: {
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
        console.log("Saving trip");
        const data = await axios.post(`${BASE_URL}/trip`, trip);
        console.log(data);
        return data; // saved trip here
    } catch (error) {
        return error
    }
}

const getAllTrips = async () => {
    try {
        console.log("Getting all trips");
        const data = await axios.get(`${BASE_URL}/trip`);
        console.log(data);
        return data.data; // saved trip here
    } catch (error) {
        return error
    }
}

export { saveTrip, getAllTrips };