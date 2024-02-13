import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

const guestNav = [
  { to : '/', text: 'Login' },
  { to : '/register', text: 'Register' },
];

const userNav = [
  { to : '/', text: 'Home' },
  
];

export default function Header() {
  const { user, logout, setUser } = useAuth(); 
  const finalNav = user?.id ? userNav : guestNav;
  const navigate = useNavigate();

  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8008/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      const userResponse = await axios.get('http://localhost:8008/auth/me', {
        headers: { Authorization: `Bearer ${response.data.token}` },
      });
      setUser(userResponse.data); // ใช้ setUser ที่ได้รับจาก useAuth โดยตรง
      navigate('/');
    } catch(err) {
      console.log(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="navbar bg-base-600 flex items-center justify-between">
      <div>
        <img 
          src="https://i.pinimg.com/564x/22/a8/c4/22a8c4e5e8ac56627bade63fc575ce57.jpg" 
          alt="User Avatar" 
          className="w-16 h-16 rounded-full ml-4"
        />
      </div>
      <div>
        <ul className="menu menu-horizontal px-1">
          { finalNav.map( el => (
            <li key={el.to} >
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
          { user?.id ? (
            <li>
              <Link to='#' onClick={handleLogout}>Logout</Link>
            </li>
          ) : (
            <li>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}