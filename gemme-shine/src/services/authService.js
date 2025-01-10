import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { sendEmail } from './emailService.js';
import OTP from '../models/Otp.js';
import { generateOtp, verifyOtp } from './otpService.js';

const { hash, compare } = bcrypt;
const { sign } = jwt;

// Generate OTP and Save User Data
export async function generateOtpAndSaveUser({ email, userName, password, phone }) {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email already registered.');
  }

  const otp = await generateOtp(email);
  const hashedPassword = await hash(password, 10);

  // Store user data temporarily with OTP
  await OTP.upsert({
    email,
    otp,
    userName,
    password: hashedPassword,
    phone,
    expiresAt: Date.now() + 10 * 60 * 1000  // OTP valid for 10 minutes
  });

  // Send OTP email
  await sendEmail(email, 'Your Registration OTP', `Your OTP for registration is: ${otp}`);

  return { message: 'OTP sent to email' };
}

// Verify OTP and Register User
export async function verifyOtpAndRegister({ email, otp }) {
  // Verify OTP
  await verifyOtp(email, otp);

  // Retrieve user data from OTP record
  const otpRecord = await OTP.findOne({ where: { email } });
  if (!otpRecord) {
    throw new Error('OTP verification failed');
  }

  const user = await User.create({
    email,
    userName: otpRecord.userName,
    password: otpRecord.password,
    phone: otpRecord.phone,
    role: 'USER'
  });

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  // Remove OTP after successful verification
  await OTP.destroy({ where: { email } });

  return { user, token };
}

// Login User
export async function loginUser({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token };
}