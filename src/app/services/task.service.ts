import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, query, where, getDocs, getDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map} from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskCollection = collection(this.firestore, 'tasks');

  constructor(private firestore: Firestore) {}

  // Create task
  createTask(task: Task): Observable<void> {
    return from(addDoc(this.taskCollection, task)).pipe(
      map(() => void 0)
    );
  }

  // Get all tasks
  getTasks(): Observable<Task[]> {
    return from(getDocs(this.taskCollection)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Task))
    );
  }

  // Get task by ID
  getTaskById(id: string): Observable<Task | undefined> {
    const taskRef = doc(this.firestore, `tasks/${id}`);
    return from(getDoc(taskRef)).pipe(
      map(docSnapshot => docSnapshot.exists() ? ({ id: docSnapshot.id, ...docSnapshot.data() }) as Task : undefined)
    );
  }

  // Update task
  updateTask(task: Task): Observable<void> {
    const taskRef = doc(this.firestore, `tasks/${task.id}`);
    return from(updateDoc(taskRef, { name: task.name, description: task.description, dueDate: task.dueDate, status: task.status })).pipe(
      map(() => void 0)
    );
  }

  // Delete task
  deleteTask(id: string): Observable<void> {
    const taskRef = doc(this.firestore, `tasks/${id}`);
    return from(deleteDoc(taskRef)).pipe(map(() => void 0));
  }

  // Filter tasks by status
  getTasksByStatus(status: string): Observable<Task[]> {
    const statusQuery = query(this.taskCollection, where('status', '==', status));
    return from(getDocs(statusQuery)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Task))
    );
  }
}
