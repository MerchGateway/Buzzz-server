import axios from 'axios';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';

const config=configuration()
const connection = () => {
 
  return axios.create({
    baseURL: 'https://api.paystack.co',
    // timeout: 2000,
    headers: {
      Authorization: `Bearer ${config.paystack.secret}`,
    },
  });
};

export default connection;
