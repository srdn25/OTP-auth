import { Otp } from '../src/Otp';

describe('Otp class', () => {
  it('Should validate generated token', () => {
    const { secret } = Otp.generateTwoFactorAuth();

    const otp = new Otp(secret);
    const tokenFromAuthenticator = otp.generateToken();

    const validationResult = otp.verify(tokenFromAuthenticator);

    expect(validationResult).toBe(true);
  });

  it('Validation should throw an error if the token does not match', () => {
    const { secret } = Otp.generateTwoFactorAuth();

    const otp = new Otp(secret);

    const validationResult = otp.verify('123456');

    expect(validationResult).toBe(false);
  });
});
