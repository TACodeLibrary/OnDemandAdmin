import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ResetPasswordSchema } from '../../../schema';
import { z } from 'zod';
import { useNavigate } from 'react-router';


type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;

const ResetPassword = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordForm>({
        resolver: zodResolver(ResetPasswordSchema),
    });
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data: ResetPasswordForm) => {
        console.log("Form Submitted:", data);
        navigate('/')
        // Handle form submission logic (e.g., API call)
    };


    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-white">
            <div className="max-w-sm w-full space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-900">Reset Password</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* New Password Field */}
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter New Password"
                            {...register('newPassword')}
                            className="block w-full px-12 py-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showPassword ? "M13 10V6a1 1 0 012 0v4a1 1 0 01-2 0zm6 0V6a1 1 0 112 0v4a1 1 0 01-2 0z" : "M12 15v2a1 1 0 01-2 0v-2a1 1 0 012 0"} />
                            </svg>
                        </span>
                        {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Confirm New Password"
                            {...register('confirmPassword')}
                            className="block w-full px-12 py-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showPassword ? "M13 10V6a1 1 0 012 0v4a1 1 0 01-2 0zm6 0V6a1 1 0 112 0v4a1 1 0 01-2 0z" : "M12 15v2a1 1 0 01-2 0v-2a1 1 0 012 0"} />
                            </svg>
                        </span>
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-4 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;