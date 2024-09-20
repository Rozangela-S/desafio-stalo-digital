import styles from './style.module.css';
import {DotsThreeVertical, Circle, House, SignOut, Plus, CheckCircle} from 'phosphor-react'; 
import { useState } from 'react';
import { ModalEditTask } from '../modals/ModalEditTask';
import { ModalDotsMenu } from '../modals/ModalDotsMenu';
import {TaskDetails} from '../modals/ModalTaskDetails';
import { ModalAddTask } from '../modals/ModalCreateTask';

type Task = {
  id: string;
  description: string;
  creationDate: string;
  lastUpdate: string;
  status: 'A fazer' | 'Concluída';
};

const tasksFake: Task[] = [
  { id: '1', description: 'Tarefa 1', creationDate: '2021-03-17', lastUpdate: '2021-03-18', status: 'A fazer'},
  { id: '2', description: 'Tarefa 2', creationDate: '2021-03-18', lastUpdate: '2021-03-19', status: 'A fazer'},
  { id: '3', description: 'Tarefa 3', creationDate: '2021-03-19', lastUpdate: '2021-03-20', status: 'A fazer'},
];

export function Home () {
  const [tasks, setTasks] = useState<Task[]>(tasksFake);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isOpenMenuOptions, setIsOpenMenuOptions] = useState<boolean>(false);
  const [isOpenModalDetails, setIsOpenModalDetails] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false); // Estado para o modal de adicionar nova tarefa


  const handleOpenModalDetails = (task: Task) => {
    setSelectedTask(task);
    setIsOpenModalDetails(true);
  }

  const handleCloseModalDetails = () => {
    setSelectedTask(null);
    setIsOpenModalDetails(false);
  }

  const handleTaskComplete = (task: Task) => {
    const indexCompletedTask = tasks.findIndex(t => t.id === task.id);
  
    if (indexCompletedTask !== -1) {
      const updatedTasks = [...tasks];
  
      updatedTasks[indexCompletedTask] = {
        ...tasks[indexCompletedTask],
        status: 'Concluída',
        lastUpdate: new Date().toLocaleDateString(),
      };
  
      setTasks(updatedTasks);
    }
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
  
  const handleOpenMenuOptions = (task: Task) => {
    setSelectedTask(task);
    setIsOpenMenuOptions(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask (task);
    setIsEditOpen (true);
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTask = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTask);
    console.log('Tarefa Excluida', taskId);
  };

  const handleCloseEditMotal = () => {
    setIsEditOpen(false);
  };

  const handleAddTask = (description: string) => {
    const newTask: Task = {
      id: (tasks.length + 1).toString(),
      description,
      creationDate: new Date().toLocaleDateString(),
      lastUpdate: new Date().toLocaleDateString(),
      status: 'A fazer',
    };
    setTasks([...tasks, newTask]);
  };

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
              {tasks.map((task) => {
                return (
                  <li key={task.id}>
                    <div>
                      {task.status === 'Concluída' ?
                        (
                          <CheckCircle size={20} color='green' />
                        ) :
                        (
                          <Circle
                            size={20}
                            cursor='pointer'
                            onClick={() => handleTaskComplete(task)}
                          />
                        )
                      }
                      <span onClick={() => handleOpenModalDetails(task)}>{task.description}</span>
                    </div>

                    <button type='button' onClick={() => handleOpenMenuOptions(task)}>
                      <DotsThreeVertical size={20} />
                    </button>
                  </li>
                );
              })}
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
            <button type='button' onClick={() => setIsAddOpen(true)}>
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
      {isOpenModalDetails && selectedTask && (
        <TaskDetails
          description={selectedTask.description}
          id={selectedTask.id}
          creationDate={selectedTask.creationDate}
          lastUpdate={selectedTask.lastUpdate}
          status={selectedTask.status}
          onClose={() => handleCloseModalDetails()}
        />
      )}

      {/* OPEN MODAL MENU OPTIONS */}
      {isOpenMenuOptions && selectedTask && (
        <ModalDotsMenu
          onClose={() => setIsOpenMenuOptions(false)}
          onConclude={() => {
            handleTaskComplete(selectedTask);
            setIsOpenMenuOptions(false);
          }}
          onEdit={() => {
            handleEditTask(selectedTask);
            setIsOpenMenuOptions(false);
          }}
          onDelete={() => {
            handleDeleteTask(selectedTask.id);
            setIsOpenMenuOptions(false);
          }}
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

      {isAddOpen && (
        <ModalAddTask onClose={() => setIsAddOpen(false)} onAdd={handleAddTask} />
      )}
    </main>
  );
}