import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const roomService = {
  getRooms: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/rooms`);
      console.log('API response:', response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (err) {
      console.error('Error fetching rooms:', err);
      return [];
    }
  },
  createRoom: async (roomData) => {
    const response = await axios.post(`${API_URL}/api/rooms`, roomData);
    return response.data; // Adjust based on backend response
  },
  updateRoom: async (id, roomData) => {
    const response = await axios.put(`${API_URL}/api/rooms/${id}`, roomData);
    return response.data; // Adjust based on backend response
  },
};

export default roomService;