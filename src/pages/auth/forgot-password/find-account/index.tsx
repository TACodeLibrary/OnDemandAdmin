import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { FindAccountSchema } from '../../../../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type FindAccountForm = z.infer<typeof FindAccountSchema>;

const FindAccount = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FindAccountForm>({
        defaultValues: {
            email: ''
        },
        resolver: zodResolver(FindAccountSchema)
    });

    const onSubmit = (data: any) => {
        console.log(data);
        navigate("/forgot-password/verify-account");

        // Handle form submission logic here
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-white">
            <div className="max-w-sm w-full space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-900">Find Your Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Enter Email Address"
                            {...register("email", { required: "Email is required" })}
                            className="block w-full px-4 py-3 bg-gray-50 text-gray-900 text-sm rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FindAccount;
