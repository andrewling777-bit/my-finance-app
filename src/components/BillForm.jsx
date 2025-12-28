import { useState } from 'react';

export default function BillForm({ onAddBill }) {
    const [payee, setPayee] = useState('');
    const [amount, setAmount] = useState('');
    const [nextDue, setNextDue] = useState('');
    const [account, setAccount] = useState('');
    const [frequency, setFrequency] = useState('Monthly');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!payee || !amount || !nextDue) return;

        onAddBill({
            id: Date.now(),
            payee,
            amount: parseFloat(amount),
            nextDue,
            account,
            frequency
        });

        setPayee('');
        setAmount('');
        setNextDue('');
        setAccount('');
        setFrequency('Monthly');
    };

    return (
        <div className="card">
            <h3>Add New Bill</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Payee</label>
                    <input
                        type="text"
                        value={payee}
                        onChange={(e) => setPayee(e.target.value)}
                        placeholder="e.g. Netflix"
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
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Next Due Date</label>
                    <input
                        type="date"
                        value={nextDue}
                        onChange={(e) => setNextDue(e.target.value)}
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
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Frequency</label>
                    <input
                        type="text"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        placeholder="Monthly"
                    />
                </div>
                <button type="submit" className="btn-primary mt-4">
                    Add Bill
                </button>
            </form>
        </div>
    );
}
