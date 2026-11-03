import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAuthenticated) {
    return <Navigate to={location.state?.from?.pathname || '/'} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate(location.state?.from?.pathname || '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign in');
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
          <h1>Keep every ticket moving.</h1>
          <p>One board for projects, priorities, and live status across the team.</p>
          <ul className="auth-points">
            <li>Realtime sync</li>
            <li>Project ownership</li>
            <li>Priority triage</li>
          </ul>
        </aside>

        <div className="auth-panel">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div>
              <p className="auth-kicker">Account</p>
              <h2>Log in</h2>
              <p className="muted">Use your workspace credentials to continue.</p>
            </div>

            {error ? <div className="alert alert-error">{error}</div> : null}

            <label className="field">
              <span>Email</span>
              <input
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </label>

            <label className="field">
              <span>Password</span>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              />
            </label>

            <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
              {submitting ? 'Logging in…' : 'Log in'}
            </button>

            <p className="auth-switch">
              Need an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
