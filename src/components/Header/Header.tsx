import styles from './Header.module.scss';
import imgLogo from '../../assets/logo.svg';

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}
export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerComponents}>
        <img src={imgLogo} alt="logo dtmoney" />
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
      </div>
    </header>
  );
}
