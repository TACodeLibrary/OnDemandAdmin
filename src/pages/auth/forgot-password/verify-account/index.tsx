import { useState, useEffect, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import OTPInput from 'react-otp-input';
import { useNavigate } from 'react-router';
import { Logo } from '../../../../utils/images';
import { formatSecondsToMinutes } from '../../../../helpers';

const VerifyAccount = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(45); // 45 seconds countdown
  const otpTimer = useMemo(() => formatSecondsToMinutes(timer), [timer])

  // Countdown timer for OTP resend
  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);


  return (
    <div className="login-wrapper">
      {/* Left Section */}
      <div className="left-section">
        <img src={Logo} alt="Description" className="banner-image" />
      </div>
      {/* onSubmit={handleSubmit(onSubmit)} */}
      {/* Right Section */}
      <div className="right-section text-center">
        <div className="form-container">
          <h2 className='title-large'>OTP Verification</h2>
          <p className='mb-4 text-secondary'>Please enter the one time 4-digit code sent to</p>
          <p>lisa@gmail.com</p>
          <form className="form">
            <div className="form-group otp-formset">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                inputType="number"
                renderSeparator={<span> </span>}
                inputStyle={"form-control"}
                renderInput={(props) => <input {...props} />}
              />
              <p className="countdown text-primary fw-medium mt-4 mb-4 text-white">{otpTimer}</p>
            </div>

            {/* Forgot Password Link */}


            {/* Submit Button */}
            <Button
              type="submit"
              disabled={otp.length !== 4}
              className='btn-full text-black'
            >
              {'Find Account'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
