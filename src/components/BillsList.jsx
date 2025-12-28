export default function BillsList({ bills, onDeleteBill }) {
    return (
        <div className="card">
            <h3>Upcoming Bills</h3>
            {bills.length === 0 ? (
                <p className="text-secondary">No bills added yet.</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #334155' }}>
                                <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Payee</th>
                                <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Amount</th>
                                <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Next Due</th>
                                <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Account</th>
                                <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Frequency</th>
                                <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills.map(bill => (
                                <tr key={bill.id} style={{ borderBottom: '1px solid #1e293b' }}>
                                    <td style={{ padding: '0.75rem', fontWeight: 500 }}>{bill.payee}</td>
                                    <td style={{ padding: '0.75rem' }}>£{bill.amount.toFixed(2)}</td>
                                    <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{new Date(bill.nextDue).toLocaleDateString('en-GB')}</td>
                                    <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{bill.account}</td>
                                    <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{bill.frequency}</td>
                                    <td style={{ padding: '0.75rem' }}>
                                        <button
                                            onClick={() => onDeleteBill(bill.id)}
                                            className="text-danger"
                                            style={{ background: 'none', padding: '0.25rem 0.5rem', border: '1px solid #ef4444' }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
