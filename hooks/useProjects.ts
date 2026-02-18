
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Project } from '../types';

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const q = query(collection(db, 'projects'));
                // Note: Firestore doesn't guarantee order unless specified. 
                // We fetch all and sort by ID for consistency with original constants.ts 
                // or rely on client-side sort if needed.

                const querySnapshot = await getDocs(q);
                const fetchedProjects: Project[] = [];

                querySnapshot.forEach((doc) => {
                    fetchedProjects.push({ id: doc.id, ...doc.data() } as Project);
                });

                // Sort by 'order' descending
                fetchedProjects.sort((a, b) => b.order - a.order);

                setProjects(fetchedProjects);
                setLoading(false);
            } catch (err: any) {
                console.error("Error fetching projects:", err);
                setError(err.message || 'Failed to fetch projects');
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return { projects, loading, error };
};
