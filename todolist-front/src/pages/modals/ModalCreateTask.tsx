// src/components/modals/ModalAddTask.tsx
import { useState } from 'react';
import styles from './style.creacte.module.css';

type ModalAddTaskProps = {
  onClose: () => void;
  onAdd: (description: string) => void;
};

export function ModalAddTask({ onClose, onAdd }: ModalAddTaskProps) {
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    if (description.trim()) {
      onAdd(description);
      setDescription('');
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Criar nova tarefa</h2>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
        />
        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.createButton} onClick={handleAddTask}>
            Criar
          </button>
        </div>
      </div>
    </div>
  );
}
