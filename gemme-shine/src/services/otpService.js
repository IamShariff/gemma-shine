import crypto from 'crypto';
import OTP from '../models/Otp.js';

// Generate and Save OTP
export async function generateOtp({ email, userName, password, phone }) {
  const otp = crypto.randomInt(100000, 999999).toString();  // 6-digit OTP
  return otp;
}

// Verify OTP
export async function verifyOtp(email, otp) {
  const otpRecord = await OTP.findOne({ where: { email, otp } });
  if (!otpRecord || otpRecord.expiresAt < Date.now()) {
    throw new Error('Invalid or expired OTP');
  }

  return true;
}