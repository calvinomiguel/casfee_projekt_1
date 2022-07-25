async function ajax(method, url, data) {
    if (method === "GET" || method === "DELETE") {
        console.log(method);
        return fetch(url, {
            method: method,
            headers: {}
        }).then(x => x.json());
    }
    return fetch(url, {
        method: method,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(x => x.json());
}

export {
    ajax
};