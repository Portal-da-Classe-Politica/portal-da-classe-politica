import axios from 'axios';

const defaultURL = 'https://portal-da-classe-back.onrender.com/noauth/indicadores/partidarios'; // Replace with your default API URL

export const getPartidoFilter = async () => {
  try {
    const response = await axios.get(defaultURL);
    console.log('aeuaiuea', response);
    return response.data; // Return the data from the API response
  } catch (error) {
    console.error('Error fetching partido filter:', error);
    throw error; // Rethrow the error for handling
  }
};
