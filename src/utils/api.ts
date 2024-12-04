export const api = async (url: string, body?: object, req?: RequestInit) => {
    const res = await fetch(`${url}`, {
        ...req,
        headers: {
            accept: "application/json",
        },
        body: JSON.stringify(body),
        method:
            body == undefined
                ? "GET"
                : req?.method == undefined
                    ? "POST"
                    : req.method,
        cache: "force-cache",
    });

    const data = await res.json();

    if (res.status === 400) {
        throw new Error(data.message);
    }

    return data;
};
