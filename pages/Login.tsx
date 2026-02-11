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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-restaurant-dark transition-colors">
      <form onSubmit={handleLogin} className="bg-white dark:bg-neutral-900/90 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 border border-gray-100 dark:border-neutral-800 transition-colors">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white text-center mb-4">Login Dipendenti</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-gray-200 dark:border-neutral-700 focus:ring-2 focus:ring-orange-400 outline-none transition-colors"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-gray-200 dark:border-neutral-700 focus:ring-2 focus:ring-orange-400 outline-none transition-colors"
        />
        {error && <div className="text-red-500 text-center font-bold">{error}</div>}
        <button type="submit" className="w-full bg-restaurant-accent hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all">Accedi</button>
      </form>
    </div>
  );
};

export default Login;
