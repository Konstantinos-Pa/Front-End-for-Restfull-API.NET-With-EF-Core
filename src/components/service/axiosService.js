import axios from 'axios';
const TOKEN_STORAGE_KEY = "token";

const apiClient = axios.create({
  baseURL: 'https://localhost:7228/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ---- Token helpers ----
export const authToken = {
  get() {
    return localStorage.getItem(TOKEN_STORAGE_KEY) || "";
  },
  set(token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  },
  clear() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  },
};

// ---- Attach JWT Bearer token to every request ----
apiClient.interceptors.request.use(
  (config) => {
    const token = authToken.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---- Global response interceptor for error logging ----
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: clear token on unauthorized
    if (error.response?.status === 401) {
      authToken.clear();
    }
    console.error("API call error:", error.response || error.message);
    return Promise.reject(error);
  }
);

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
      return response;
    } 
    catch (error) {
      console.error('Error fetching certificates:', error);
      throw error;
    }
  },
  async Login(item) {
    try {
      const response = await apiClient.post('/Account/login',item);
      return response;
    } catch (error) {
      console.error('Error fetching Login:', error);
      throw error;
    }
  },
  async Register(item) {
    try {
      const response = await apiClient.post('/Account/register',item);
      return response;
    } catch (error) {
      console.error('Error fetching Register:', error);
      throw error;
    }
  },
  async getCandidateList() {
    try {
      const response = await apiClient.get('/Candidates');
      return response;
    } catch (error) {
      console.error('Error fetching candidates:', error);
      throw error;
    }
  },
  async createCandidate(candidateData) {
    try {
      const response = await apiClient.post('/Candidates', candidateData);
      return response.data;
    } catch (error) {
      console.error('Error creating candidate:', error);
      throw error;
    }

  },
  async putCandidate(candidateId, candidateData) {
    try {
      const response = await apiClient.put(`/Candidates/${candidateId}`, candidateData);
      return response;
    } catch (error) {
      console.error('Error updating candidate:', error);
      throw error;
    }
  },
  async getCertificatesOfCandidate(id) {
    try {
      const response = await apiClient.get(`Candidates/CertificatesOfCandidate/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching certificates:', error);
      throw error;
    }
  },
  async getCandidateByUserName(username) {
    try {
      const response = await apiClient.get(`/Candidates/${username}`);
      return response;
    } catch (error) {
      console.error('Error fetching candidates:', error);
      throw error;
    }
  },
  async getaddressByCandidateId(CandidateId) {
    try {
      const response = await apiClient.get(`/Address/${CandidateId}`);
      return response;
    } catch (error) {
      console.error('Error fetching candidates:', error);
      throw error;
    }
  },
  async putAddress(AddressId, AddressData) {
    try {
      const response = await apiClient.put(`/Address/${AddressId}`, AddressData);
      return response;
    } catch (error) {
      console.error('Error updating candidate:', error);
      throw error;
    }
  },
  async postAddress( AddressData) {
    try {
      const response = await apiClient.post(`/Address`, AddressData);
      return response;
    } catch (error) {
      console.error('Error updating candidate:', error);
      throw error;
    }
  },
  async getCandidateCertificates(CandidateId) {
    try {
      const response = await apiClient.get(`/Candidates/CertificatesOfCandidate/${CandidateId}`);
      return response;
    } 
    catch (error) {
      console.error('Error fetching certificates:', error);
      throw error;
    }
  },
  async getCertificatesById(id) {
    try {
      const response = await apiClient.get(`/Certificates/${id}`);
      return response;
    } 
    catch (error) {
      console.error('Error fetching certificates:', error);
      throw error;
    }
  },
  async postCandidateCertificate(id,CId) {
    try {
      const response = await apiClient.put(`/Candidates/${id}/${CId}`);
      return response;
    } 
    catch (error) {
      console.error('Error fetching certificates:', error);
      throw error;
    }
  },
  async getCandidateAnalyticsByCertificateId(id) {
    try {
      const response = await apiClient.get(`/CandidatesAnalytics/Certificate/${id}`);
      return response;
    } 
    catch (error) {
      console.error('Error fetching candidates analytics:', error);
      throw error;
    }
  },
  async getAllSaleCertificates(){

    try {
      const response = await apiClient.get(`/SaleCertificates`);
      return response;
    } 
    catch (error) {
      console.error('Error fetching candidates analytics:', error);
      throw error;
    }
  },
  async getSaleCertificatesById(id){

    try {
      const response = await apiClient.get(`/SaleCertificates/${id}`);
      return response;
    } 
    catch (error) {
      console.error('Error fetching candidates analytics:', error);
      throw error;
    }
  },
  async getRandomquestions(number){

    try {
      const response = await apiClient.get(`/questions/Random/${number}`);
      return response;
    } 
    catch (error) {
      console.error('Error fetching candidates analytics:', error);
      throw error;
    }
  },
  async putCertificate(Id, Data) {
    try {
      const response = await apiClient.put(`/Certificates/${Id}`, Data);
      return response;
    } catch (error) {
      console.error('Error updating candidate:', error);
      throw error;
    }
  },
  async postAichat(string, conversation) {
    try {
      const response = await apiClient.post(`/AiRoutingChat/${conversation}`,  string);
      return response;
    } catch (error) {
      console.error('Error posting AI chat:', error);
      throw error;
    }
  },
};

