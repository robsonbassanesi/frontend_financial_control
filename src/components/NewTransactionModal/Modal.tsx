import Modal from 'react-modal';
import styles from './Modal.module.scss';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
export function NewTransactionModal({
  isOpen,
  onRequestClose
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState(0);

  //Função para criar uma nova transação.

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount: value,
      category,
      type,
      id: 0,
      createdAt: ''
    });

    setTitle('');
    setValue(0);
    setCategory('');
    setType('');

    onRequestClose();
  }

  function reloadWindow() {
    window.location.reload();
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="form-modal"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className={styles.buttonClose}
      >
        <img src={closeImg} alt="fechar modal" />
      </button>

      {/*formulário para coletar informações de novas transações  */}

      <form className={styles.form} onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <input
          placeholder="Valor"
          type="number"
          value={value}
          onChange={event => setValue(Number(event.target.value))}
        />
        <div>
          <button
            type="button"
            className={type === 'deposit' ? styles.income : ''}
            onClick={() => {
              setType('deposit');
            }}
          >
            <img src={incomeImg} alt="entrada" />
            <h3>Entrada</h3>
          </button>
          <button
            type="button"
            className={type === 'withdraw' ? styles.outcome : ''}
            onClick={() => {
              setType('withdraw');
            }}
          >
            <img src={outcomeImg} alt="saída" />
            <h3>Saída</h3>
          </button>
        </div>
        <input
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />
        <button type="submit" onClick={reloadWindow}>
          Cadastrar
        </button>
      </form>
    </Modal>
  );
}
