import React from "react";
import styles from './styles.Menu.module.css';
import { CheckCircle, PencilSimple, Trash } from "phosphor-react";

type ModalDotsMenuProps = {
  onConclude: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onClose : () => void;
};

export const ModalDotsMenu: React.FC<ModalDotsMenuProps> = ({
  onConclude,
  onEdit,
  onDelete,
  onClose,
}) => {
  return (
    <div className={styles.Modal}>
      <div className={styles.MenuContent}>
        <button type="button" onClick={onConclude}>
          <CheckCircle size={20} /> Concluir
        </button>

        <button type="button" onClick={onEdit}>
          <PencilSimple size={20} /> Editar
        </button>

        <button type="button" onClick={onDelete}>
          <Trash size={20} /> Excluir 
        </button>
      </div>
      <button className={styles.CloseButton} onClick={onClose}> Fechar </button>
    </div>
  );
};
