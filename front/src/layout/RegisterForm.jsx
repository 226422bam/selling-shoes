import axios from 'axios';
import { useState } from "react";

export default function RegisterForm() {
  const initialState = {
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [input, setInput] = useState(initialState);

  const hdlChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async e => {
    try {
      e.preventDefault();
      
      // Validation
      if (input.password !== input.confirmPassword) {
        return alert('Please check confirm password');
      }

      const formData = {
        role: 'USER',
        email: input.email,
        password: input.password,
        confirmPassword: input.confirmPassword,
        address: input.address,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone
      };
      

      const response = await axios.post('http://localhost:8008/auth/register', formData);
      
      if (response.status === 200) {
        alert('Register Successful');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      alert('Registration Failed');
    }
  };
  

  const hdlReset = () => {
    setInput(initialState);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 border rounded-lg shadow-lg bg-white">
        <div className="flex items-center justify-center w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
          <img
            src="https://i.pinimg.com/564x/22/a8/c4/22a8c4e5e8ac56627bade63fc575ce57.jpg"
            alt="Logo"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <form className="flex flex-col gap-4" onSubmit={hdlSubmit}>
          {/* Input fields for registration */}
          <div className="flex gap-4">
            {/* First Name */}
            <div className="form-control flex flex-col">
              <label className="label-text">First Name</label>
              <input
                type="text"
                className="input input-bordered"
                name="firstName"
                value={input.firstName}
                onChange={hdlChange}
              />
            </div>
            {/* Last Name */}
            <div className="form-control flex flex-col">
              <label className="label-text">Last Name</label>
              <input
                type="text"
                className="input input-bordered"
                name="lastName"
                value={input.lastName}
                onChange={hdlChange}
              />
            </div>
          </div>
          {/* Phone */}
          <div className="form-control flex flex-col">
            <label className="label-text">Phone</label>
            <input
              type="text"
              className="input input-bordered"
              name="phone"
              value={input.phone}
              onChange={hdlChange}
            />
          </div>
          {/* Address */}
          <div className="form-control flex flex-col">
            <label className="label-text">Address</label>
            <input
              type="text"
              className="input input-bordered"
              name="address"
              value={input.address}
              onChange={hdlChange}
            />
          </div>
          {/* Email */}
          <div className="form-control flex flex-col">
            <label className="label-text">Email</label>
            <input
              type="email"
              className="input input-bordered"
              name="email"
              value={input.email}
              onChange={hdlChange}
            />
          </div>
          <div className="flex gap-4">
            {/* Password */}
            <div className="form-control flex flex-col">
              <label className="label-text">Password</label>
              <input
                type="password"
                className="input input-bordered"
                name="password"
                value={input.password}
                onChange={hdlChange}
              />
            </div>
            {/* Confirm Password */}
            <div className="form-control flex flex-col">
              <label className="label-text">Confirm Password</label>
              <input
                type="password"
                className="input input-bordered"
                name="confirmPassword"
                value={input.confirmPassword}
                onChange={hdlChange}
              />
            </div>
          </div>
          {/* Submit and Reset Buttons */}
          <div className="flex justify-center">
            <button type="submit" className="btn bg-blue-400 form-control">Submit</button>
            <button type="button" className="btn bg-Zinc-500 form-control ml-2" onClick={hdlReset}>Reset</button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
