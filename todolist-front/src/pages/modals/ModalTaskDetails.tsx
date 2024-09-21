import React from "react";
import styles from './style.Details.module.css';

type TaskDetailsProps = {
  description: string;
  id: string;
  creationDate: string;
  lastUpdate: string;
  status: string;
  onClose: () => void;
};

export const TaskDetails: React.FC<TaskDetailsProps> = ({
  description,
  id,
  creationDate,
  lastUpdate,
  status,
  onClose,
}) => {

  const formatarData = (data: string) => {
    const dataArray = data.split('-');

    return `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`;
  }

  return (
    <div className={styles.Modal}>
      <div className={styles.Content}>
        <div>
          <label>Descrição</label>
          <span>{description}</span>
        </div>

        <div>
          <label>Id</label>
          <span>{id}</span>
        </div>

        <div>
          <label>Data de criação</label>
          <span>{formatarData(creationDate)}</span>
        </div>

        <div>
          <label>Última atualização</label>
          <span>{formatarData(lastUpdate)}</span>
        </div>

        <div>
          <label>Status</label>
          <span>{status}</span>
        </div>
        
        <button type="button" onClick={onClose} className={styles.ButtonHom}>Voltar para Home</button>
      </div>
    </div>
  )
}
