import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '@angular/fire/auth';
import { RouterOutlet } from '@angular/router';
import { CreateTaskComponent } from "./compoenets/create-task/create-task.component";
import { TaskListComponent } from "./compoenets/list-task/list-task.component";
import { MatTabsModule} from '@angular/material/tabs';

import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CreateTaskComponent, TaskListComponent, MatTabsModule],
  templateUrl: `./app.component.html`,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
[x: string]: any;
  private authService = inject(AuthService);
  user = signal<User | null>(null);

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => this.user.set(user));
  }

  login() {
    this.authService.loginWithGoogle().subscribe();
  }

  logout() {
    this.authService.logout().subscribe(() => this.user.set(null));
  }
}
// >>>>>>> 

  // isLoggedIn = false;
  // constructor(private authService: AuthService, private router: Router) {
  //   this.authService.getAuthState().subscribe(user => {
  //     this.isLoggedIn = !!user;
  //     if (!this.isLoggedIn) {
  //       this.router.navigate(['/login']);
  //     }
  //   });
  // }

  // logout(): void {
  //   this.authService.logout().subscribe(() => {
  //     this.router.navigate(['/login']);
  //   });
  // }
// }
// <<<<<<< HEAD
// ======
