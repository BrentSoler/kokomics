export const api = async (url: string, body?: object, req?: RequestInit) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
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
