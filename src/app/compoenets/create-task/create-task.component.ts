import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';  // Update path to models instead of dto


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

  constructor(private fb: FormBuilder,private taskService: TaskService) {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      description: [''],
      dueDate: [''],
      status: ['', Validators.required]
    });
  }

  // onSubmit() {
  //   if (this.taskForm.valid) {
  //     console.log('Task Created:', this.taskForm.value);
  //     this.taskForm.reset();
  //   }
  // }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = this.taskForm.value;

      this.taskService.createTask(newTask).subscribe({
        next: (message) => {
          alert(message); // Success alert
          this.taskForm.reset(); // Reset form
        },
        error: (error) => {
          alert(error); // Error alert
        }
      });
    }
  }
}

