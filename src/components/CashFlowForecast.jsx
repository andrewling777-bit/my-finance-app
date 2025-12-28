import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useState, useMemo } from 'react';

export default function CashFlowForecast({ transactions = [], bills = [] }) {
    const [selectedAccount, setSelectedAccount] = useState('All');

    // Extract unique accounts from both transactions and bills
    const accounts = useMemo(() => {
        const txAccounts = transactions.map(t => t.account).filter(Boolean);
        const billAccounts = bills.map(b => b.account).filter(Boolean);
        return ['All', ...new Set([...txAccounts, ...billAccounts])];
    }, [transactions, bills]);

    const data = useMemo(() => {
        // Filter data based on selection
        const filteredTransactions = selectedAccount === 'All'
            ? transactions
            : transactions.filter(t => t.account === selectedAccount);

        const filteredBills = selectedAccount === 'All'
            ? bills
            : bills.filter(b => b.account === selectedAccount);

        // 1. Calculate Current Balance
        const currentIncome = filteredTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const currentExpense = filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        let currentBalance = currentIncome - currentExpense;

        // 2. Calculate Monthly Net Flow from Bills
        // (Assuming bills are monthly for simplicity in this forecast)
        const monthlyBillTotal = filteredBills.reduce((sum, b) => sum + b.amount, 0);

        // 3. Estimate Monthly Income (Simple average or taking the 'Salary' if likely)
        // For robustness, let's take the filtered transactions income and assume it's roughly the monthly baseline
        // if we assume the history represents 1 month. If not, this might be skewed. 
        // Let's rely on the Bills vs Current Balance projection for a "Survival Graph".
        // Or simpler: Just project the BILLS deducting from balance, and assume NO new income (Conservative view)
        // OR: Assume the last month's income repeats.

        // Let's go with: Projected = Balance + (Recurring Income - Recurring Bills) * MonthIndex
        // We'll define "Recurring Income" as any income transaction > £1000 (heuristic for salary)
        const likelyMonthlyIncome = filteredTransactions
            .filter(t => t.type === 'income' && t.amount > 500)
            .reduce((sum, t) => sum + t.amount, 0);

        const netMonthlyChange = likelyMonthlyIncome - monthlyBillTotal;

        // Generate 6-month forecast
        const today = new Date();
        const forecast = [];

        for (let i = 0; i <= 5; i++) {
            const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
            const monthName = date.toLocaleString('default', { month: 'short' });

            forecast.push({
                month: monthName,
                balance: currentBalance + (netMonthlyChange * i)
            });
        }

        return forecast;
    }, [transactions, bills, selectedAccount]);

    return (
        <div className="card" style={{ marginTop: '1rem' }}>
            <div className="flex justify-between items-center mb-4">
                <h3>Cash Flow Forecast</h3>
                <select
                    value={selectedAccount}
                    onChange={(e) => setSelectedAccount(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '8px', background: '#1e293b', color: 'white', border: '1px solid #334155' }}
                >
                    {accounts.map(acc => (
                        <option key={acc} value={acc}>{acc} Accounts</option>
                    ))}
                </select>
            </div>

            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                            itemStyle={{ color: '#f8fafc' }}
                            formatter={(value) => [`£${value.toFixed(2)}`, 'Projected Balance']}
                        />
                        <Line
                            type="monotone"
                            dataKey="balance"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={{ fill: '#3b82f6', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
