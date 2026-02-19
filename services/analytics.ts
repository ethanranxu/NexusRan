import {
    collection,
    addDoc,
    updateDoc,
    doc,
    getDoc,
    setDoc,
    increment,
    arrayUnion,
    serverTimestamp,
    query,
    orderBy,
    limit,
    getDocs
} from 'firebase/firestore';
import { db } from './firebase';
import { VisitorLog, DailyStats } from '../types';

const LOGS_COLLECTION = 'visitor_logs';
const STATS_COLLECTION = 'daily_stats';

export const analyticsService = {
    // Log a new visitor and update daily stats
    async logVisitor(data: Omit<VisitorLog, 'id' | 'visitedAt' | 'duration' | 'scrollPercent' | 'type'>): Promise<string> {
        try {
            const now = new Date();
            const dateKey = now.toISOString().split('T')[0]; // YYYY-MM-DD

            // 1. Add detailed log
            const docRef = await addDoc(collection(db, LOGS_COLLECTION), {
                ...data,
                visitedAt: now.toISOString(),
                duration: 0,
                scrollPercent: 0,
                type: 'visit',
                createdAt: serverTimestamp()
            });

            // 2. Update Daily Stats (Atomic increment)
            const statsRef = doc(db, STATS_COLLECTION, dateKey);
            const statsSnap = await getDoc(statsRef);

            if (!statsSnap.exists()) {
                // Initialize for the day
                await setDoc(statsRef, {
                    date: dateKey,
                    totalViews: 1,
                    uniqueVisits: 1,
                    uniqueIps: [data.ip],
                    githubClicks: 0,
                    linkedinClicks: 0
                });
            } else {
                // Update existing
                const statsData = statsSnap.data() as DailyStats;
                const isUnique = !statsData.uniqueIps.includes(data.ip);

                await updateDoc(statsRef, {
                    totalViews: increment(1),
                    uniqueIps: arrayUnion(data.ip),
                    uniqueVisits: increment(isUnique ? 1 : 0)
                });
            }

            return docRef.id;
        } catch (error) {
            console.error('Error logging visitor:', error);
            // Return empty string to notify failure but not block app
            return '';
        }
    },

    // Log a click event (GitHub/LinkedIn)
    async logClick(platform: 'GitHub' | 'LinkedIn', visitorData: Partial<VisitorLog>) {
        try {
            const now = new Date();
            const dateKey = now.toISOString().split('T')[0];

            // 1. Add click log
            await addDoc(collection(db, LOGS_COLLECTION), {
                ...visitorData,
                visitedAt: now.toISOString(),
                type: 'click',
                target: platform,
                createdAt: serverTimestamp()
            });

            // 2. Update Daily Stats
            const statsRef = doc(db, STATS_COLLECTION, dateKey);
            const statsSnap = await getDoc(statsRef);

            if (!statsSnap.exists()) {
                await setDoc(statsRef, {
                    date: dateKey,
                    totalViews: 0,
                    uniqueVisits: 0,
                    uniqueIps: [],
                    githubClicks: platform === 'GitHub' ? 1 : 0,
                    linkedinClicks: platform === 'LinkedIn' ? 1 : 0
                });
            } else {
                await updateDoc(statsRef, {
                    [platform === 'GitHub' ? 'githubClicks' : 'linkedinClicks']: increment(1)
                });
            }

        } catch (error) {
            console.error('Error logging click:', error);
        }
    },

    // Update duration and scroll for an existing log
    async updateVisitStats(logId: string, duration: number, scrollPercent: number) {
        if (!logId) return;
        try {
            const logRef = doc(db, LOGS_COLLECTION, logId);
            await updateDoc(logRef, {
                duration: duration,
                scrollPercent: scrollPercent
            });
        } catch (error) {
            console.error('Error updating visit stats:', error);
        }
    },

    // Get Daily Stats for Dashboard
    async getDailyStats(days: number = 7): Promise<DailyStats[]> {
        try {
            const statsQuery = query(
                collection(db, STATS_COLLECTION),
                orderBy('date', 'desc'),
                limit(days)
            );
            const snapshot = await getDocs(statsQuery);
            return snapshot.docs.map(doc => doc.data() as DailyStats).reverse();
        } catch (error) {
            console.error('Error fetching daily stats:', error);
            return [];
        }
    },

    // Get Recent Logs for Dashboard
    async getVisitorLogs(limitCount: number = 50): Promise<VisitorLog[]> {
        try {
            const logsQuery = query(
                collection(db, LOGS_COLLECTION),
                orderBy('visitedAt', 'desc'),
                limit(limitCount)
            );
            const snapshot = await getDocs(logsQuery);
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as VisitorLog));
        } catch (error) {
            console.error('Error fetching visitor logs:', error);
            return [];
        }
    }
};
