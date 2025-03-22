import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

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
export class EditTaskComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);

  private subscriptions: Subscription = new Subscription();
  taskId: string | null = null;
  taskForm: FormGroup;

  constructor() {
    console.log('EditTaskComponent Constructor Called');
    
    this.taskForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      description: ['', Validators.required],
      duedate: ['', Validators.required], // Storing date as a formatted string
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.paramMap.subscribe(params => {
        this.taskId = params.get('id');
        if (this.taskId) {
          this.loadTaskData(this.taskId);
        }
      })
    );
  }

  private loadTaskData(taskId: string): void {
    this.subscriptions.add(
      this.taskService.getTaskById(taskId).subscribe({
        next: (task) => {
          if (task) {
            this.taskForm.patchValue({
              ...task,
              duedate: this.parseToDate(task.duedate) // Convert to Date for Datepicker
            });
          }
        },
        error: (error) => console.error('Error loading task:', error)
      })
    );
  }

  updateTask(): void {
    if (this.taskForm.valid && this.taskId) {
      const formValue = this.taskForm.getRawValue();
      const updatedTask: Task = {
        ...formValue,
        id: this.taskId,
        duedate: this.formatDate(formValue.duedate) // Convert to string before saving
      };

      this.subscriptions.add(
        this.taskService.updateTask(this.taskId, updatedTask).subscribe({
          next: () => {
            console.log('✅ Task updated successfully');
            this.router.navigate(['/tasks']);
          },
          error: (error) => console.error('Error updating task:', error)
        })
      );
    }
  }

  private parseToDate(duedate: any): Date | null {
    if (!duedate) return null;
    if (duedate instanceof Date) return duedate;
    if (typeof duedate === 'string') return new Date(duedate);
    if (typeof duedate === 'object' && 'seconds' in duedate) return new Date(duedate.seconds * 1000);
    return null;
  }

  private formatDate(duedate: any): string {
    if (!duedate) return '';
    return new Date(duedate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Cleanup to prevent memory leaks
  }
}