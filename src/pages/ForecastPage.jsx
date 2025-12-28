import CashFlowForecast from '../components/CashFlowForecast';

export default function ForecastPage({ transactions, bills }) {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Cash Flow Forecast</h2>
            <CashFlowForecast transactions={transactions} bills={bills} />
            {/* Potential Future: Add more detailed analysis or tables here */}
        </div>
    );
}
