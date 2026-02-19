import { useState } from 'react';
import { exportFirestoreData, importFirestoreData } from '../../services/admin';

export default function BackupRestore() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const handleExport = async () => {
        setLoading(true);
        setStatus('Exporting...');
        try {
            const json = await exportFirestoreData();
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `firestore-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setStatus('Export successful!');
        } catch (error) {
            console.error(error);
            setStatus('Export failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!confirm('WARNING: This will overwrite existing data. Are you sure?')) {
            event.target.value = ''; // Reset input
            return;
        }

        setLoading(true);
        setStatus('Importing...');

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const result = await importFirestoreData(e.target?.result as string);
                if (result.success) {
                    setStatus('Restore successful!');
                    alert('Data restored successfully.');
                } else {
                    setStatus('Restore failed. Check console.');
                }
            } catch (error) {
                setStatus('Restore failed.');
            } finally {
                setLoading(false);
                if (event.target) event.target.value = '';
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Database Backup & Restore
            </h1>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Backup Card */}
                <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                        Export Data
                    </h2>
                    <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
                        Download a JSON snapshot of all collections (Projects, Admins, Messages).
                    </p>
                    <button
                        onClick={handleExport}
                        disabled={loading}
                        className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Download Backup'}
                    </button>
                </div>

                {/* Restore Card */}
                <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                        Import Data
                    </h2>
                    <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
                        Restore from a JSON file. Existing documents with same IDs will be updated.
                    </p>
                    <div className="relative">
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleImport}
                            disabled={loading}
                            className="block w-full text-sm text-gray-500
                file:mr-4 file:rounded-full file:border-0
                file:bg-blue-50 file:px-4
                file:py-2 file:text-sm file:font-semibold
                file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>
                </div>
            </div>

            {status && (
                <div className="rounded-lg bg-blue-50 p-4 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    Status: {status}
                </div>
            )}
        </div>
    );
}
