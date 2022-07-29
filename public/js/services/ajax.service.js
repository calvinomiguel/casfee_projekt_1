async function ajax(method, url, data) {
    const headers = method === "DELETE" || (method === "PUT" && data === undefined) ? {} : {
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    
    const body = data === undefined ? {} : {
        body: JSON.stringify(data)
    };

    const options = {
        method: method,
        headers: headers,
        ...body,
    };

    return fetch(url, {
        ...options
    }).then(res => res.json());
}

export {
    ajax
};