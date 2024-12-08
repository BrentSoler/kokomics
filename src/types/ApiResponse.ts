export type ApiResponse<T> = {
    message: string;
    isCached: boolean;
    data: T;
};
