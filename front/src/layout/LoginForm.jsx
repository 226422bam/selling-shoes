import axios from 'axios';
import { useState } from "react";
import useAuth from '../hooks/useAuth';


export default function LoginForm() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    email: '', 
    password: ''
  });

  const handleChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      

      const response = await axios.post('http://localhost:8008/auth/login', input);
      
      localStorage.setItem('token', response.data.token);
      
      const userResponse = await axios.get('http://localhost:8008/auth/me', {
        headers: { Authorization: `Bearer ${response.data.token}` }
      });
      
      setUser(userResponse.data);
    } catch(err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 border rounded-lg shadow-lg bg-white w-96">
        <div className="flex items-center justify-center w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
          <img
            src="https://i.pinimg.com/564x/22/a8/c4/22a8c4e5e8ac56627bade63fc575ce57.jpg"
            alt="Logo"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col">
            <span className="form-control flex flex-col text-gray-800">Email</span>
            <input
              type="text"
              className="input input-bordered"
              name="email"
              value={input.email}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col">
            <span className="form-control flex flex-col text-gray-800">Password</span>
            <input
              type="password"
              className="input input-bordered"
              name="password"
              value={input.password}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="btn bg-blue-400 form-control">Login</button> {/* แก้สีของปุ่มเป็นสีฟ้า */}
          
        </form>
      </div>
    </div>
  );
}
