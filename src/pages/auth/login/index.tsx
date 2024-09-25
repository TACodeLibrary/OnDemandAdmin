import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchema } from '../../../schema';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../../../rtk/endpoints/authApi';
import { toast } from 'sonner';
import { aesDecrypt, aesEncrypt } from '../../../utils/aes-encrypt-decrypt';

type LoginSchema = z.infer<typeof LoginFormSchema>;

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: zodResolver(LoginFormSchema)
    });
    const [login, { isLoading }] = useLoginMutation();

    const onSubmit = async ({ email, password }: LoginSchema) => {
        console.log(aesEncrypt(email));
        console.log(aesDecrypt(aesEncrypt(email)))
        try {
            const res = await login({
                email : aesEncrypt(email),
                password,
                device_token : 'deviceToken'
            }).unwrap();

            if(res?.error){
                throw res.error
            }

            toast.success('Login Success!')

        } catch (error) {
            toast.error('Login Failed!')
            console.error(error);
        }
    };


    return (
        <div className="flex min-h-screen">
            {/* Left Section */}
            <div className="w-3/5 bg-gray-50">
                <img src="/banner.jpg" alt="Description" className="h-full blur-sm max-w-full h-auto" />
            </div>

            {/* Right Section */}
            <div className="w-2/5 flex bg-gray-50">
                <div className="w-full p-20 space-y-8 bg-white shadow-lg rounded-lg h-full flex flex-col borde justify-center align-center">
                    <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            {/* Email Field */}
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-solid ${errors.email ? 'border-red-500' : 'border-gray-300'} appearance-none peer`}
                                    placeholder=""
                                    {...register('email')}
                                />
                                <label
                                    htmlFor="email"
                                    className="ms-2 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                                >
                                    Email Address
                                </label>
                            </div>
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

                            {/* Password Field */}
                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-solid ${errors.password ? 'border-red-500' : 'border-gray-300'} appearance-none peer`}
                                    placeholder=""
                                    {...register('password')}
                                />
                                <label
                                    htmlFor="password"
                                    className="ms-2 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                                >
                                    Password
                                </label>
                            </div>
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <Link to="/forgot-password/find-account" className="font-medium text-primary hover:text-indigo-500">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Loading...' : 'Log In'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
