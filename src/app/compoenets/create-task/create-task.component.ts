import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
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
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {
  taskForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duedate: [null, Validators.required],
      status: ['pending'] // Default status
   
    });
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
  
      const task: Task = {
        ...formValue,
        duedate: formValue.duedate instanceof Date
          ? formValue.duedate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
          : formValue.duedate 
      };
  
      this.taskService.createTask(task).subscribe({
        next: (message) => {
          console.log('Task saved:', message);
          this.taskForm.reset({ status: 'pending' });
        },
        error: (error) => console.error(error)
      });
    }
  }
  
  
}