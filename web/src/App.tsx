import styles from './login.module.css';
import { useState } from 'react';


export default function Login() {

  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    return data;
  };

  const login = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const form = (event.target as HTMLButtonElement).closest('form');
    if (!form) return;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log(data);
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: "test"
        })
      });

      console.log('Response:', response);

      if (response.status === 400) {
        setError('Login failed. Please check your details and try again.');
      } else if (response.status === 200) {
        setError('Login worked but I"m too lazy to implement the rest');
        
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Connection error. Please check your internet and try again.');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
          <h1 className={styles.loginTitle}>Login</h1>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.inputLabel}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.fullWidthInput}
                placeholder=""
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.inputLabel}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={styles.fullWidthInput}
                placeholder=""
                required
              />
            </div>

            <button
              type="submit"
              className={styles.loginSubmit}
              onClick={login}
            >
              Login
            </button>

            <p className={styles.loginInfoText}>
              By logging in, you agree to our Terms of Service and Privacy
              Policy.
            </p>
            <p className={styles.signupInfoText}>
            </p>
            {error && <p className={styles.errorText}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}