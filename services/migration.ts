
import { db } from './firebase';
import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { PROJECTS } from '../constants';

export const uploadProjectsToFirestore = async () => {
    try {
        const usaProject = PROJECTS.find(p => p.id === 'p-usa-01');

        if (!usaProject) {
            console.error('USA project (p-usa-01) not found in constants!');
            return { success: false, error: 'Project not found' };
        }

        const projectRef = doc(db, 'projects', 'p-usa-01');
        const projectSnap = await getDoc(projectRef);

        if (projectSnap.exists()) {
            // Update existing document
            await updateDoc(projectRef, {
                galleryImages: usaProject.galleryImages || []
            });
            console.log('Successfully updated p-usa-01 with galleryImages.');
        } else {
            // Create if missing (fallback)
            await setDoc(projectRef, JSON.parse(JSON.stringify(usaProject)));
            console.log('Created p-usa-01 document.');
        }

        return { success: true };
    } catch (error) {
        console.error('Migration failed:', error);
        return { success: false, error };
    }
};
