export default async function endpoint(cb: () => Promise<Response>) {
    try {
        return await cb();
    } catch (e: any) {
        return Response.json({ message: e.message, data: "" }, { status: 400 });
    }
}
