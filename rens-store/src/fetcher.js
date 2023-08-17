const BASE_URL = "http://localhost:3001";

const fetcher = async (url) => {
    let responseObject = { errorMessage: '', data: [] };

    try {
        const response = await fetch(BASE_URL + url);
        //404error
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
        }
        //end of 404 error
        const responseData = await response.json();
        responseObject.errorMessage = '';
        responseObject.data = responseData;

        return responseObject;
        
    }
    catch (err) {
        responseObject.errorMessage = err.message;
        return responseObject;
    }
    
}

export const getCategories = () => {
    return fetcher('/categories');
}

export const getProducts = id => {
    return fetcher('/products?catId=' + id);
}