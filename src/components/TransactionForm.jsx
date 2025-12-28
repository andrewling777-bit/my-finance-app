import { useState } from 'react';

export default function TransactionForm({ onAddTransaction }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    const [account, setAccount] = useState('Chase');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description || !amount) return;

        onAddTransaction({
            id: Date.now(),
            description,
            amount: parseFloat(amount),
            type,
            date: new Date().toISOString(),
            account
        });

        setDescription('');
        setAmount('');
        setType('expense');
        setAccount('Chase');
    };

    return (
        <div className="card">
            <h3>Add Transaction</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g., Grocery"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Account</label>
                    <input
                        type="text"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                        placeholder="e.g. Chase"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Type</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-4 py-2 px-4 rounded" style={{ background: type === 'income' ? 'rgba(34, 197, 94, 0.2)' : 'transparent', border: '1px solid #334155', cursor: 'pointer' }}>
                            <input
                                type="radio"
                                checked={type === 'income'}
                                onChange={() => setType('income')}
                                style={{ width: 'auto' }}
                            />
                            Income
                        </label>
                        <label className="flex items-center gap-4 py-2 px-4 rounded" style={{ background: type === 'expense' ? 'rgba(239, 68, 68, 0.2)' : 'transparent', border: '1px solid #334155', cursor: 'pointer' }}>
                            <input
                                type="radio"
                                checked={type === 'expense'}
                                onChange={() => setType('expense')}
                                style={{ width: 'auto' }}
                            />
                            Expense
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn-primary mt-4">
                    Add Transaction
                </button>
            </form>
        </div>
    );
}
