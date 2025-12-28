import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import BillsPage from './pages/BillsPage';
import TransactionsPage from './pages/TransactionsPage';
import ForecastPage from './pages/ForecastPage';

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [
      { id: 1, description: 'Salary', amount: 2500, type: 'income', date: new Date().toISOString(), account: 'Chase' },
      { id: 2, description: 'Groceries', amount: 120.50, type: 'expense', date: new Date().toISOString(), account: 'Chase' },
      { id: 3, description: 'Rent', amount: 1000, type: 'expense', date: new Date().toISOString(), account: 'Chase' },
    ];
  });

  const [bills, setBills] = useState(() => {
    const saved = localStorage.getItem('bills');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('bills', JSON.stringify(bills));
  }, [bills]);

  const handleAddTransaction = (newTx) => {
    setTransactions([newTx, ...transactions]);
  };

  const handleAddBill = (newBill) => {
    setBills([newBill, ...bills]);
  };

  const handleDeleteBill = (id) => {
    setBills(bills.filter(bill => bill.id !== id));
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(tx => tx.id !== id));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage transactions={transactions} bills={bills} />} />
          <Route path="/bills" element={
            <BillsPage
              bills={bills}
              onAddBill={handleAddBill}
              onDeleteBill={handleDeleteBill}
            />
          } />
          <Route path="/transactions" element={
            <TransactionsPage
              transactions={transactions}
              onAddTransaction={handleAddTransaction}
              onDeleteTransaction={handleDeleteTransaction}
            />
          } />
          <Route path="/forecast" element={<ForecastPage transactions={transactions} bills={bills} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
