import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    if (loading) return null;
    if (user) return <Navigate to="/admin/dashboard" replace />;

    const handleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
                <h2 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
                    Admin Login
                </h2>
                <button
                    onClick={handleLogin}
                    className="flex w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-3 text-gray-700 shadow-md transition-all hover:bg-gray-50 hover:shadow-lg border border-gray-200"
                >
                    <img
                        src="https://www.google.com/favicon.ico"
                        alt="Google"
                        className="h-6 w-6"
                    />
                    <span className="font-medium">Sign in with Google</span>
                </button>
            </div>
        </div>
    );
}
