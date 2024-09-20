import React from "react";
import styles from './styles.Edit.module.css';
import { useState } from "react";


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
    onSave(description);
    onClose();
  };

  return (
    <div className={styles.Modal}>
      <div className={styles.Content}>
        <h2>Editar Tarefa</h2>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className={styles.Input} />
        <button type="button" onClick={handleSave}>Salvar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};