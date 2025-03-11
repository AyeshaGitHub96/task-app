import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Timestamp } from '@firebase/firestore-types';

import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';  


@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      status: ['Pending']
    });
  }

  async saveTask() {
    if (this.taskForm.valid) {
      const tasksCollection = collection(this.firestore, 'tasks');
      await addDoc(tasksCollection, {
        name: this.taskForm.value.name,
        description: this.taskForm.value.description,
        dueDate: Timestamp.fromDate(new Date(this.taskForm.value.dueDate)),
        status: 'Pending'
      });
      this.taskForm.reset();
    }
  }
}
