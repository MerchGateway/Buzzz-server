import { StorageProvider } from '../types/cloudinary';
import { UploadApiOptions, v2 } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export class CloudinaryProvider implements StorageProvider {
  constructor(private readonly configService: ConfigService) {
    v2.config(this.configService.get('cloudinary'));
  }

  async uploadPhoto(filePath: string, options?: UploadApiOptions) {
    try {
      const image = await v2.uploader.upload(filePath, options);
      return image;
    } catch (err) {
      throw err;
    }
  }
  async deletePhotosByPrefix(prefix: string) {
    try {
      const response = await v2.api.delete_resources_by_prefix(prefix);
      return response;
    } catch (err) {
      throw err;
    }
  }
  async deletePhoto(public_id: string) {
    try {
      const response = await v2.uploader.destroy(public_id);
      console.log('delete:', response);
      return response;
    } catch (err) {
      throw err;
    }
  }
}
