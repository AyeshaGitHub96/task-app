import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Task } from '../models/task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskCollection = collection(this.firestore, 'tasks');

  constructor(private firestore: Firestore) { }

    // Create task
    createTask(task: Task): Observable<any> {
      return new Observable(observer => {
        addDoc(this.taskCollection, task)
          .then(() => {
            observer.next('Task saved successfully!');
            observer.complete();
          })
          .catch(error => {
            observer.error('Error saving task: ' + error);
          });
      });
    }

}
