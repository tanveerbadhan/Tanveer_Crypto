import { fetchRequest } from "./utils";
import { URLS } from "./endPoints";

const fetchCryptoList = async (page = 0, limit = 15) => {
    const url = URLS.CRYPTO_LIST + `/?start=${page * limit}&limit=${limit}`;
    try {
        const response = await fetchRequest(url);
        return response?.data;
    } catch (error) {
        console.log("Error fetching crypto list:", error);
        return null;
    }
};

const fetchCrypto = async (id = "") => {
    const url = URLS.CRYPTO + id;
    try {
        const response = await fetchRequest(url);
        if (response?.length > 0) {
            return response[0];
        }
        return null;
    } catch (error) {
        console.log("Error fetching crypto:", error);
        return null;
    }
};

export const SERVICES = {
    fetchCryptoList,
    fetchCrypto,
};
