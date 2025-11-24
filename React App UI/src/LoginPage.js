import React, { useState } from 'react';
import api from './Api';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      // Try to fetch user
      const res = await api.get(`/users/${encodeURIComponent(email)}`);
      if (res.data) {
        // User exists → redirect to app
        localStorage.setItem('current_user', email);
        history.push('/');
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // User not found → create new
        await api.post('/users', {
          email,
          interest: '',
          location: ''
        });
        localStorage.setItem('current_user', email);
        history.push('/');
      } else {
        alert('Error logging in');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
