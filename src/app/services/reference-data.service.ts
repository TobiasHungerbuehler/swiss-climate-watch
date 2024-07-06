import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReferenceDataService {
  firestore: Firestore = inject(Firestore);

  constructor() {}

  // Methode, um die Referenzdaten für einen bestimmten Monat zu abonnieren und in der Konsole auszugeben
  subscribeToReferenceDataForMonth(month: number): Observable<any[]> {
    const referenceDataRef = collection(this.firestore, 'referenceTemperatures');
    
    return collectionData(referenceDataRef).pipe(
      map(docs => {
        // Ausgabe der Rohdaten in der Konsole
        console.log('Raw reference data from Firestore:', docs);

        const processedDocs = docs.map(doc => ({
          city: doc['city'],
          referenceTemp: doc['referenceTemp'][month],
          refAverageMonth: month
        }));
        
        // Ausgabe der verarbeiteten Daten in der Konsole, um zu überprüfen, ob refAverageMonth hinzugefügt wurde
        console.log('Processed reference data with refAverageMonth:', processedDocs);

        return processedDocs;
      })
    );
  }
}
