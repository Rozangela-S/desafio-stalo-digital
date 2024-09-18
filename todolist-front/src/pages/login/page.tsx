import styles from './styles.module.css';
//import { Eye} from 'phosphor-react';


export function Login() {
  return (
    <main className={styles.Container}>
      <h1>Bem-vindo(a)!</h1>

      <section className={styles.FormLogin}>        
        <input type="text" placeholder=' Email' />

        <input type="password" placeholder=' Password'  />
      
        <a href="#">Esqueceu sua senha?</a>
      </section>
      
      <button>Login</button>

      <div className={styles.Context}>
        <span>Não tem uma conta?</span>
        <a href="#">Cadastre-se</a>
      </div>
    </main>
  );
}
