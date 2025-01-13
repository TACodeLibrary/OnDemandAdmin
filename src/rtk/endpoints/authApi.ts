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
        logoutUser : builder.mutation<any,any>({
            query : (body : any ) => {
                console.log(body, "--body")
                return({
                    url : `/v1/user-auth/logout`,
                    method : 'POST',
                    body,
                    headers : {
                        "client-secret" : import.meta.env.VITE_APP_CLIENT_SECRET,
                        "Authorization": body.token
                    }
                })
            }
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutUserMutation
} = authAPI;