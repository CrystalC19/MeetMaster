import decode from 'jwt-decode';

class AuthService {
  // Save the token to localStorage
  login(token) {
    localStorage.setItem('token', token);
    // Optionally, you can redirect or reload the page
  }

  // Remove the token from localStorage and reload the page
  logout() {
    localStorage.removeItem('token');
    // window.location.reload(); 
  }

  // Get the token from localStorage
  getToken() {
    return localStorage.getItem('token');
  }

  // Decode the token to get user data
  getUser() {
    const token = this.getToken();
    return token ? decode(token) : null;
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return token ? true : false;
  }
}

export default new AuthService();
