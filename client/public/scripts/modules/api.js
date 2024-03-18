export const proxy = "http://localhost:5000"
const baseUrl = proxy + "/api/v1/"

const baseConfig = {
    headers: {
        'Content-Type': 'application/json',
    }
}

// urls
export const getCarsUrl = 'cars/'
export const searchCarsUrl = 'cars/search/'
export const getOptionsUrl = 'options/'


export const fetchRequest = async (fetchUrl, method = 'GET', body = null, config = baseConfig) => {
    const response = await fetch(`${baseUrl}${fetchUrl}`, {
        method: method,
        body: body,
        ...config
    });
    const resData = await response.json();

    if (!response.ok) {
        // eslint-disable-next-line no-throw-literal
        throw {message: resData, status: response.status};
    }
    return resData
}