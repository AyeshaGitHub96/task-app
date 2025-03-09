import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { DashboardComponent } from './compoenets/dashboard/dashboard.component';
import { AuthComponent } from './compoenets/auth/auth.component';
import { CreateTaskComponent } from './compoenets/create-task/create-task.component';

export const routes: Routes = [
  { path: 'create', component: CreateTaskComponent},
  // { path: 'login', component: AuthComponent },
];
