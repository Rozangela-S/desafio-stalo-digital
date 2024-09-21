import React, { useState } from "react";
import styles from './styles.Edit.module.css';

type ModalEditTaskProps = {
  taskDescription: string;
  onSave: (newDescription: string) => void;
  onClose: () => void;
};

export const ModalEditTask: React.FC<ModalEditTaskProps> = ({
  taskDescription,
  onSave,
  onClose,
}) => {
  const [description, setDescription] = useState(taskDescription || '');

  const handleSave = () => {
    if (description.trim()) {
      onSave(description);
      onClose();
    }
  };

  return (
    <div className={styles.ModalOverlay}>
      <div className={styles.ModalContent}>
        <h2>Editar Tarefa</h2>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
        />
        <div className={styles.ModalActions}>
          <button className={styles.CancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.SaveButton} onClick={handleSave}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};
