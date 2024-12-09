export default async function endpoint(cb: () => Promise<Response>) {
    try {
        return await cb();
    } catch (e: unknown) {
        return Response.json(
            { message: (e as Error).message, data: "" },
            { status: 400 },
        );
    }
}
