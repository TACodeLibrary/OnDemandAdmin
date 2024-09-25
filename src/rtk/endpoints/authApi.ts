import adminAPI from "../api";

export const authAPI = adminAPI.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<Record<string,string>, Record<string,string>>({
            query: (body) => ({
                url: '/v1/user-auth/email-password',
                method: 'PATCH',
                body,
                headers : {
                    "client-secret" : import.meta.env.VITE_APP_CLIENT_SECRET
                }
            }),
        }),
    }),
});

export const {
    useLoginMutation
} = authAPI;