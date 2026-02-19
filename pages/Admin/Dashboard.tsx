import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { analyticsService } from '../../services/analytics';
import { DailyStats, VisitorLog } from '../../types';

export default function Dashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState<DailyStats[]>([]);
    const [logs, setLogs] = useState<VisitorLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [dailyStats, visitorLogs] = await Promise.all([
                    analyticsService.getDailyStats(7),
                    analyticsService.getVisitorLogs(50)
                ]);
                setStats(dailyStats);
                setLogs(visitorLogs);
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome, {user?.displayName || 'Admin'}
            </h1>

            {/* Daily Stats Section */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.length > 0 && (
                    <>
                        <StatCard
                            title="Today's Views"
                            value={stats[0].totalViews}
                            subtitle={stats[0].date}
                        />
                        <StatCard
                            title="Today's Visitors"
                            value={stats[0].uniqueVisits}
                            subtitle="Unique IPs"
                        />
                        <StatCard
                            title="GitHub Clicks"
                            value={stats[0].githubClicks || 0}
                            subtitle="Total Today"
                        />
                        <StatCard
                            title="LinkedIn Clicks"
                            value={stats[0].linkedinClicks || 0}
                            subtitle="Total Today"
                        />
                    </>
                )}
            </div>

            {/* Recent Visitors Table */}
            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-sm text-primary hover:underline"
                    >
                        Refresh
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full whitespace-nowrap text-left text-sm text-gray-600 dark:text-gray-300">
                        <thead className="bg-gray-100 dark:bg-gray-700 uppercase font-medium">
                            <tr>
                                <th className="px-4 py-2">Time</th>
                                <th className="px-4 py-2">Location</th>
                                <th className="px-4 py-2">Device</th>
                                <th className="px-4 py-2">Action / System</th>
                                <th className="px-4 py-2">Page / Target</th>
                                <th className="px-4 py-2">Stats</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => (
                                <tr key={log.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{new Date(log.visitedAt).toLocaleTimeString()}</span>
                                            <span className="text-xs text-gray-400">{new Date(log.visitedAt).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div>{log.city}, {log.country}</div>
                                        <div className="text-xs text-gray-400 font-mono">{log.ip}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium 
                                            ${log.deviceType === 'mobile' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                                log.deviceType === 'tablet' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                                                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                                            {log.deviceType || 'desktop'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-xs">
                                        {log.type === 'click' ? (
                                            <span className="font-bold text-primary">CLICKED {log.target}</span>
                                        ) : (
                                            <>
                                                <div>{log.browser} {log.browserVersion}</div>
                                                <div className="text-gray-400">{log.os} {log.osVersion}</div>
                                            </>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 max-w-[200px] truncate">
                                        <div title={log.path} className="truncate">{log.path}</div>
                                        <div title={log.referrer} className="text-xs text-gray-400 truncate max-w-[150px]">
                                            Ref: {log.referrer === 'direct' ? 'Direct' : (log.referrer ? new URL(log.referrer).hostname : 'unknown')}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {log.type === 'click' ? (
                                            <span className="text-xs">Event</span>
                                        ) : (
                                            <>
                                                <div>{log.duration > 0 ? `${log.duration}s` : 'Active'}</div>
                                                <div className="text-xs text-gray-400">Scroll: {log.scrollPercent || 0}%</div>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {logs.length === 0 && !loading && (
                                <tr><td colSpan={6} className="px-4 py-4 text-center">No logs recorded yet</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {loading && <p className="text-center py-4">Loading analytics...</p>}
            </div>
        </div>
    );
}

// Simple helper component for stats
function StatCard({ title, value, subtitle }: { title: string; value: number | string; subtitle?: string }) {
    return (
        <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
            <p className="mt-2 text-3xl font-bold text-primary">{value}</p>
            {subtitle && <p className="mt-1 text-xs text-gray-400">{subtitle}</p>}
        </div>
    );
}
