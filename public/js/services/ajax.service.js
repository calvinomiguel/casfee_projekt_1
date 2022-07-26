async function ajax(method, url, data) {
    if (method === "GET") {
        return fetch(url, {
            method: method,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        }).then(res => res.json());
    }

    if (method === "DELETE" || method === "PUT") {
        fetch(url, {
            method: method,
            headers: {}
        }).then(res => console.log(res));
    }

    if (method === "POST") {
        return fetch(url, {
            method: method,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(x => x.json());
    }
}

export {
    ajax
};