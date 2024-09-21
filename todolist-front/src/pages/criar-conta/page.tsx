import {Link, useNavigate} from 'react-router-dom';
import styles from './styles.module.css';
import { useState } from 'react';

export function Register(){
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');

  const signup = () => {
    const data = {
      email: email,
      password: password,
    };
    
    const dados = localStorage.getItem('dados_login');

    if (dados) {
      const existingUsers = JSON.parse(dados) || [];

      existingUsers.push(data);

      localStorage.setItem('dados_login', JSON.stringify(existingUsers));
    } else {
      localStorage.setItem('dados_login', JSON.stringify([data]));
    }

    navigate('/login');
  }

  return (
    <main className={styles.Container}>
      <h1>Cadastre sua conta.</h1>

      <form onSubmit={signup}>
        <section className={styles.FormRegister}>
          <input
            type="text"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
          />
          
          <input
            type="email"
            placeholder='E-mail'
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder='Idade'
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            type="password"
            placeholder='Senha'
            onChange={(e) => setPassword(e.target.value)}
          />
        </section>

        <button
          type='submit'
        >
          Sing Up
        </button>
      </form>

      <Link to='/login'> Voltar para login</Link>
    </main>
  );
}