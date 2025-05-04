import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function AuthForm() {
  const [form, setForm] = useState({ email: '', password: '', role: 'user' });
  const [isLogin, setIsLogin] = useState(true);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? 'login' : 'signup';
    try {
      const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setMsg(data.msg);
        if (isLogin) {
          navigate('/success');
        }
      } else {
        setMsg(data.msg || 'Something went wrong');
      }
    } catch (err) {
      setMsg('Network error');
    }
  };

  const resetForm = () => {
    setForm({ email: '', password: '', role: 'user' });
    setMsg('');
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {!isLogin && (
            <div style={{ textAlign: 'center' }}>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  width: '60%',
                  marginTop: '10px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

          <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
        </form>

        <p className="message">{msg}</p>

        <button className="toggle-btn" onClick={() => {
          setIsLogin(!isLogin);
          resetForm();
        }}>
          Switch to {isLogin ? 'Signup' : 'Login'}
        </button>
      </div>
    </div>
  );
}
