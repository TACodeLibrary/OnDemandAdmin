import ForgotPassword from "../../pages/auth/forgot-password";
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
                // console.log(body, "--body")
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
        ForgotPassword : builder.mutation<any,any>({
            query : (body : any) => {
                return{
                    url : `/v1/user-auth/forgot-password`,
                    method : 'PUT',
                    body,
                    headers : {
                        "client-secret" : import.meta.env.VITE_APP_CLIENT_SECRET
                    }
                }
            }
        }),
        verifyOtp : builder.mutation<any,any>({
            query : (body : any) => {
                return{
                    url : `/v1/user-auth/verify-otp`,
                    method : 'PUT',
                    body,
                    headers : {
                        "client-secret" : import.meta.env.VITE_APP_CLIENT_SECRET
                    }
                }
            }
        }),
        resetPassword : builder.mutation<any,any>({
            query : (body : any) => {
                return{
                    url : `/v1/user-auth/reset-password`,
                    method : 'PATCH',
                    body,
                    headers : {
                        "client-secret" : import.meta.env.VITE_APP_CLIENT_SECRET
                    }
                }
            }
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutUserMutation,
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation
} = authAPI;