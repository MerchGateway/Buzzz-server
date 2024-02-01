export interface GoogleGeocoderProvider {
  getLongitudeAndLatitude: (
    address: string,
    country: string,
  ) => Promise<[any, any]>;
}
