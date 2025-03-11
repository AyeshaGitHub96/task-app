import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService  {
  private user!: User | null;

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
    });
  }

  // Login with email & password
  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // Logout
  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.user;
  }

  // Check if user is logged in
  isAuthenticated(): boolean {
    return this.user !== null;
  }
}