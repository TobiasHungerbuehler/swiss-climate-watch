import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';


import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideFirebaseApp(() => initializeApp({"projectId":"swiss-climate-watch","appId":"1:630205005500:web:3bf885b5d53c5d8a0d9ab9","storageBucket":"swiss-climate-watch.appspot.com","apiKey":"AIzaSyC3uG98nILk0Gu_Uc0bna4LozRfV4IdUzM","authDomain":"swiss-climate-watch.firebaseapp.com","messagingSenderId":"630205005500","measurementId":"G-EGVMY8VVYP"})), provideFirestore(() => getFirestore())]
};
