import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';
import CashFlowForecast from './CashFlowForecast';
import BillsList from './BillsList';
import BillForm from './BillForm';

export default function Dashboard({ transactions, onAddTransaction, bills, onAddBill, onDeleteBill }) {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const balance = income - expense;

    return (
        <div className="flex flex-col gap-4">
            {/* Balance Section */}
            <div className="card" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white' }}>
                <h2 style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '0.5rem' }}>Total Balance</h2>
                <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>£{balance.toFixed(2)}</div>
                <div className="flex mt-4 gap-4">
                    <div className="w-full" style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                        <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Income</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>+£{income.toFixed(2)}</div>
                    </div>
                    <div className="w-full" style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                        <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Expense</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>-£{expense.toFixed(2)}</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                <BillForm onAddBill={onAddBill} />
                <BillsList bills={bills} onDeleteBill={onDeleteBill} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                <TransactionForm onAddTransaction={onAddTransaction} />
                <TransactionList transactions={transactions} />
            </div>

            <CashFlowForecast transactions={transactions} bills={bills} />
        </div>
    );
}
