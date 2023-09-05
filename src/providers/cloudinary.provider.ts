import { StorageProvider } from '../types/cloudinary';
import { v2 } from 'cloudinary';
import { ConfigService } from '@nestjs/config';


export class CloudinaryProvider implements StorageProvider {

  constructor(private readonly configService: ConfigService) {
    v2.config(this.configService.get('cloudinary'));
  
  }

  async uploadPhoto(
    photo: any,
    options?: { asset_folder: string; public_id_prefix: string; identifier?: string },
  ) {
    try {
      console.log('entered  here');
     
      const image = await v2.uploader.upload(photo, options);

      return image;
    } catch (err) {
      console.log('the error fired back here');
      console.log('err:', err);
      throw err;
    }
  }
  async deletePhotosByPrefix(prefix: string) {
    try {
      const response = await v2.api.delete_resources_by_prefix(prefix);
      console.log("delete:",response)
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
