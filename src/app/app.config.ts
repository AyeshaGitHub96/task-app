import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { provideFirestore, getFirestore, initializeFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => {
      console.log("Initializing Firebase...");
      const app = initializeApp(environment.firebaseConfig);
      console.log("Firebase App Initialized:", getApp());
      return app;
    }),
    provideFirestore(() => {
      console.log("Initializing Firestore...");
      const app = getApp(); 
      return getFirestore(app); 
    }),
  ],
};
