import { toDataURL } from 'qrcode';
import { QrcodeProvider } from 'src/types/qrcode';

export class Qrcode implements QrcodeProvider {
  async generateQrCodeDataURL(otpAuthUrl: string) {
    return toDataURL(otpAuthUrl);
  }
}
