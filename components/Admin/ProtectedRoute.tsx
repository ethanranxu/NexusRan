import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

export default function ProtectedRoute() {
    const { user, isAdmin, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    if (!isAdmin) {
        return (
            <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-50 p-4 dark:bg-gray-900">
                <h1 className="text-2xl font-bold text-red-600">Unauthorized Access</h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Your account ({user.email}) does not have administrator privileges.
                </p>
                <div className="inline-flex flex-col gap-3">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
                    >
                        Return to Home
                    </button>
                    <button
                        onClick={() => signOut(auth)}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        Switch Account
                    </button>
                </div>
            </div>
        );
    }

    return <Outlet />;
}
