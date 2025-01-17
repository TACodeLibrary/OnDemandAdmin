import { useState, useEffect, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import OTPInput from 'react-otp-input';
import { useNavigate } from 'react-router';
import { Logo } from '../../../../utils/images';
import { formatSecondsToMinutes } from '../../../../helpers';
import { useVerifyOtpMutation, useForgotPasswordMutation } from '../../../../rtk/endpoints/authApi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VerifyOtpSchema } from '../../../../schema';
import { z } from 'zod';
import { aesEncrypt } from '../../../../utils/aes-encrypt-decrypt';
import { toast } from 'sonner';

type VerifyOtpForm = z.infer<typeof VerifyOtpSchema>;

const VerifyAccount = () => {
  const navigate = useNavigate();
  const { handleSubmit, watch, setValue, formState: {} } = useForm<VerifyOtpForm>({
    defaultValues: { otp: '' },
    resolver: zodResolver(VerifyOtpSchema),
  });
  const [timer, setTimer] = useState(45); // 45 seconds countdown
  const otpTimer = useMemo(() => formatSecondsToMinutes(timer), [timer]);
  const [verifyOTP, { isLoading }] = useVerifyOtpMutation();
  const [resendOTP, { isLoading: isResending }] = useForgotPasswordMutation();

  // Countdown timer for OTP resend
  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);

  const email = localStorage.getItem('forgotPasswordEmail') || ''; 
  const encryptedEmail = aesEncrypt(email); //encypted email

  const onSubmit = async (data: VerifyOtpForm) => {
    
    try {
     const res= await verifyOTP({
        screen_type: "PASSWORD",
        otp: data.otp,
        email: encryptedEmail, // Added the encrypted email
      }).unwrap();
      localStorage.setItem('otpVerificationResponse', JSON.stringify(res));
      toast.success(res?.data?.message);
      navigate("/reset-password");
    } catch (error: any) {
      toast.error(error?.data?.error);
      
    }
  };
  
  const handleResendOTP = async () => {
    try {
      await resendOTP({
        email: encryptedEmail
      }).unwrap();
      setTimer(45); // Reset timer after successful resend
    } catch (error:any) {
      toast.error(error?.data?.error)
    }
  };

  return (
    <div className="login-wrapper">
      <div className="left-section">
        <img src={Logo} alt="Description" className="banner-image" />
      </div>
      <div className="right-section text-center">
        <div className="form-container">
          <h2 className='title-large'>OTP Verification</h2>
          <p className='mb-4 text-secondary'>Please enter the one time 4-digit code sent to</p>
          <p>{email}</p>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group otp-formset">
              <OTPInput
                value={watch('otp')}
                onChange={(value: string) => setValue('otp', value)}
                numInputs={4}
                inputType="number"
                renderSeparator={<span> </span>}
                inputStyle={"form-control"}
                renderInput={(props) => <input {...props} />}
              />
              <div className="mt-4 mb-4">
                {timer > 0 ? (
                  <p className="countdown text-primary fw-medium text-white">{otpTimer}</p>
                ) : (
                  <>
                  <p>Didn't Receive OTP</p>
                  <Button
                    type="button"
                    onClick={handleResendOTP}
                    className="btn-transparent"
                    disabled={isResending}
                  >
                    {isResending ? 'Resending...' : 
                    'Resend OTP'}
                  </Button>
                  </>
                )}
              </div>
            </div>
            <Button
              type="submit"
              disabled={watch('otp')?.length !== 4}
              className='btn-full text-black'
            >
              {isLoading ? 'Processing...' : 'Submit'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
