import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersData from '../App_vPro.json';

const hashPassword = (password: string) => {
  // Simulated hash for demo (replace with bcrypt or similar in production)
  if (password === 'Admin!') return '$2a$10$adminhash';
  if (password === 'User1') return '$2a$10$operatorhash';
  return '';
};

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const hash = hashPassword(password);
    const user = usersData.users.find(
      (u: any) => u.username === username && u.passwordHash === hash
    );
    if (user) {
      localStorage.setItem('role', user.role);
      navigate(user.role === 'admin' ? '/admin' : '/operator');
    } else {
      setError('Credenziali non valide');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-restaurant-dark">
      <form onSubmit={handleLogin} className="bg-white/5 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-white text-center mb-4">Login Dipendenti</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-restaurant-accent outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-restaurant-accent outline-none"
        />
        {error && <div className="text-red-500 text-center font-bold">{error}</div>}
        <button type="submit" className="w-full bg-restaurant-accent text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-all">Accedi</button>
      </form>
    </div>
  );
};

export default Login;
