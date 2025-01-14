import { useState, useEffect, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import OTPInput from 'react-otp-input';
import { useNavigate } from 'react-router';
import { Logo } from '../../../../utils/images';
import { formatSecondsToMinutes } from '../../../../helpers';
import { useVerifyOtpMutation } from '../../../../rtk/endpoints/authApi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VerifyOtpSchema } from '../../../../schema';
import { z } from 'zod';
import { aesEncrypt } from '../../../../utils/aes-encrypt-decrypt';

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

  // Countdown timer for OTP resend
  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);


  const onSubmit = async (data: VerifyOtpForm) => {
    const email = localStorage.getItem('forgotPasswordEmail') || ''; 
    const encryptedEmail = aesEncrypt(email); //encypted email
  
    console.log('Submitting OTP and Email:', { otp: data.otp, email: encryptedEmail });
  
    try {
     const res= await verifyOTP({
        screen_type: "PASSWORD",
        otp: data.otp,
        email: encryptedEmail, // Add the encrypted email
      }).unwrap();
      localStorage.setItem('otpVerificationResponse', JSON.stringify(res));
      console.log('OTP verified successfully');
      navigate("/reset-password");
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      // Add error handling (e.g., display toast or error message)
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
          <p>lisa@gmail.com</p>
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
              <p className="countdown text-primary fw-medium mt-4 mb-4 text-white">{otpTimer}</p>
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
