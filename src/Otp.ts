import * as speakeasy from 'speakeasy';
import { IGenerateOtp } from './interfaces/otp.interface';

export class Otp {
  constructor(private secret: string) {
    this.secret = secret;
  }

  static generateTwoFactorAuth (): IGenerateOtp {
    const secret = speakeasy.generateSecret({
      name: 'OTP srdn25',
      length: 20,
    });

    const otpAuthUrl = speakeasy.otpauthURL({
      secret: secret.base32,
      label: 'OTP auth srdn25',
    });

    return {
      secret: secret.base32,
      otpAuthUrl,
    }
  }

  verify(token: string): boolean {
    return speakeasy.totp.verify({
      secret: this.secret,
      token,
      encoding: 'base32',
      window: 2,
    });
  }

  generateToken(): string {
    return speakeasy.totp({
      secret: this.secret,
      encoding: 'base32',
    });
  }
}