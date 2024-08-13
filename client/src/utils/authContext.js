
// ../../utils/auth.js

const Auth = {
    login: (token) => {
      // Logic to handle login, e.g., set a token in localStorage or update context
      localStorage.setItem('token', token);
    },
    logout: () => {
      localStorage.removeItem('token');
    },
    isLoggedIn: () => {
      return !!localStorage.getItem('token');
    },
  };
  
  export default Auth;
  