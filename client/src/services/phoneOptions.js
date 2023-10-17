const API_URL = "/api/phoneOptions";

const getPhoneOptions = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error getting data:" + error);
    }
};

export default {
    getPhoneOptions,
};
