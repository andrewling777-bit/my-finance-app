export default function TransactionList({ transactions, onDeleteTransaction }) {
    return (
        <div className="card">
            <h3>Recent Transactions</h3>
            {transactions.length === 0 ? (
                <p className="text-secondary">No transactions yet.</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {transactions.map(tx => (
                        <div key={tx.id} className="flex justify-between items-center" style={{ paddingBottom: '0.5rem', borderBottom: '1px solid #334155' }}>
                            <div className="flex-1">
                                <div style={{ fontWeight: 500 }}>{tx.description}</div>
                                <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                                    {new Date(tx.date).toLocaleDateString('en-GB')} • {tx.account}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className={tx.type === 'income' ? 'text-success' : 'text-danger'} style={{ fontWeight: 600 }}>
                                    {tx.type === 'income' ? '+' : '-'}£{tx.amount.toFixed(2)}
                                </div>
                                <button
                                    onClick={() => onDeleteTransaction(tx.id)}
                                    className="text-danger hover:bg-red-900/20 rounded p-1"
                                    title="Delete Transaction"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
