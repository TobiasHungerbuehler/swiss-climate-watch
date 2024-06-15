import { Injectable } from '@angular/core';

export interface CityMarker {
  cityName: string;
  top: string;
  left: string;
  city: string;
  temperature?: string; // Optional property to hold temperature
}

@Injectable({
  providedIn: 'root'
})
export class CityMarkerService {
  private cityMarkers: CityMarker[] = [
    {cityName:"Zürich", top: '20%', left: '57%', city: 'Zürich / Fluntern', temperature: ''  },
    {cityName:"St.Gallen", top: '13%', left: '71%', city: 'St. Gallen', temperature: ''  },
    {cityName:"Säntis", top: '25%', left: '74%', city: 'Säntis' , temperature: ''  },
    {cityName:"Sion", top: '72%', left: '32%', city: 'Sion' , temperature: '' },
    {cityName:"Samedan", top: '60%', left: '85%', city: 'Samedan' , temperature: '' },
    {cityName:"Basel", top: '13%', left: '37%', city: 'Basel / Binningen' , temperature: '' },
    {cityName:"Bern", top: '40%', left: '34%', city: 'Bern / Zollikofen' , temperature: '' },
    {cityName:"Genf", top: '72%', left: '6%', city: 'Genève / Cointrin' , temperature: '' },
    {cityName:"Locarno", top: '74%', left: '63%', city: 'Locarno / Monti' , temperature: '' },
    {cityName:"Luzern", top: '34%', left: '52%', city: 'Luzern' , temperature: '' },
    {cityName:"Davos", top: '45%', left: '86%', city: 'Davos' , temperature: '' },
    {cityName:"Engelberg", top: '43%', left: '54%', city: 'Engelberg' , temperature: '' },
    {cityName:"Meiringen", top: '49%', left: '48%', city: 'Meiringen' , temperature: '' },
    {cityName:"Andermatt", top: '56%', left: '57%', city: 'Andermatt' , temperature: '' },
    {cityName:"Bad Ragaz", top: '34%', left: '77%', city: 'Bad Ragaz' , temperature: '' },
    {cityName:"Elm", top: '40%', left: '70%', city: 'Elm' , temperature: '' },
    {cityName:"La Chaux-de-Fonds", top: '33%', left: '20%', city: 'La Chaux-de-Fonds' , temperature: '' },
    {cityName:"Payerne", top: '44%', left: '23%', city: 'Payerne' , temperature: '' },
    {cityName:"Château-d'Oex", top: '63%', left: '25%', city: "Château-d'Oex" , temperature: '' },
    {cityName:"Lugano", top: '82%', left: '66%', city: 'Lugano' , temperature: '' },
    {cityName:"Grand St-Bernard", top: '86%', left: '27%', city: 'Col du Grand St-Bernard' , temperature: '' },
  ];

  getCityMarkers(): CityMarker[] {
    return this.cityMarkers;
  }
}
