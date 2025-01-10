import * as authService from '../services/authService.js';

// Registration Controller (Step 1 - Generate OTP)
export async function generateOtpController(req, res) {
  try {
    const { email, userName, password, phone } = req.body;
    const response = await authService.generateOtpAndSaveUser({ email, userName, password, phone });
    res.status(200).json(response);
  } catch (err) {
    console.error('OTP Generation Error:', err.message);
    res.status(400).json({ message: err.message });
  }
}

// Step 2 - Verify OTP and Register
export async function verifyOtpAndRegisterController(req, res) {
  try {
    const { email, otp } = req.body;
    const { user, token } = await authService.verifyOtpAndRegister({ email, otp });
    res.status(201).json({ message: 'User registered successfully', token, user });
  } catch (err) {
    console.error('OTP Verification Error:', err.message);
    res.status(400).json({ message: err.message });
  }
}

// Login Controller
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { token } = await authService.loginUser({ email, password });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(401).json({ message: err.message });
  }
}