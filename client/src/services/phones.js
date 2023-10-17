async function fetchExtracted(url, options) {
    console.log('fetching:', url, options);
    const response = await fetch(url, options);
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const data = await response.json();

    if (!data) {
        return null;
    }
    return data;
}

 const getAllPhones = async () => {
    const url = '/api/phones/';
    return await fetchExtracted(url);
}

 const getPhoneById = async (id) => {
    const url = `/api/phones/${id}`;
    return await fetchExtracted(url);
};

 const createPhone = async (phoneData) => {
    const url = `/api/phones/`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(phoneData)
    };
    return await fetchExtracted(url, options);
};

 const updatePhone = async (id, newPhoneData) => {
    const url = `/api/phones/${id}`;
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPhoneData)
    };
    return await fetchExtracted(url, options);
};

 const deletePhone = async (id) => {
    const url = `/api/phones/${id}`;
    const options = {
        method: 'DELETE'
    };
    return await fetchExtracted(url, options);
};

export default {
    getAllPhones,
    getPhoneById,
    createPhone,
    updatePhone,
    deletePhone
};