export interface Task {
  id?: string;
  name: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed';

}

