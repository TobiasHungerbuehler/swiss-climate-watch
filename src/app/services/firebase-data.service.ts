import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, setDoc, onSnapshot, collectionData } from '@angular/fire/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
  firestore: Firestore = inject(Firestore);

  constructor() {
    
  }

  // Methode, um die Referenzdaten zu abonnieren und in der Konsole auszugeben
  subscribeToReferenceData(): void {
    const referenceDataRef = collection(this.firestore, 'referenceTemperatures');
    onSnapshot(referenceDataRef, (snapshot) => {
      const referenceData: any[] = [];
      snapshot.forEach(doc => {
        referenceData.push(doc.data());
      });
      console.log('Reference Data:', referenceData);
    });
  }

    // Methode, um die Referenzdaten für einen bestimmten Monat zu abonnieren und in der Konsole auszugeben
    subscribeToReferenceDataForMonth(month: number): void {
      const referenceDataRef = collection(this.firestore, 'referenceTemperatures');
      collectionData(referenceDataRef).pipe(
        map(docs => docs.map(doc => ({
          city: doc['city'],
          referenceTemp: doc['referenceTemp'][month]
        })))
      ).subscribe(referenceData => {
        console.log(`Reference Data for month ${month}:`, referenceData);
      });
    }






















  // Methode zum Hochladen von Daten in Firebase
  async uploadReferenceData(data: any[]): Promise<void> {
    const referenceDataRef = collection(this.firestore, 'referenceTemperatures');
    for (const item of data) {
      const refDoc = doc(referenceDataRef, item.city);
      try {
        await setDoc(refDoc, item);
        console.log(`Document for city ${item.city} successfully written!`);
      } catch (error) {
        console.error(`Error writing document for city ${item.city}: `, error);
      }
    }
  }
}
