import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

import styles from './Summary.module.scss';

// função para cálculo de entradas, saídas e saldo.

export function Summary() {
  const { transactions } = useTransactions();
  // console.log(useTransactions);

  const Summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'deposit') {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraws += transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
    { deposits: 0, withdraws: 0, total: 0 }
  );

  return (
    <header className={styles.dashboard}>
      <div className={styles.dashboardBox}>
        <main>
          <p>Entradas</p>
          <img src={incomeImg} alt="ícone entradas" />
        </main>
        <h1>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(Summary.deposits)}
        </h1>
      </div>
      <div className={styles.dashboardBox}>
        <main>
          <p>Saídas</p>
          <img src={outcomeImg} alt="ícone entradas" />
        </main>
        <h1>
          -
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(Summary.withdraws)}
        </h1>
      </div>
      <div className={styles.dashboardBox}>
        <main>
          <p>Total</p>
          <img src={totalImg} alt="ícone entradas" />
        </main>
        <h1>
          {' '}
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(Summary.total)}
        </h1>
      </div>
    </header>
  );
}
