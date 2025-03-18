export interface Task {
  duedate: any;
  id?: string;
  name: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed';

}

