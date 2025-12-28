import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
    return (
        <div className="flex min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)]">
            <Sidebar />
            <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
