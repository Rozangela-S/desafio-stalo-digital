import styles from './styles.module.css';

export function Register(){
  return (
    <main className={styles.Container}>
      <h1>Cadastre sua conta.</h1>

      <section className={styles.FormRegister}>
        <input type="text" placeholder="Nome" />
        <input type="text" placeholder=' E-mail' />

        <input type="text" placeholder='Idade' />

        <input type="text" placeholder='Passaword' />
      </section>

      <button>Sing Up</button>

      <a href="#">Voltar para login</a>
    </main>
  );
}