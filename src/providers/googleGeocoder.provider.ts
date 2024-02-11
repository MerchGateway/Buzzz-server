import { GoogleGeocoderProvider } from 'src/types/google-geocoder-provider';
import { ConfigService } from '@nestjs/config';
import * as NodeGeocoder from 'node-geocoder';

export class GeocoderProvider implements GoogleGeocoderProvider {
  private geocoder;
  constructor(private readonly configService: ConfigService) {
    this.geocoder = NodeGeocoder({
      provider: 'google',
      apiKey: configService.get('google.mapApiKey'),
    });
  }

  async getLongitudeAndLatitude(
    address: string,
    country = 'Nigeria',
  ): Promise<[any, any]> {
    try {
      const result = await this.geocoder.geocode({
        address,
        country,
      });
      if (result.length === 0) {
        throw new Error('No results found for the given address');
      }
      const { lat, lon } = result[0]; // Assuming you want the first result
      return [lat, lon];
    } catch (error) {
      console.error('Geocoding Error:', error);
      throw new Error('Failed to geocode address');
    }
  }
}
