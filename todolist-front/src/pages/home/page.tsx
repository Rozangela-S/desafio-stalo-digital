import styles from './style.module.css';
import {DotsThreeVertical, Circle, House, SignOut, Plus, CheckCircle} from 'phosphor-react'; 
import { useState } from 'react';
import { ModalEditTask } from '../modals/ModalEditTask';
import { ModalDotsMenu } from '../modals/ModalDotsMenu';
import {TaskDetails} from '../modals/ModalTaskDetails';
import { ModalAddTask } from '../modals/ModalCreateTask';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'Todas' | 'A fazer' | 'Feitas'>('Todas');
  const [tasks, setTasks] = useState<Task[]>(tasksFake);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isOpenMenuOptions, setIsOpenMenuOptions] = useState<boolean>(false);
  const [isOpenModalDetails, setIsOpenModalDetails] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);  

  const showCurrentDate = () => {
    const currentDate = new Date().toString();

    const currentDateArray = currentDate.split(' ');

    const dia = currentDateArray[0];
    const mes = currentDateArray[1];
    const diaNumero = currentDateArray[2];
    const ano = currentDateArray[3];
    
    return `${dia}. ${diaNumero} de ${mes} de ${ano}`;
  }

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
        lastUpdate: new Date().toLocaleDateString(),
      };
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );

      setTasks(updatedTasks);
      setSelectedTask(null)
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
    const confirmed = window.confirm("tem certeza que deseja excluir essa tarefa?");
    if(confirmed) {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      console.log('Tarefa Excluída', taskId);
    }
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

  const handleFilterChange = (newFilter: 'Todas' | 'A fazer' | 'Feitas') => {
    setFilter(newFilter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Todas') return true;
    return filter === 'A fazer' ? task.status === 'A fazer' : task.status === 'Concluída';
  });

  return (
    <main className={styles.Container}>
      <section>
        <div>
          <h1>Filtrar</h1>

          <section className={styles.TaskFilter}>
            <button onClick={() => handleFilterChange('Todas')}>Todas</button>
            <button onClick={() => handleFilterChange('A fazer')}>A fazer</button>
            <button onClick={() => handleFilterChange('Feitas')}>Feitas</button>
          </section>  
          
          <h1>{showCurrentDate()}</h1>

          <section className={styles.TaskList}>
            <ul>
              {filteredTasks.map((task) => {
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
            <button type='button' onClick={() => navigate('/login')}>
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