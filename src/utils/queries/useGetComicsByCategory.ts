import { ApiResponse } from "@/types/ApiResponse";
import { api } from "../api";
import { TComics } from "@/types/comics/TComics";

export function GetComicsByCategories({ category }: { category: string }) {
    return {
        queryKey: ["comics-categories", category],
        queryFn: async () => {
            try {
                const res: ApiResponse<TComics[]> = await api(
                    `/api/comics/${category}`,
                );

                if (res.isCached) {
                    api(`/api/comics/${category}`, {}, { method: "PUT" });
                }

                return res.data;
            } catch (e: unknown) {
                console.log((e as Error).message);
            }
        },
    };
}
