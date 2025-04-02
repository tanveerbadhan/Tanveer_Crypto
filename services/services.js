import { fetchRequest } from ".";
import { URLS } from "./endPoints";

const fetchCryptoList = async (page = 0, limit = 15) => {
    const url = URLS.CRYPTO_LIST + `/?start=${page * limit}&limit=${limit}`;
    try {
        const response = await fetchRequest(url);
        return response?.data;
    } catch (error) {
        console.error("Error fetching crypto list:", error);
        throw error;
    }
};

export const SERVICES = {
    fetchCryptoList,
};
