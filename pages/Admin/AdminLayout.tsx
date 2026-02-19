import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

export default function AdminLayout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/admin/login');
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md dark:bg-gray-800 flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
                </div>
                <nav className="flex-1 space-y-2 px-4">
                    <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) =>
                            `block rounded-lg px-4 py-2 transition-colors ${isActive
                                ? 'bg-primary/10 text-primary'
                                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/admin/backup"
                        className={({ isActive }) =>
                            `block rounded-lg px-4 py-2 transition-colors ${isActive
                                ? 'bg-primary/10 text-primary'
                                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`
                        }
                    >
                        Backup & Restore
                    </NavLink>
                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="w-full rounded-lg px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-8">
                <Outlet />
            </main>
        </div>
    );
}
