import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ResetPasswordSchema } from '../../../schema';
import { z } from 'zod';
import { useNavigate } from 'react-router';
import { Logo } from '../../../utils/images';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { LiaKeySolid } from 'react-icons/lia';
import { useResetPasswordMutation } from '../../../rtk/endpoints/authApi';
type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;

const ResetPassword = () => {
    const navigate = useNavigate();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordForm>({
        resolver: zodResolver(ResetPasswordSchema),
    });
    // const [showPassword, setShowPassword] = useState(false);
    const verificationData = JSON.parse(localStorage.getItem('otpVerificationResponse') || '{}');
    console.log(verificationData?.data?.user_uuid, 'VVVVVVVV')
    const onSubmit = async (data: ResetPasswordForm) => {
        console.log("Form Submitted:", data);
        console.log("Validation Errors:", errors);
        // navigate('/')
        try {
            const res= await resetPassword({
                user_uuid: verificationData?.data?.user_uuid,
                password: data.confirmPassword, 
             }).unwrap();
             console.log(res, 'PASSWORD RESPONSE')
             navigate("/");
           } catch (error) {
             console.error('Failed to reset password:', error);
           }
    };

    const onError = (errors: any) => {
        console.log('Form Errors:', errors);
    };
    return (
        <div className="login-wrapper">
            {/* Left Section */}
            <div className="left-section">
                <img src={Logo} alt="Description" className="banner-image" />
            </div>
            <div className="right-section text-center">
                <div className="form-container">
                    <h2 className='title-large'>Reset Password</h2>
                    <p className='mb-4 text-secondary'>Please enter your credentials to retrieve your account</p>
                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                        {/* New Password Field */}
                        <div className="form-group">

                            <FloatingLabel
                                controlId="floatingPassword"
                                label="Password"
                                className="mb-3 field-transparent input-has-icon"
                            >
                                <LiaKeySolid />
                                <Form.Control
                                    type="password"
                                    className={`input ${errors.newPassword ? 'input-error' : ''}`}
                                    {...register('newPassword')}
                                />
                            </FloatingLabel>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="form-group">
                            <FloatingLabel
                                controlId="floatingPassword"
                                label="Confirm Password"
                                className="mb-3 field-transparent input-has-icon"
                            >
                                <LiaKeySolid />
                                <Form.Control
                                    type="password"
                                    className={`input ${errors.confirmPassword ? 'input-error' : ''}`}
                                    {...register('confirmPassword')}
                                />
                            </FloatingLabel>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className='btn-full text-black'
                            >
                                {isLoading ? 'Processing...':'Update'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default ResetPassword;