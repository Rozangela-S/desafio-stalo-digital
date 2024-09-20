import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { useState } from 'react';

export function Login() {
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleLogin = async () => {
    const url = 'https://api-nodejs-todolist.herokuapp.com/user/login';

    const body = {
      email: inputEmail,
      password: inputPassword,
    };

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(await response.json());
  }

  const handleLoginFake = () => {
    navigate('/home');
  }

  return (
    <main className={styles.Container}>
      <h1>Bem-vindo(a)!</h1>

      <form onSubmit={handleLoginFake}>
        <section className={styles.FormLogin}>        
          <input 
            type="email"
            placeholder='Email'
            onChange={(e) => setInputEmail(e.target.value)}
          />

          <input 
            type="password" 
            placeholder='Password'
            onChange={(e) => setInputPassword(e.target.value)}
          />
        
          <a href="#">Esqueceu sua senha?</a>
        </section>
        
        <button
          type='submit'
        >
          Login
        </button>
      </form>

      <div className={styles.Context}>
        <span>Não tem uma conta?</span>
        <Link to='/register'>Cadastre-se</Link>
      </div>
    </main>
  );
}
