import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:7228/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

//Global response interceptor for error logging
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API call error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default {
  async getAllCertificates() {
    try {
      const response = await apiClient.get('/Certificates');
      console.log('Token:', token);
      return response;
    } catch (error) {
      console.error('Error fetching certificates:', error);
      throw error;
    }
  },
  async Login(item) {
    try {
      const response = await apiClient.post('/Account/login',item);
      return response;
    } catch (error) {
      console.error('Error fetching certificates:', error);
      throw error;
    }
  },
};

