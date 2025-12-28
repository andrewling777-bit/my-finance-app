import BillsList from '../components/BillsList';
import BillForm from '../components/BillForm';

export default function BillsPage({ bills, onAddBill, onDeleteBill }) {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Bills Management</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <BillForm onAddBill={onAddBill} />
                </div>
                <div className="lg:col-span-2">
                    <BillsList bills={bills} onDeleteBill={onDeleteBill} />
                </div>
            </div>
        </div>
    );
}
