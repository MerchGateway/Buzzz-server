export interface QrcodeProvider {
  generateQrCodeDataURL: (otpAuthUrl: string) => Promise<any>;
}
