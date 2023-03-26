import { authenticator } from 'otplib';
import { AuthenticatorProvider,SecretResponse } from 'src/types/authenticator';

import { ConfigService } from '@nestjs/config';
import { User } from 'src/app/users/entities/user.entity';
import { AUTH_APP_NAME } from 'src/constant';
import { toDataURL } from 'qrcode';
import { QrcodeProvider } from 'src/types/qrcode';




export class Qrcode implements QrcodeProvider {


  constructor() {
  }

  async generateQrCodeDataURL(otpAuthUrl: string) {
    return toDataURL(otpAuthUrl);
  }
}
