import React from "react";
import styles from './styles.Menu.module.css';
import { CheckCircle, PencilSimple, Trash, Close, XCircle } from "phosphor-react";

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
        <button type="button" onClick={onEdit} className={styles.Edit}>
          <PencilSimple size={17} color="var(--gray-light-1)" /> 
          <span>Editar</span>
        </button>

        <button type="button" onClick={onConclude} className={styles.Completed}>
          <div className="teste">
            <CheckCircle size={17} color="var(--green)" /> 
          </div>
          <span>Concluir</span>
        </button>

        <button type="button" onClick={onDelete} className={styles.Delete}>
          <Trash size={17} color="var(--red)" /> 
          <span>Exclui</span>
        </button>

        <button className={styles.CloseButton} onClick={onClose}> 
          <XCircle size={17} color="var(--red)" />
          <span>Fechar</span>
        </button>
      </div>
    </div>
  );
};
