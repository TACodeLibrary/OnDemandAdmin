import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ResetPasswordSchema } from '../../../schema';
import { z } from 'zod';
import { useNavigate } from 'react-router';
import { Logo } from '../../../utils/images';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { LiaKeySolid } from 'react-icons/lia';
import { useResetPasswordMutation } from '../../../rtk/endpoints/authApi';
import { useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';
import { toast } from 'sonner';
type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;

const ResetPassword = () => {
    const navigate = useNavigate();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordForm>({
        resolver: zodResolver(ResetPasswordSchema),
    });
    const verificationData = JSON.parse(localStorage.getItem('otpVerificationResponse') || '{}');
    const onSubmit = async (data: ResetPasswordForm) => {
        console.log("Form Submitted:", data);
        console.log("Validation Errors:", errors);
        try {
            const res= await resetPassword({
                user_uuid: verificationData?.data?.user_uuid,
                password: data.confirmPassword, 
             }).unwrap();
             toast.success(res?.data);
             navigate("/");
           } catch (error:any) {
            console.log(error)
            toast.error(error?.data?.error)
           }
    };

    const onError = (errors: any) => {
        console.log('Form Errors:', errors);
        errors?.confirmPassword ?
        toast.error(errors?.confirmPassword?.message): null
        errors?.newPassword ?
        toast.error(errors?.newPassword?.message): null
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
                    <p className='mb-4 text-secondary'>Please enter & confirm the new password for your account</p>
                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                        {/* New Password Field */}
                        <div className="form-group">

                            <FloatingLabel
                                controlId="floatingPassword"
                                label="Password"
                                className="mb-3 field-transparent input-has-icon"
                            >
                                <LiaKeySolid  className='icon-start'/>
                                <Form.Control
                                    type={showPassword? 'text': 'password'}
                                    className={`input ${errors.newPassword ? 'input-error' : ''}`}
                                    {...register('newPassword')}
                                />
                                <div
                                    className="icon-end cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </div>
                            </FloatingLabel>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="form-group">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Confirm Password"
                                className="mb-3 field-transparent input-has-icon"
                            >
                                <LiaKeySolid  className='icon-start'/>
                                <Form.Control
                                    type={showNewPassword? 'text': 'password'}
                                    className={`input ${errors.confirmPassword ? 'input-error' : ''}`}
                                    {...register('confirmPassword')}
                                />
                                <div
                                    className="icon-end cursor-pointer"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? <FiEyeOff /> : <FiEye />}
                                </div>
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