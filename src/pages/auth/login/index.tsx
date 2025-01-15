import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchema } from '../../../schema';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../rtk/endpoints/authApi';
import { toast } from 'sonner';
import { aesEncrypt } from '../../../utils/aes-encrypt-decrypt';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { Logo } from '../../../utils/images';
import { FiEye, FiEyeOff, FiMail } from "react-icons/fi";
import { LiaKeySolid } from "react-icons/lia";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../rtk/features/authSlice';

type LoginSchema = z.infer<typeof LoginFormSchema>;

interface LoginResponse {
    data: {
        access_token: string;
        user: any;
        data: any;
    };
    error?: string;
}

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // Add this state
    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: zodResolver(LoginFormSchema)
    });
    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        // Check if already authenticated
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/landing');
        }
    }, [navigate]);

    const onSubmit = async ({ email, password }: LoginSchema) => {
        try {
            const res = await login({
                email: aesEncrypt(email),
                password,
                device_token: 'deviceToken'
            }).unwrap() as unknown as LoginResponse;

            if (res?.error) {
                throw res.error
            }
            localStorage.setItem('token', res.data.access_token);
            localStorage.setItem('user', JSON.stringify(res.data));

            dispatch(setAuth({
                access_token: res.data.access_token,
                user: res.data,
            }));
            toast.success('Login Success!')

            navigate("/landing", { replace: true });

        } catch (error) {
            toast.error('Login Failed!')
            console.error(error);
        }
    };

    return (
        <div className="login-wrapper">
            {/* Left Section */}
            <div className="left-section">
                <img src={Logo} alt="Description" className="banner-image" />
            </div>

            {/* Right Section */}
            <div className="right-section text-center">
                <div className="form-container">
                    <h2 className='title-large'>Welcome Back</h2>
                    <p className='mb-4 text-secondary'>Please enter your credentials to log into your account</p>
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            {/* Email Field */}
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3 field-transparent input-has-icon"
                            >
                                <FiMail className='icon-start'/>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    className={`input ${errors.email ? 'input-error' : ''}`}
                                    {...register('email')}
                                />


                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Password"
                                className="mb-3 field-transparent input-has-icon"
                            >
                                <Form.Control 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password"
                                className={`input pe-5 ${errors.password ? 'input-error' : ''}`}
                                {...register('password')}
                                />
                                <LiaKeySolid className="icon-start" />
                                <div
                                    className="icon-end cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </div>
                            </FloatingLabel>
                            {errors.password && <span className="error-text">{errors.password.message}</span>}
                        </div>

                        {/* Forgot Password Link */}
                        <div className="forgot-password text-end mb-3">
                            <Link to="/forgot-password/find-account" className="link-text">Forgot Password?</Link>
                        </div>

                        {/* Submit Button */}

                        <Button type="submit" disabled={isLoading} className='btn-full text-black'>
                            {isLoading ? 'Loading...' : 'Log In'}
                        </Button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
