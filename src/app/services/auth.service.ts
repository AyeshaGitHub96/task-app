import { inject, Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User} from '@angular/fire/auth';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService  {
  [x: string]: any;
  private auth = inject(Auth);

  loginWithGoogle(): Observable<User | null> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider).then((res) => res.user));
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  getCurrentUser(): Observable<User | null> {
    return new Observable((observer) => {
      onAuthStateChanged(this.auth, (user) => {
        observer.next(user);
      });
    });
  }
}