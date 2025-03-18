import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Timestamp } from 'firebase/firestore'; // Import Firestore Timestamp
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
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
  providers: [
    provideNativeDateAdapter() // ✅ Fix: Provides DateAdapter for MatDatepicker
  ],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  fb = inject(FormBuilder);
  taskService = inject(TaskService);
  
  taskId: string | null = null;
  taskForm: FormGroup;

  constructor() {
    console.log("EditTaskComponent Constructor Called"); 
    this.taskForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required], // Firestore timestamp conversion needed
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log('EditTaskComponent Initialized');
    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('id');
      console.log('Editing task with ID in EditTaskComponent:', this.taskId);
      
      if (this.taskId) {
        this.loadTaskData(this.taskId);
      }
    });
  }

  loadTaskData(taskId: string): void {
    this.taskService.getTaskById(taskId).subscribe(task => {
      console.log('Task Data:', task);

      if (task) {
        let dueDateValue: Date | null = null;

        // ✅ Fix: Correct type check for Firestore Timestamp
        if (task.dueDate && typeof task.dueDate === 'object' && 'toDate' in task.dueDate) {
          dueDateValue = (task.dueDate as Timestamp).toDate(); // Convert Timestamp to Date
        } else if (typeof task.dueDate === 'string') {
          dueDateValue = new Date(task.dueDate); // Convert stored string to Date
        }

        this.taskForm.patchValue({
          ...task,
          dueDate: dueDateValue
        });
      }
    });
  }

  updateTask(): void {
    if (this.taskForm.valid && this.taskId) {
      const formValue = this.taskForm.getRawValue();

      const updatedTask: Task = {
        ...formValue,
        id: this.taskId,
        dueDate: formValue.dueDate instanceof Date 
          ? Timestamp.fromDate(formValue.dueDate) // Convert Date back to Timestamp
          : formValue.dueDate
      };

      this.taskService.updateTask(updatedTask).subscribe(() => {
        console.log('Task updated successfully');
        this.router.navigate(['/tasks']);
      });
    }
  }
}
