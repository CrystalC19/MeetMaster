// To access protected routes, send the JWT in the Authorization header:
import axios from 'axios';

const fetchProtectedData = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('/api/protected', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching protected data', error);
    }
};

fetchProtectedData();
