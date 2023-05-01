import axios from 'axios';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: Transaction) => Promise<void>;
  // deleteTransaction: (id: Transaction) => void;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  //função para coletar dados da API
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    api
      .get('/transactions')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  //função para enviar e registrar nova transação através da API, nesse caso foi necessário converter os dados de json para formulário.

  async function createTransaction(transactionInput: Transaction) {
    const formData = new FormData();
    formData.append('title', transactionInput.title);
    formData.append('amount', transactionInput.amount);
    formData.append('category', transactionInput.category);
    formData.append('type', transactionInput.type);

    axios
      .post('http://127.0.0.1:5000/transaction', formData)
      .then(response => console.log(formData))
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
