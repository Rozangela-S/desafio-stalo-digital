import styles from './style.module.css';
import {DotsThreeVertical, Circle, House, SignOut, Plus} from 'phosphor-react'; 
import { useState } from 'react';
import { ModalEditTask } from '../modals/ModalEditTask';
import { ModalDotsMenu } from '../modals/ModalDotsMenu';
import {TaskDetails} from '../modals/ModalTaskDetails';

type Task = {
  id: string;
  description: string;
  creationDate: string;
  lastUpdate: string;
  status: 'A fazer' | 'Concluída';
};

export function Home () {
  const [completedTask, setCompletedTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const handleTaskComplete = (task: Task) => {
    setCompletedTask ({
      ...task,
      status: 'Concluída',
      lastUpdate: new Date().toLocaleDateString(),
    });
  };

  const handleCloseModal = () => {
    setCompletedTask(null);
  };

  const handleSaveEdit = (newDescription: string) => {
    if (selectedTask) {
      const updatedTask = {
        ...selectedTask,
        description: newDescription,
      };
      console.log('Tarefa editada', updatedTask);
      setSelectedTask(updatedTask);
      setIsEditOpen(false);
    }
  };
  
  const handleOpenMenu = (task: Task) => {
    setSelectedTask (task);
    setIsMenuOpen (true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask (task);
    setIsEditOpen (true);
  };

  const handleDeleteTask = (taskId: void) => {
    console.log('Tarefa Excluida', taskId);
  };

  const handleCloseEditMotal = () => {
    setIsEditOpen(false);
  };

  const tasks: Task[] = [
    { id: '1', description: 'Tarefa 1', creationDate: '2021-03-17', lastUpdate: '2021-03-18', status: 'A fazer'},
    { id: '2', description: 'Tarefa 2', creationDate: '2021-03-18', lastUpdate: '2021-03-19', status: 'A fazer'},
    { id: '3', description: 'Tarefa 3', creationDate: '2021-03-19', lastUpdate: '2021-03-20', status: 'A fazer'},
  ];

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
              {tasks.map((task) => (
                <li key={task.id}>
                  <div>
                    <Circle
                      size={20}
                      onClick={() => handleTaskComplete(task)}
                    />
                    <span onClick={() => setSelectedTask(task)}>{task.description}</span>
                  </div>

                  <button type='button' onClick={() => handleOpenMenu(task)} className={styles.ModalDots}>
                    <DotsThreeVertical size={20} />
                  </button>
                </li>
              ))}
            </ul>
          </section>
          
          <div className={styles.TaskTotalCount}>
            <span>Total de tarefas:</span>
            <span className={styles.TaskCount}>{tasks.filter((task) => task.status === 'Concluída').length}/{tasks.length}</span>
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

      {/*Modal para detalhes da tarefa*/ }

      {selectedTask && !isMenuOpen && !isEditOpen && (
        <TaskDetails
          description={selectedTask.description}
          id={selectedTask.id}
          creationDate={selectedTask.creationDate}
          lastUpdate={selectedTask.lastUpdate}
          status={selectedTask.status}
          onClose={() => setSelectedTask(null)}
        />
      )}

      {/*Modal do Menu Dots */}
      {isMenuOpen && selectedTask && (
        <ModalDotsMenu
          onClose={() => setIsMenuOpen(false)}
          onConclude={() => {
            handleTaskComplete(selectedTask);
            setIsMenuOpen(false);
          }}
          onEdit={() => {
            handleEditTask(selectedTask);
            setIsMenuOpen(false);
          }}
          onDelete={handleDeleteTask}
        />
      )}

      {/*Modal de Edição */}

      {isEditOpen && selectedTask && (
        <ModalEditTask
          taskDescription={selectedTask.description}
          onClose={handleCloseEditMotal}
          onSave={handleSaveEdit}
        />
      )}
    </main>
  );
}























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
