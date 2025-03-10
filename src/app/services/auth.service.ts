import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<firebase.User | null>;
  public user: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.userSubject = new BehaviorSubject<firebase.User | null>(null);
    this.user = this.userSubject.asObservable();
  }

  // Get current user
  public get currentUserValue(): firebase.User | null {
    return this.userSubject.value;
  }

  // Login with email and password
  login(email: string, password: string): Observable<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password).pipe(
      catchError((error) => {
        throw error; // Handle errors as necessary
      })
    );
  }

  // Logout
  logout(): void {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  // Listen to auth state changes
  listenToAuthState(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }
}
