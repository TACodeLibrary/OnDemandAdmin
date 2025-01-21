import adminAPI from "../api";

export const userApi = adminAPI.injectEndpoints({
    endpoints: (builder) => ({
        customerList: builder.query<any, any>({
            query: ({ page, page_size, user_type, list_type, search_keyword }) => ({
                url: `/v1/admin-user-management/`,
                params: {
                    page,
                    page_size,
                    user_type,
                    list_type,
                    search_keyword,
                },
            }),
        }),
    }),
});

export const {
    useCustomerListQuery
} = userApi;
