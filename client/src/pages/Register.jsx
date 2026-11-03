import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'member',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to register');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-frame">
        <aside className="auth-rail">
          <span className="brand-mark lg" aria-hidden="true">
            SB
          </span>
          <p className="auth-eyebrow">SprintBoard</p>
          <h1>Stand up a shared issue queue.</h1>
          <p>Register, create projects, and watch activity update as the team works.</p>
          <ul className="auth-points">
            <li>Create projects</li>
            <li>Triage issues</li>
            <li>Live activity feed</li>
          </ul>
        </aside>

        <div className="auth-panel">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div>
              <p className="auth-kicker">Account</p>
              <h2>Register</h2>
              <p className="muted">First user on a fresh database becomes admin.</p>
            </div>

            {error ? <div className="alert alert-error">{error}</div> : null}

            <label className="field">
              <span>Name</span>
              <input
                required
                minLength={2}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </label>

            <label className="field">
              <span>Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </label>

            <label className="field">
              <span>Password</span>
              <input
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              />
            </label>

            <label className="field">
              <span>Role</span>
              <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </label>

            <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
              {submitting ? 'Creating…' : 'Create account'}
            </button>

            <p className="auth-switch">
              Already registered? <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
