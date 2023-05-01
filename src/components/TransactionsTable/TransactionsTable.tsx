import styles from './TransactionsTable.module.scss';
import { useTransactions } from '../../hooks/useTransactions';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

function deleteTransaction(id: number) {
  console.log(id);
  let url = 'http://127.0.0.1:5000/transaction?transaction_id=' + id;
  fetch(url, {
    method: 'delete'
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });
}

function reloadWindow() {
  window.location.reload();
}

function clickFunction(id: number) {
  reloadWindow();
  deleteTransaction(id);
}

export function TransactionsTable() {
  const { transactions } = useTransactions();

  return (
    <div className={styles.transactionsTable}>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => {
            return (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td
                  className={
                    transaction.type === 'deposit'
                      ? styles.deposit
                      : styles.withdraw
                  }
                >
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(transaction.amount)}
                </td>
                <td>{transaction.category}</td>
                <td>
                  {new Intl.DateTimeFormat('pt-BR').format(
                    new Date(transaction.createdAt)
                  )}
                </td>
                <td>
                  <button
                    id="trash"
                    onClick={() => clickFunction(transaction.id)}
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
// function deleteTransaction(arg0: {
//   title: any;
//   amount: any;
//   category: any;
//   type: any;
//   id: number;
//   createdAt: string;
// }) {
//   throw new Error('Function not implemented.');
// }
