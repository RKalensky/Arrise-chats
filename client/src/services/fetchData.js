import { API_BASE_URL } from '../config/api';

export async function fetchData(path, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
