import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, query, where, getDocs, collectionData } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskCollection = collection(this.firestore, 'tasks');

  constructor(private firestore: Firestore) { }

  // Create task
  createTask(task: Task): Observable<any> {
    return from(addDoc(this.taskCollection, task)).pipe(
      map(() => 'Task saved successfully!'),
      catchError(error => { throw new Error('Error saving task: ' + error) })
    );
  }

  // Get all tasks
  getTasks(): Observable<Task[]> {
    return collectionData(this.taskCollection, { idField: 'id' }) as Observable<Task[]>;
  }

  // Update task
  updateTask(task: Task): Observable<any> {
    const taskDocRef = doc(this.firestore, `tasks/${task.id}`);
    return from(updateDoc(taskDocRef, { ...task })).pipe(
      map(() => 'Task updated successfully!'),
      catchError(error => { throw new Error('Error updating task: ' + error) })
    );
  }

  // Delete task
  deleteTask(taskId: string): Observable<any> {
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`);
    return from(deleteDoc(taskDocRef)).pipe(
      map(() => 'Task deleted successfully!'),
      catchError(error => { throw new Error('Error deleting task: ' + error) })
    );
  }

  // Filter tasks by status
  getTasksByStatus(status: string): Observable<Task[]> {
    const taskQuery = query(this.taskCollection, where('status', '==', status));
    return from(getDocs(taskQuery)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Task)),
      catchError(error => { throw new Error('Error fetching tasks: ' + error) })
    );
  }
}

