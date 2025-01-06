import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchema } from '../../../schema';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../../../rtk/endpoints/authApi';
import { toast } from 'sonner';
import { aesEncrypt } from '../../../utils/aes-encrypt-decrypt';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { Logo } from '../../../utils/images';

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
        <div className="login-wrapper">
            {/* Left Section */}
            <div className="left-section">
                <img src={Logo} alt="Description" className="banner-image" />
            </div>

            {/* Right Section */}
            <div className="right-section">
                <div className="form-container">
                    <h2 className="title-h2">Welcome Back</h2>
                    <p className="title-h5 mb-2">Please enter your credentials to log into your account</p>
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            {/* Email Field */}
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
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
                                className="mb-3"
                            >
                                <Form.Control type="password" placeholder="Password"
                                className={`input ${errors.password ? 'input-error' : ''}`}
                                {...register('password')}
                                />
                            </FloatingLabel>
                            {errors.password && <span className="error-text">{errors.password.message}</span>}
                        </div>

                        {/* Forgot Password Link */}
                        <div className="forgot-password">
                            <Link to="/forgot-password/find-account" className="">Forgot Password?</Link>
                        </div>

                        {/* Submit Button */}
                        <div className="button-container">
                            
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Log In'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
