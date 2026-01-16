import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models';
import { AUTH_CONSTANTS } from '../constants';
import { AUTH_MESSAGES } from '../constants/messages';

interface SignupData {
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

/**
 * Authentication Service - Handles user authentication
 */
export class AuthService {
    /**
     * Register a new user
     */
    static async signup(data: SignupData): Promise<{ user: any; token: string }> {
        const { email, password } = data;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error(AUTH_MESSAGES.USER_EXISTS);
        }

        // Validate password length
        if (password.length < AUTH_CONSTANTS.MIN_PASSWORD_LENGTH) {
            throw new Error(AUTH_MESSAGES.WEAK_PASSWORD);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, AUTH_CONSTANTS.BCRYPT_SALT_ROUNDS);

        // Create user
        const user = await User.create({
            email,
            password: hashedPassword,
        });

        // Generate JWT token
        const token = this.generateToken(user.id);

        return {
            user: {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
            },
            token,
        };
    }

    /**
     * Login user
     */
    static async login(data: LoginData): Promise<{ user: any; token: string }> {
        const { email, password } = data;

        // Find user - explicitly select password field
        const user = await User.findOne({
            where: { email },
            attributes: ['id', 'email', 'password', 'createdAt', 'updatedAt']
        });

        console.log('Login attempt for:', email);
        console.log('User found:', user ? 'Yes' : 'No');

        if (!user) {
            throw new Error(AUTH_MESSAGES.INVALID_CREDENTIALS);
        }

        // Ensure password exists
        if (!user.password) {
            console.log('Password field is missing!');
            throw new Error(AUTH_MESSAGES.INVALID_CREDENTIALS);
        }

        console.log('Password exists, comparing...');

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password valid:', isPasswordValid);

        if (!isPasswordValid) {
            throw new Error(AUTH_MESSAGES.INVALID_CREDENTIALS);
        }

        // Generate JWT token
        const token = this.generateToken(user.id);

        return {
            user: {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
            },
            token,
        };
    }

    /**
     * Request password reset (OTP)
     */
    static async forgotPassword(email: string): Promise<string> {
        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error(AUTH_MESSAGES.USER_NOT_FOUND);
        }

        // Generate static OTP
        const otp = '123456';

        // Set OTP expiry (10 minutes from now)
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        // Update user with OTP
        await user.update({
            otp,
            otpExpiry,
        });

        // In production, send email with OTP
        return otp;
    }

    /**
     * Reset password with OTP
     */
    static async resetPassword(email: string, otp: string, newPassword: string): Promise<void> {
        console.log('Reset password attempt for:', email, 'with OTP:', otp);

        // Find user with valid OTP and email
        const user = await User.findOne({
            where: {
                email,
                otp,
            },
        });

        console.log('User found for reset:', user ? 'Yes' : 'No');
        if (user) {
            console.log('User OTP Expiry:', user.otpExpiry);
            console.log('Current Date:', new Date());
        }

        if (!user || !user.otpExpiry) {
            throw new Error(AUTH_MESSAGES.INVALID_TOKEN);
        }

        // Check if OTP is expired
        if (user.otpExpiry < new Date()) {
            throw new Error(AUTH_MESSAGES.INVALID_TOKEN);
        }

        // Validate new password
        if (newPassword.length < AUTH_CONSTANTS.MIN_PASSWORD_LENGTH) {
            throw new Error(AUTH_MESSAGES.WEAK_PASSWORD);
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, AUTH_CONSTANTS.BCRYPT_SALT_ROUNDS);

        // Update password and clear OTP
        await user.update({
            password: hashedPassword,
            otp: undefined,
            otpExpiry: undefined,
        });
    }

    /**
     * Verify JWT token
     */
    static verifyToken(token: string): any {
        try {
            const secret = process.env.JWT_SECRET || 'your-secret-key';
            return jwt.verify(token, secret);
        } catch (error) {
            throw new Error(AUTH_MESSAGES.INVALID_TOKEN);
        }
    }

    /**
     * Generate JWT token
     */
    private static generateToken(userId: number): string {
        const secret = process.env.JWT_SECRET || 'your-secret-key';
        return jwt.sign({ userId }, secret, {
            expiresIn: AUTH_CONSTANTS.JWT_EXPIRES_IN,
        });
    }
}
