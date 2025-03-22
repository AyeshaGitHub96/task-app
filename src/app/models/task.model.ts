import { Timestamp } from '@angular/fire/firestore'; // Import Firestore Timestamp

export interface Task {
  id?: string;
  name: string;
  description: string;
  duedate?: Timestamp | Date | string; // Allow multiple formats
  status: 'pending' | 'completed';

}
