import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TranscationDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  // vai ser o retorno de tudo
  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(types => types.type === 'income')
      .map(values => values.value)
      .reduce(
        (valueAccumulator, current): number => valueAccumulator + current,
        0,
      );
    const outcome = this.transactions
      .filter(types => types.type === 'outcome')
      .map(values => values.value)
      .reduce(
        (valueAccumulator, current): number => valueAccumulator + current,
        0,
      );

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };
    return balance;
  }

  public create({ title, type, value }: TranscationDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
