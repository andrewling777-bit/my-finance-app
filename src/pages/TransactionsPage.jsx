import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';

export default function TransactionsPage({ transactions, onAddTransaction, onDeleteTransaction }) {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Transactions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <TransactionForm onAddTransaction={onAddTransaction} />
                </div>
                <div className="lg:col-span-2">
                    <TransactionList transactions={transactions} onDeleteTransaction={onDeleteTransaction} />
                </div>
            </div>
        </div>
    );
}
