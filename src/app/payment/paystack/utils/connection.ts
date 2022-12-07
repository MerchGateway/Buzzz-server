import axios from 'axios';
import configuration from 'src/config/configuration';

const config = configuration();
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
