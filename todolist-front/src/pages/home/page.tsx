import styles from './style.module.css';
import {DotsThreeVertical, Circle, House, SignOut, Plus} from 'phosphor-react'; 



export function Home () {

  return (
    <main className={styles.Container}>
      <section>
        <div>
          <h1>Filtrar</h1>

          <section className={styles.TaskFilter}>
            <button>Todas</button>
            <button>A fazer</button>
            <button>Feitas</button>
          </section>  
          
          <h1>Qua. 17 de março de 2021</h1>

          <section className={styles.TaskList}>
            <ul>
                <li>
                  <div>
                    <Circle
                      size={20}
                    />
                    <span>Tarefa 1</span>
                  </div>

                  <button type='button'>
                    <DotsThreeVertical size={20} />
                  </button>
                </li>

                <li>
                  <div>
                    <Circle
                      size={20}
                    />
                    <span>Tarefa 1</span>
                  </div>

                  <button type='button'>
                    <DotsThreeVertical size={20} />
                  </button>
                </li>

                <li>
                  <div>
                    <Circle
                      size={20}
                    />
                    <span>Tarefa 1</span>
                  </div>

                  <button type='button'>
                    <DotsThreeVertical size={20} />
                  </button>
                </li>
            </ul>
          </section>
          
          <div className={styles.TaskTotalCount}>
            <span>Total de tarefas:</span>
            <span></span>
          </div>
        </div>
        
        <footer className={styles.Footer}>
          <div className={styles.FooterItem}>
            <button type='button'>
              <House size={25} />
              Home
            </button>
          </div>
          
          <div className={styles.FooterAddTask}>
            <button type='button'>
              <Plus size={58} color="white" />

              Adicionar
            </button>
          </div>
          
          <div className={styles.FooterItem}>
            <button type='button'>
              <SignOut size={25} />
              Logout
            </button>
          </div>
        </footer>
      </section>
    </main>
  );
}
