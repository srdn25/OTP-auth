import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import * as qrcode from 'qrcode-terminal';
import { Otp } from './src/Otp';

const prompt = readline.createInterface({ input, output });

const data = Otp.generateTwoFactorAuth();

console.log('Scan the QR code by authenticator');

qrcode.generate(data.otpAuthUrl, { small: true });

(async () => {
  const token = await prompt.question('Enter your token: ');

  const otp = new Otp(data.secret);

  const result = otp.verify(token);
  console.log(`You inputted an ${result ? 'correct' : 'incorrect'} token`);

  if (!result) {
    const checkToken = otp.generateToken();
    console.log(`Should be ${checkToken}. You entered: ${token}`);
  }
})();

