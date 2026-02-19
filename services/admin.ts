import { collection, getDocs, doc, writeBatch } from 'firebase/firestore';
import { db } from './firebase';

const TARGET_COLLECTIONS = ['projects', 'admins', 'messages', 'skills', 'configuration'];

export const exportFirestoreData = async () => {
    const backupData: Record<string, any[]> = {};

    for (const colName of TARGET_COLLECTIONS) {
        try {
            const snapshot = await getDocs(collection(db, colName));
            backupData[colName] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.warn(`Export warning for collection ${colName}:`, error);
        }
    }

    return JSON.stringify(backupData, null, 2);
};

export const importFirestoreData = async (jsonString: string) => {
    try {
        const data = JSON.parse(jsonString);
        let batch = writeBatch(db);
        let operationCount = 0;
        const batchlimit = 450; // Safety margin below 500

        for (const colName of Object.keys(data)) {
            if (!Array.isArray(data[colName])) continue;

            for (const item of data[colName]) {
                if (!item.id) continue;

                const docRef = doc(db, colName, item.id);
                const { id, ...docData } = item; // Exclude id from data

                batch.set(docRef, docData);
                operationCount++;

                if (operationCount >= batchlimit) {
                    await batch.commit();
                    batch = writeBatch(db);
                    operationCount = 0;
                }
            }
        }

        if (operationCount > 0) {
            await batch.commit();
        }

        return { success: true };
    } catch (error) {
        console.error('Import failed:', error);
        return { success: false, error };
    }
};
