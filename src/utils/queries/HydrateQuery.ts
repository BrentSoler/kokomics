import { dehydrate, FetchQueryOptions, QueryKey } from "@tanstack/react-query";
import getQueryClient from "./getQueryClient";

export default function HydrateQuery(
    cb: FetchQueryOptions<unknown, Error, unknown, QueryKey, never>,
) {
    const queryClient = getQueryClient();
    queryClient.prefetchQuery(cb);
    const dehydratedState = dehydrate(queryClient);

    return dehydratedState;
}
