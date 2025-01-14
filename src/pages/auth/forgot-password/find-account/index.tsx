import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { FindAccountSchema } from '../../../../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Logo } from '../../../../utils/images';
import { Button } from 'react-bootstrap';
import { FloatingLabel, Form } from 'react-bootstrap';
import { FiMail } from 'react-icons/fi';
import { useForgotPasswordMutation } from '../../../../rtk/endpoints/authApi';
import { aesEncrypt } from '../../../../utils/aes-encrypt-decrypt';
type FindAccountForm = z.infer<typeof FindAccountSchema>;

const FindAccount = () => {
    const navigate = useNavigate();
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<FindAccountForm>({
        defaultValues: {
            email: ''
        },
        resolver: zodResolver(FindAccountSchema)
    });

    const onSubmit = async (data: FindAccountForm) => {
        
        try {
            localStorage.setItem('forgotPasswordEmail', data.email);
            await forgotPassword({
                email: aesEncrypt(data.email)
            }).unwrap();
            navigate("/forgot-password/verify-account");
        } catch (error) {
            console.error('Failed to submit forgot password request:', error);
            // You might want to add error handling here (e.g., toast notification)
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
                    <h2 className='title-large'>Find Your Account</h2>
                    <p className='mb-4 text-secondary'>Please enter your credentials to retrieve your account</p>
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            {/* Email Field */}
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3 field-transparent input-has-icon"
                            >
                                <FiMail />
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    className={`input ${errors.email ? 'input-error' : ''}`}
                                    {...register('email')}
                                />


                            </FloatingLabel>
                        </div>

                        {/* Forgot Password Link */}


                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className='btn-full text-black'
                        >
                            {isLoading ? 'Processing...' : 'Find Account'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FindAccount;
