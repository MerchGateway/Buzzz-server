import { StorageProvider } from '../types/cloudinary';
import { v2 } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export class CloudinaryProvider implements StorageProvider {
  constructor(private readonly configService: ConfigService) {
    v2.config({
      cloud_name: this.configService.get('cloudinary.cloud_name'),
      api_key: this.configService.get('cloudinary.cloud_api_key'),
      api_secret: this.configService.get('cloudinary.cloud_api_secret'),
      secure: true,
    });
  }

  uploadPhoto = async (
    photo: string,
    options: { asset_folder: string; prefix: string; identifier?: string },
  ) => {
    try {
      const image = await v2.uploader.upload(photo, options);

      return image;
    } catch (err) {
      throw err;
    }
  };
  deletePhotosByPrefix = async (prefix: string) => {
    try {
      const response = await v2.api.delete_resources_by_prefix(prefix);
    } catch (err) {
      throw err;
    }
  };
  deletePhoto = async (public_id: string) => {
    try {
      const response = await v2.uploader.destroy(public_id);
    } catch (err) {
      throw err;
    }
  };
}
