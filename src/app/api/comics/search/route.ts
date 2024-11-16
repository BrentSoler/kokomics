import { TComicSearch } from "@/types/comics/TComics";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body: TComicSearch = await req.json();

    return Response.json({ ...body });
}
