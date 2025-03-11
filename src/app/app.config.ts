import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]),
    provideFirebaseApp(() => {
      try {
        return getApp(); // Try to get an existing app
      } catch {
        return initializeApp(environment.firebaseConfig); // Initialize if not already created
      }
    }),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};

  // providers: [
  //   provideRouter([]),
  //   provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  //   provideAuth(() => getAuth()),
  //   provideFirestore(() => getFirestore())
  //   ]
// };
