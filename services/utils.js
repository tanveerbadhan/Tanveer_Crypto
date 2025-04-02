export const fetchRequest = async (url, method = "GET", body = null, headers = {}, options = {}) => {
    const config = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        ...options,
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Fetch error:", error);
        throw error;
    }
};
