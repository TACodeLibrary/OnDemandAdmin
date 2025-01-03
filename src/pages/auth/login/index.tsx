import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchema } from '../../../schema';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../../../rtk/endpoints/authApi';
import { toast } from 'sonner';
import { aesEncrypt } from '../../../utils/aes-encrypt-decrypt';

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
        try {
            const res = await login({
                email: aesEncrypt(email),
                password,
                device_token: 'deviceToken'
            }).unwrap();

            if (res?.error) {
                throw res.error
            }


            toast.success('Login Success!')

        } catch (error) {
            toast.error('Login Failed!')
            console.error(error);
        }
    };


    return (

        <div className="container">
            {/* Left Section */}
            <div className="left-section">
                <img src="/banner.jpg" alt="Description" className="banner-image" />
            </div>

            {/* Right Section */}
            <div className="right-section">
                <div className="form-container">
                    <h2 className="form-title">Welcome Back</h2>
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-fields">
                            {/* Email Field */}
                            <div className="input-group">
                                <input
                                    type="email"
                                    id="email"
                                    className="input-field"
                                    placeholder=""
                                    {...register('email')}
                                />
                                <label htmlFor="email" className="input-label">Email Address</label>
                            </div>
                            {errors.email && <span className="error-message">{errors.email.message}</span>}

                            {/* Password Field */}
                            <div className="input-group">
                                <input
                                    type="password"
                                    id="password"
                                    className="input-field"
                                    placeholder=""
                                    {...register('password')}
                                />
                                <label htmlFor="password" className="input-label">Password</label>
                            </div>
                            {errors.password && <span className="error-message">{errors.password.message}</span>}
                        </div>

                        {/* Forgot Password Link */}
                        <div className="forgot-password">
                            <a href="/forgot-password/find-account" className="forgot-password-link">Forgot Password?</a>
                        </div>

                        {/* Submit Button */}
                        <div className="button-container">
                            <button
                                type="submit"
                                className="submit-button"
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
