import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { FormEvent, useState } from 'react';

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

  const handleLoginFake = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dados = localStorage.getItem('dados_login');

    if (dados) {
      const dadosLogin = (JSON.parse(dados) || []);

      const index = dadosLogin.findIndex((dado) => dado.email === inputEmail);

      if (index != -1) {
        const login = dadosLogin[index];

        if (login.password === inputPassword && login.email === inputEmail) {
          alert('Usuário logado com sucesso');

          navigate('/home');
        } else {
          alert('Email ou senha inválidos');
        }
      } else {
        alert('Email ou senha inválidos');
      }
    } else {
      alert('Email ou senha inválidos');
    }
  }

  return (
    <main className={styles.Container}>
      <h1>Bem-vindo(a)!</h1>

      <form onSubmit={(e) => handleLoginFake(e)}>
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
