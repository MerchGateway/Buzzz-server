export interface StorageProvider {
  uploadPhoto: (
    photo: string,
    options: { asset_folder: string; prefix: string; identifier?: string },
  ) => Promise<any>;
  deletePhoto: (public_id: string) => Promise<any>;
  deletePhotosByPrefix: (prefix: string) => Promise<any>;
}
