import { Home, Receipt, ArrowRightLeft, TrendingUp, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const navItems = [
        { to: "/", icon: <Home size={20} />, label: "Dashboard" },
        { to: "/bills", icon: <Receipt size={20} />, label: "Bills" },
        { to: "/transactions", icon: <ArrowRightLeft size={20} />, label: "Transactions" },
        { to: "/forecast", icon: <TrendingUp size={20} />, label: "Forecast" },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="md:hidden fixed top-4 right-4 z-50 p-2 bg-slate-800 text-white rounded-lg"
                onClick={toggleSidebar}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Container */}
            <aside className={`
        fixed top-0 left-0 h-screen bg-slate-900 text-white w-64 p-6 transition-transform duration-300 z-40 border-r border-slate-800
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static
      `}>
                <h1 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <span className="text-blue-400">£</span> FinanceApp
                </h1>

                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                ${isActive
                                    ? 'bg-blue-600 text-white font-medium'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
                            onClick={() => setIsOpen(false)}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
