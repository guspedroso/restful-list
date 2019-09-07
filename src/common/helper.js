export const handleResponse = (response) => {
    if (response.status === 404) {
        return Promise.reject("Not found");
    } else if (response.status === 500) {
        return Promise.reject("We are experiencing server issues");
    }

    return response.json().then(data => {
        if (!response.ok) {
            let message;
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                message = "Unauthorized";
            } else if (response.status === 400) {
                if (data && data.description) {
                    message = data.description;
                }
            }

            const error = message || (data && data.title) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export const handleError = (response) => {
    return Promise.reject(response);
}

export const authHeader = () => {
    // return authorization header with jwt token from local storage
    const token = null;

    if (token) {
        return {
            'Authorization': 'Bearer ' + token,
        };
    }

    return {};
}

export const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}
