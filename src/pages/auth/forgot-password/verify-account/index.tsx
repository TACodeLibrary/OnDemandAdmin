import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const VerifyAccount = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(45); // 45 seconds countdown

  // Handle OTP input
  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus on next input field
    if (value.length === 1 && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
    else{
      navigate('/reset-password')
    }
  };

  // Countdown timer for OTP resend
  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setTimer(45); // Reset the timer to 45 seconds
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <div className="max-w-md w-full space-y-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">OTP Verification</h2>
        <p className="text-gray-500">Please enter the one-time 4-digit code sent to</p>
        <p className="text-gray-900 font-medium">lisa@gmail.com</p>

        {/* OTP Input Fields */}
        <div className="flex justify-center space-x-4 my-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 text-center text-2xl border-b-2 border-gray-300 focus:border-black focus:outline-none"
            />
          ))}
        </div>

        {/* Timer */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">{timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : "00:00"}</p>
        </div>

        {/* Resend OTP */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Didn’t Receive OTP?{" "}
            <button
              disabled={timer > 0}
              onClick={handleResend}
              className={`font-medium ${timer === 0 ? "text-black" : "text-gray-400 cursor-not-allowed"}`}
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
