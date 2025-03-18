import { Routes } from '@angular/router';
import { CreateTaskComponent } from './compoenets/create-task/create-task.component';
import { DeleteTaskComponent } from './compoenets/delete-task/delete-task.component';
import { EditTaskComponent } from './compoenets/edit-task/edit-task.component';
import { TaskListComponent } from './compoenets/list-task/list-task.component';

export const routes: Routes = [
  { path: 'create', loadComponent: () => import('./compoenets/create-task/create-task.component').then(m => m.CreateTaskComponent) },
  { path: 'edit/:id', loadComponent: () => import('./compoenets/edit-task/edit-task.component').then(m => m.EditTaskComponent) },
  { path: 'delete/:id', loadComponent: () => import('./compoenets/delete-task/delete-task.component').then(m => m.DeleteTaskComponent) },
  { path: 'tasks', loadComponent: () => import('./compoenets/list-task/list-task.component').then(m => m.TaskListComponent) },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];


