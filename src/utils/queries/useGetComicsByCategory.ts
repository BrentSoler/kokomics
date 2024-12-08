import { ApiResponse } from "@/types/ApiResponse";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { TComics } from "@/types/comics/TComics";

export function useGetComicsByCategories(category: string) {
    return useQuery({
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
            } catch (e: any) { }
        },
    });
}
