import { Injectable } from '@angular/core';

export interface ReferenceTemp {
  average: number;
  highest: number;
  highest_date: string;
  lowest: number;
  lowest_date: string;
}

export interface ReferenceData {
  city: string;
  referenceTemp: {
    "1": ReferenceTemp;
    "2": ReferenceTemp;
    "3": ReferenceTemp;
    "4": ReferenceTemp;
    "5": ReferenceTemp;
    "6": ReferenceTemp;
    "7": ReferenceTemp;
    "8": ReferenceTemp;
    "9": ReferenceTemp;
    "10": ReferenceTemp;
    "11": ReferenceTemp;
    "12": ReferenceTemp;
  };
  temperature?: string; // Optional property to hold temperature
}

@Injectable({
  providedIn: 'root'
})
export class ReferenceDataService {

  constructor() { }

  private referenceData: ReferenceData[] = [
    {
      "city": "Zürich / Fluntern",
      "referenceTemp": {
        "1": { "average": -1.3, "highest": 3.1, "highest_date": "1948-01", "lowest": -6.3, "lowest_date": "1963-01" },
        "2": { "average": -0.2, "highest": 5.6, "highest_date": "1966-02", "lowest": -8.9, "lowest_date": "1956-02" },
        "3": { "average": 2.9, "highest": 8.2, "highest_date": "1957-03", "lowest": -4.3, "lowest_date": "1963-03" },
        "4": { "average": 8.0, "highest": 11.1, "highest_date": "1947-04", "lowest": 5.5, "lowest_date": "1970-04" },
        "5": { "average": 11.9, "highest": 14.6, "highest_date": "1945-05", "lowest": 7.0, "lowest_date": "1957-05" },
        "6": { "average": 15.0, "highest": 18.2, "highest_date": "1950-06", "lowest": 11.2, "lowest_date": "1968-06" },
        "7": { "average": 17.0, "highest": 19.9, "highest_date": "1950-07", "lowest": 14.6, "lowest_date": "1968-07" },
        "8": { "average": 16.2, "highest": 20.3, "highest_date": "1944-08", "lowest": 14.6, "lowest_date": "1956-08" },
        "9": { "average": 13.6, "highest": 16.7, "highest_date": "1949-09", "lowest": 11.1, "lowest_date": "1962-09" },
        "10": { "average": 8.7, "highest": 11.5, "highest_date": "1966-10", "lowest": 7.1, "lowest_date": "1964-10" },
        "11": { "average": 3.7, "highest": 6.1, "highest_date": "1961-11", "lowest": 1.1, "lowest_date": "1942-11" },
        "12": { "average": -0.1, "highest": 2.8, "highest_date": "1954-12", "lowest": -4.0, "lowest_date": "1940-12" }
      }
    },
    
    {
      "city": "St. Gallen",
      "referenceTemp": {
        "1": { "average": -1.5, "highest": 3.0, "highest_date": "1948-01", "lowest": -7.3, "lowest_date": "1940-01" },
        "2": { "average": -0.2, "highest": 5.2, "highest_date": "1966-02", "lowest": -10.6, "lowest_date": "1956-02" },
        "3": { "average": 2.8, "highest": 6.9, "highest_date": "1957-03", "lowest": -6.0, "lowest_date": "1963-03" },
        "4": { "average": 6.7, "highest": 9.6, "highest_date": "1961-04", "lowest": 4.1, "lowest_date": "1970-04" },
        "5": { "average": 10.6, "highest": 14.4, "highest_date": "1945-05", "lowest": 7.0, "lowest_date": "1962-05" },
        "6": { "average": 14.0, "highest": 16.6, "highest_date": "1950-06", "lowest": 10.6, "lowest_date": "1962-06" },
        "7": { "average": 15.6, "highest": 18.2, "highest_date": "1950-07", "lowest": 13.4, "lowest_date": "1948-07" },
        "8": { "average": 15.2, "highest": 18.2, "highest_date": "1944-08", "lowest": 13.4, "lowest_date": "1950-08" },
        "9": { "average": 12.6, "highest": 15.0, "highest_date": "1949-09", "lowest": 11.1, "lowest_date": "1962-09" },
        "10": { "average": 7.9, "highest": 10.8, "highest_date": "1942-10", "lowest": 6.1, "lowest_date": "1964-10" },
        "11": { "average": 2.8, "highest": 6.0, "highest_date": "1961-11", "lowest": 1.1, "lowest_date": "1942-11" },
        "12": { "average": -0.3, "highest": 2.4, "highest_date": "1954-12", "lowest": -5.1, "lowest_date": "1940-12" }
      }
    },
    
    {
      "city": "Säntis",
      "referenceTemp": {
        "1": { "average": -8.3, "highest": -5.1, "highest_date": "1964-01", "lowest": -13.6, "lowest_date": "1942-01" },
        "2": { "average": -8.4, "highest": -4.1, "highest_date": "1959-02", "lowest": -16.8, "lowest_date": "1956-02" },
        "3": { "average": -5.9, "highest": -2.5, "highest_date": "1957-03", "lowest": -11.5, "lowest_date": "1944-03" },
        "4": { "average": -3.5, "highest": -0.3, "highest_date": "1946-04", "lowest": -7.4, "lowest_date": "1970-04" },
        "5": { "average": 0.3, "highest": 3.3, "highest_date": "1947-05", "lowest": -3.4, "lowest_date": "1961-05" },
        "6": { "average": 2.8, "highest": 6.8, "highest_date": "1967-06", "lowest": 0.0, "lowest_date": "1966-06" },
        "7": { "average": 4.3, "highest": 7.7, "highest_date": "1950-07", "lowest": 1.5, "lowest_date": "1943-07" },
        "8": { "average": 4.5, "highest": 8.9, "highest_date": "1944-08", "lowest": 2.7, "lowest_date": "1950-08" },
        "9": { "average": 3.5, "highest": 6.2, "highest_date": "1949-09", "lowest": 1.2, "lowest_date": "1965-09" },
        "10": { "average": 0.1, "highest": 3.3, "highest_date": "1969-10", "lowest": -3.6, "lowest_date": "1941-10" },
        "11": { "average": -4.2, "highest": -1.3, "highest_date": "1948-11", "lowest": -7.8, "lowest_date": "1952-11" },
        "12": { "average": -7.2, "highest": -4.3, "highest_date": "1953-12", "lowest": -11.1, "lowest_date": "1940-12" }
      }
    },
    
    {
      "city": "Sion",
      "referenceTemp": {
        "1": { "average": -1.3, "highest": 1.9, "highest_date": "1948-01", "lowest": -6.9, "lowest_date": "1945-01" },
        "2": { "average": 0.1, "highest": 5.4, "highest_date": "1966-02", "lowest": -6.5, "lowest_date": "1956-02" },
        "3": { "average": 4.9, "highest": 9.4, "highest_date": "1948-03", "lowest": -2.1, "lowest_date": "1953-03" },
        "4": { "average": 9.4, "highest": 12.4, "highest_date": "1946-04", "lowest": 7.1, "lowest_date": "1970-04" },
        "5": { "average": 13.5, "highest": 15.8, "highest_date": "1947-05", "lowest": 10.9, "lowest_date": "1941-05" },
        "6": { "average": 17.0, "highest": 19.7, "highest_date": "1950-06", "lowest": 14.7, "lowest_date": "1966-06" },
        "7": { "average": 18.4, "highest": 21.7, "highest_date": "1952-07", "lowest": 16.5, "lowest_date": "1948-07" },
        "8": { "average": 17.8, "highest": 20.7, "highest_date": "1947-08", "lowest": 15.8, "lowest_date": "1956-08" },
        "9": { "average": 14.7, "highest": 16.9, "highest_date": "1949-09", "lowest": 12.1, "lowest_date": "1965-09" },
        "10": { "average": 8.7, "highest": 11.6, "highest_date": "1966-10", "lowest": 7.1, "lowest_date": "1970-10" },
        "11": { "average": 3.1, "highest": 5.7, "highest_date": "1951-11", "lowest": 1.4, "lowest_date": "1942-11" },
        "12": { "average": -0.7, "highest": 2.6, "highest_date": "1953-12", "lowest": -6.4, "lowest_date": "1940-12" }
      }
    },
    
    {
      "city": "Samedan",
      "referenceTemp": {
        "1": { "average": -9.1, "highest": -5.4, "highest_date": "1948-01", "lowest": -13.8, "lowest_date": "1945-01" },
        "2": { "average": -7.2, "highest": -2.4, "highest_date": "1966-02", "lowest": -15.5, "lowest_date": "1956-02" },
        "3": { "average": -3.6, "highest": -1.0, "highest_date": "1959-03", "lowest": -7.5, "lowest_date": "1958-03" },
        "4": { "average": 0.7, "highest": 3.4, "highest_date": "1961-04", "lowest": -2.7, "lowest_date": "1970-04" },
        "5": { "average": 5.6, "highest": 7.9, "highest_date": "1947-05", "lowest": 3.2, "lowest_date": "1957-05" },
        "6": { "average": 9.2, "highest": 11.4, "highest_date": "1950-06", "lowest": 6.7, "lowest_date": "1956-06" },
        "7": { "average": 10.6, "highest": 13.7, "highest_date": "1952-07", "lowest": 8.8, "lowest_date": "1948-07" },
        "8": { "average": 10.5, "highest": 13.0, "highest_date": "1944-08", "lowest": 9.2, "lowest_date": "1962-08" },
        "9": { "average": 8.0, "highest": 9.5, "highest_date": "1949-09", "lowest": 5.2, "lowest_date": "1965-09" },
        "10": { "average": 3.1, "highest": 5.3, "highest_date": "1966-10", "lowest": 0.7, "lowest_date": "1960-10" },
        "11": { "average": -2.8, "highest": -0.1, "highest_date": "1947-11", "lowest": -6.1, "lowest_date": "1952-11" },
        "12": { "average": -7.1, "highest": -4.1, "highest_date": "1953-12", "lowest": -13.6, "lowest_date": "1940-12" }
      }
    },
    
    {
      "city": "Basel / Binningen",
      "referenceTemp": {
        "1": { "average": 0.2, "highest": 5.3, "highest_date": "1948-01", "lowest": -6.1, "lowest_date": "1940-01" },
        "2": { "average": 0.7, "highest": 6.8, "highest_date": "1966-02", "lowest": -9.0, "lowest_date": "1956-02" },
        "3": { "average": 4.9, "highest": 9.2, "highest_date": "1957-03", "lowest": 2.5, "lowest_date": "1958-03" },
        "4": { "average": 9.6, "highest": 12.2, "highest_date": "1947-04", "lowest": 7.1, "lowest_date": "1954-04" },
        "5": { "average": 13.1, "highest": 15.6, "highest_date": "1945-05", "lowest": 9.3, "lowest_date": "1955-05" },
        "6": { "average": 16.1, "highest": 19.1, "highest_date": "1950-06", "lowest": 14.0, "lowest_date": "1956-06" },
        "7": { "average": 17.4, "highest": 20.7, "highest_date": "1947-07", "lowest": 15.2, "lowest_date": "1956-07" },
        "8": { "average": 17.0, "highest": 20.9, "highest_date": "1947-08", "lowest": 15.2, "lowest_date": "1956-08" },
        "9": { "average": 14.8, "highest": 18.1, "highest_date": "1961-09", "lowest": 12.9, "lowest_date": "1965-09" },
        "10": { "average": 9.6, "highest": 12.3, "highest_date": "1967-10", "lowest": 8.3, "lowest_date": "1946-10" },
        "11": { "average": 3.9, "highest": 6.9, "highest_date": "1951-11", "lowest": 2.4, "lowest_date": "1962-11" },
        "12": { "average": 1.1, "highest": 4.9, "highest_date": "1955-12", "lowest": -2.9, "lowest_date": "1940-12" }
      }
    },
    
    {
      "city": "Bern / Zollikofen",
      "referenceTemp": {
        "1": { "average": -1.0, "highest": 2.7, "highest_date": "1962-01", "lowest": -7.1, "lowest_date": "1963-01" },
        "2": { "average": 0.2, "highest": 4.7, "highest_date": "1966-02", "lowest": -9.4, "lowest_date": "1956-02" },
        "3": { "average": 3.9, "highest": 7.5, "highest_date": "1957-03", "lowest": 0.6, "lowest_date": "1958-03" },
        "4": { "average": 8.6, "highest": 10.5, "highest_date": "1947-04", "lowest": 5.2, "lowest_date": "1956-04" },
        "5": { "average": 12.1, "highest": 14.0, "highest_date": "1947-05", "lowest": 8.2, "lowest_date": "1941-05" },
        "6": { "average": 15.2, "highest": 18.1, "highest_date": "1950-06", "lowest": 12.4, "lowest_date": "1946-06" },
        "7": { "average": 17.1, "highest": 20.3, "highest_date": "1947-07", "lowest": 14.3, "lowest_date": "1956-07" },
        "8": { "average": 16.4, "highest": 19.7, "highest_date": "1944-08", "lowest": 14.4, "lowest_date": "1956-08" },
        "9": { "average": 13.9, "highest": 16.9, "highest_date": "1949-09", "lowest": 11.0, "lowest_date": "1965-09" },
        "10": { "average": 8.7, "highest": 10.8, "highest_date": "1967-10", "lowest": 6.6, "lowest_date": "1956-10" },
        "11": { "average": 2.8, "highest": 6.0, "highest_date": "1963-11", "lowest": 1.1, "lowest_date": "1962-11" },
        "12": { "average": -0.4, "highest": 2.6, "highest_date": "1955-12", "lowest": -4.9, "lowest_date": "1940-12" }
      }
    },
    
    {
      "city": "Genève / Cointrin",
      "referenceTemp": {
        "1": { "average": 0.9, "highest": 3.7, "highest_date": "1948-01", "lowest": -4.1, "lowest_date": "1963-01" },
        "2": { "average": 2.1, "highest": 5.6, "highest_date": "1966-02", "lowest": -2.9, "lowest_date": "1963-02" },
        "3": { "average": 5.5, "highest": 9.3, "highest_date": "1948-03", "lowest": 2.6, "lowest_date": "1970-03" },
        "4": { "average": 9.7, "highest": 12.1, "highest_date": "1949-04", "lowest": 7.6, "lowest_date": "1954-04" },
        "5": { "average": 13.4, "highest": 15.5, "highest_date": "1947-05", "lowest": 9.8, "lowest_date": "1941-05" },
        "6": { "average": 16.9, "highest": 19.8, "highest_date": "1945-06", "lowest": 14.2, "lowest_date": "1966-06" },
        "7": { "average": 19.2, "highest": 21.8, "highest_date": "1950-07", "lowest": 16.4, "lowest_date": "1962-07" },
        "8": { "average": 18.0, "highest": 21.2, "highest_date": "1947-08", "lowest": 16.1, "lowest_date": "1968-08" },
        "9": { "average": 15.1, "highest": 18.2, "highest_date": "1949-09", "lowest": 12.4, "lowest_date": "1965-09" },
        "10": { "average": 9.9, "highest": 12.1, "highest_date": "1966-10", "lowest": 8.4, "lowest_date": "1944-10" },
        "11": { "average": 4.6, "highest": 7.5, "highest_date": "1963-11", "lowest": 3.1, "lowest_date": "1962-11" },
        "12": { "average": 1.7, "highest": 4.6, "highest_date": "1955-12", "lowest": -2.6, "lowest_date": "1940-12" }
      }
    },
    
    {
      "city": "Locarno / Monti",
      "referenceTemp": {
        "1": { "average": 2.3, "highest": 4.7, "highest_date": "1944-01", "lowest": -0.8, "lowest_date": "1945-01" },
        "2": { "average": 3.8, "highest": 6.5, "highest_date": "1946-02", "lowest": -1.1, "lowest_date": "1956-02" },
        "3": { "average": 7.9, "highest": 11.6, "highest_date": "1948-03", "lowest": 4.6, "lowest_date": "1962-03" },
        "4": { "average": 11.4, "highest": 13.8, "highest_date": "1943-04", "lowest": 9.2, "lowest_date": "1941-04" },
        "5": { "average": 14.9, "highest": 16.1, "highest_date": "1945-05", "lowest": 11.7, "lowest_date": "1941-05" },
        "6": { "average": 17.8, "highest": 20.6, "highest_date": "1945-06", "lowest": 16.4, "lowest_date": "1953-06" },
        "7": { "average": 19.8, "highest": 23.7, "highest_date": "1945-07", "lowest": 18.5, "lowest_date": "1958-07" },
        "8": { "average": 19.3, "highest": 22.3, "highest_date": "1943-08", "lowest": 17.4, "lowest_date": "1963-08" },
        "9": { "average": 16.8, "highest": 18.2, "highest_date": "1949-09", "lowest": 13.3, "lowest_date": "1965-09" },
        "10": { "average": 11.4, "highest": 14.0, "highest_date": "1949-10", "lowest": 9.9, "lowest_date": "1960-10" },
        "11": { "average": 6.2, "highest": 8.2, "highest_date": "1958-11", "lowest": 5.2, "lowest_date": "1952-11" },
        "12": { "average": 3.4, "highest": 5.9, "highest_date": "1953-12", "lowest": 0.0, "lowest_date": "1942-12" }
      }
    },
    
    {
      "city": "Luzern",
      "referenceTemp": {
        "1": { "average": -0.3, "highest": 3.7, "highest_date": "1948-01", "lowest": -5.3, "lowest_date": "1940-01" },
        "2": { "average": 0.4, "highest": 5.2, "highest_date": "1961-02", "lowest": -8.3, "lowest_date": "1956-02" },
        "3": { "average": 4.8, "highest": 8.4, "highest_date": "1957-03", "lowest": 0.9, "lowest_date": "1958-03" },
        "4": { "average": 8.5, "highest": 11.5, "highest_date": "1947-04", "lowest": 6.2, "lowest_date": "1969-04" },
        "5": { "average": 13.0, "highest": 15.1, "highest_date": "1945-05", "lowest": 9.0, "lowest_date": "1941-05" },
        "6": { "average": 16.0, "highest": 18.5, "highest_date": "1950-06", "lowest": 13.4, "lowest_date": "1956-06" },
        "7": { "average": 17.6, "highest": 20.1, "highest_date": "1950-07", "lowest": 14.8, "lowest_date": "1948-07" },
        "8": { "average": 16.8, "highest": 19.7, "highest_date": "1944-08", "lowest": 14.8, "lowest_date": "1948-08" },
        "9": { "average": 13.9, "highest": 16.6, "highest_date": "1949-09", "lowest": 11.7, "lowest_date": "1965-09" },
        "10": { "average": 8.4, "highest": 11.5, "highest_date": "1966-10", "lowest": 7.6, "lowest_date": "1970-10" },
        "11": { "average": 3.5, "highest": 6.4, "highest_date": "1947-11", "lowest": -0.3, "lowest_date": "1966-11" },
        "12": { "average": 0.4, "highest": 4.1, "highest_date": "1955-12", "lowest": -3.4, "lowest_date": "1940-12" }
      }
    },
    
    {
      "city": "Davos",
      "referenceTemp": {
        "1": { "average": -6.0, "highest": -2.9, "highest_date": "1948-01", "lowest": -11.7, "lowest_date": "1945-01" },
        "2": { "average": -5.3, "highest": -1.8, "highest_date": "1957-02", "lowest": -14.8, "lowest_date": "1956-02" },
        "3": { "average": -2.3, "highest": 0.3, "highest_date": "1942-03", "lowest": -5.6, "lowest_date": "1958-03" },
        "4": { "average": 1.7, "highest": 4.2, "highest_date": "1945-04", "lowest": -1.2, "lowest_date": "1970-04" },
        "5": { "average": 6.1, "highest": 8.7, "highest_date": "1947-05", "lowest": 3.2, "lowest_date": "1941-05" },
        "6": { "average": 9.3, "highest": 12.2, "highest_date": "1947-06", "lowest": 6.4, "lowest_date": "1956-06" },
        "7": { "average": 10.9, "highest": 13.0, "highest_date": "1947-07", "lowest": 8.2, "lowest_date": "1954-07" },
        "8": { "average": 10.6, "highest": 13.7, "highest_date": "1944-08", "lowest": 8.5, "lowest_date": "1948-08" },
        "9": { "average": 8.6, "highest": 10.5, "highest_date": "1949-09", "lowest": 6.0, "lowest_date": "1965-09" },
        "10": { "average": 4.1, "highest": 6.4, "highest_date": "1966-10", "lowest": 1.6, "lowest_date": "1956-10" },
        "11": { "average": -1.2, "highest": 0.8, "highest_date": "1963-11", "lowest": -3.9, "lowest_date": "1966-11" },
        "12": { "average": -5.5, "highest": -1.7, "highest_date": "1953-12", "lowest": -11.0, "lowest_date": "1940-12" }
      }
    },
    
    {
      "city": "Engelberg",
      "referenceTemp": {
        "1": { "average": -3.4, "highest": 0.9, "highest_date": "1948-01", "lowest": -8.4, "lowest_date": "1945-01" },
        "2": { "average": -1.4, "highest": 2.8, "highest_date": "1941-02", "lowest": -6.6, "lowest_date": "1942-02" },
        "3": { "average": 1.7, "highest": 5.8, "highest_date": "1941-03", "lowest": -2.7, "lowest_date": "1958-03" },
        "4": { "average": 5.2, "highest": 8.1, "highest_date": "1947-04", "lowest": 3.1, "lowest_date": "1941-04" },
        "5": { "average": 9.5, "highest": 13.3, "highest_date": "1941-05", "lowest": 6.0, "lowest_date": "1941-05" },
        "6": { "average": 12.3, "highest": 15.5, "highest_date": "1947-06", "lowest": 9.9, "lowest_date": "1956-06" },
        "7": { "average": 13.8, "highest": 15.9, "highest_date": "1947-07", "lowest": 11.6, "lowest_date": "1948-07" },
        "8": { "average": 13.0, "highest": 16.4, "highest_date": "1944-08", "lowest": 12.0, "lowest_date": "1966-08" },
        "9": { "average": 11.2, "highest": 13.5, "highest_date": "1945-09", "lowest": 8.8, "lowest_date": "1965-09" },
        "10": { "average": 6.4, "highest": 8.9, "highest_date": "1966-10", "lowest": 4.5, "lowest_date": "1964-10" },
        "11": { "average": 1.3, "highest": 4.7, "highest_date": "1947-11", "lowest": -1.7, "lowest_date": "1942-11" },
        "12": { "average": -1.5, "highest": 0.9, "highest_date": "1942-12", "lowest": -7.7, "lowest_date": "1969-12" }
      }
    },
    
    {
      "city": "Meiringen",
      "referenceTemp": {
        "1": { "average": -2.9, "highest": 0.9, "highest_date": "1948-01", "lowest": -8.4, "lowest_date": "1945-01" },
        "2": { "average": -1.3, "highest": 2.5, "highest_date": "1941-02", "lowest": -9.5, "lowest_date": "1956-02" },
        "3": { "average": 2.8, "highest": 7.3, "highest_date": "1948-03", "lowest": -0.3, "lowest_date": "1944-03" },
        "4": { "average": 7.5, "highest": 10.7, "highest_date": "1961-04", "lowest": 4.9, "lowest_date": "1970-04" },
        "5": { "average": 12.3, "highest": 14.3, "highest_date": "1947-05", "lowest": 8.9, "lowest_date": "1941-05" },
        "6": { "average": 15.1, "highest": 17.4, "highest_date": "1950-06", "lowest": 12.1, "lowest_date": "1956-06" },
        "7": { "average": 16.1, "highest": 18.7, "highest_date": "1950-07", "lowest": 14.0, "lowest_date": "1948-07" },
        "8": { "average": 15.5, "highest": 18.8, "highest_date": "1944-08", "lowest": 14.1, "lowest_date": "1966-08" },
        "9": { "average": 13.3, "highest": 15.6, "highest_date": "1961-09", "lowest": 10.8, "lowest_date": "1965-09" },
        "10": { "average": 7.8, "highest": 10.7, "highest_date": "1966-10", "lowest": 6.4, "lowest_date": "1965-10" },
        "11": { "average": 1.7, "highest": 4.7, "highest_date": "1947-11", "lowest": -0.9, "lowest_date": "1942-11" },
        "12": { "average": -1.7, "highest": 0.9, "highest_date": "1942-12", "lowest": -6.7, "lowest_date": "1940-12" }
      }
    },
    
    {
      "city": "Andermatt",
      "referenceTemp": {
        "1": { "average": -5.8, "highest": -2.7, "highest_date": "1948-01", "lowest": -11.6, "lowest_date": "1942-01" },
        "2": { "average": -5.3, "highest": 2.5, "highest_date": "1941-02", "lowest": -14.9, "lowest_date": "1956-02" },
        "3": { "average": -2.2, "highest": 6.2, "highest_date": "1942-03", "lowest": -6.4, "lowest_date": "1944-03" },
        "4": { "average": 1.8, "highest": 4.5, "highest_date": "1961-04", "lowest": -1.6, "lowest_date": "1970-04" },
        "5": { "average": 6.6, "highest": 8.8, "highest_date": "1947-05", "lowest": 2.7, "lowest_date": "1941-05" },
        "6": { "average": 9.7, "highest": 12.2, "highest_date": "1950-06", "lowest": 7.0, "lowest_date": "1956-06" },
        "7": { "average": 11.5, "highest": 13.7, "highest_date": "1950-07", "lowest": 9.0, "lowest_date": "1954-07" },
        "8": { "average": 10.7, "highest": 14.1, "highest_date": "1944-08", "lowest": 9.3, "lowest_date": "1940-08" },
        "9": { "average": 9.1, "highest": 12.1, "highest_date": "1942-09", "lowest": 6.4, "lowest_date": "1965-09" },
        "10": { "average": 4.3, "highest": 7.2, "highest_date": "1966-10", "lowest": 2.3, "lowest_date": "1941-10" },
        "11": { "average": -0.9, "highest": 0.4, "highest_date": "1951-11", "lowest": -4.8, "lowest_date": "1942-11" },
        "12": { "average": -5.1, "highest": 2.8, "highest_date": "1942-12", "lowest": -12.1, "lowest_date": "1940-12" }
      }
    },
    
    {
      "city": "Bad Ragaz",
      "referenceTemp": {
        "1": { "average": -1.5, "highest": 4.1, "highest_date": "1948-01", "lowest": -6.2, "lowest_date": "1945-01" },
        "2": { "average": 0.3, "highest": 7.3, "highest_date": "1966-02", "lowest": -9.7, "lowest_date": "1956-02" },
        "3": { "average": 4.8, "highest": 8.9, "highest_date": "1957-03", "lowest": 0.6, "lowest_date": "1944-03" },
        "4": { "average": 9.3, "highest": 12.3, "highest_date": "1949-04", "lowest": 6.3, "lowest_date": "1958-04" },
        "5": { "average": 13.0, "highest": 15.9, "highest_date": "1947-05", "lowest": 7.3, "lowest_date": "1949-05" },
        "6": { "average": 16.2, "highest": 18.7, "highest_date": "1950-06", "lowest": 13.5, "lowest_date": "1956-06" },
        "7": { "average": 17.5, "highest": 19.5, "highest_date": "1947-07", "lowest": 12.0, "lowest_date": "1966-07" },
        "8": { "average": 16.7, "highest": 20.5, "highest_date": "1944-08", "lowest": 14.4, "lowest_date": "1949-08" },
        "9": { "average": 14.3, "highest": 17.6, "highest_date": "1949-09", "lowest": 12.7, "lowest_date": "1965-09" },
        "10": { "average": 8.8, "highest": 12.9, "highest_date": "1966-10", "lowest": 6.3, "lowest_date": "1963-10" },
        "11": { "average": 3.9, "highest": 7.9, "highest_date": "1951-11", "lowest": -1.1, "lowest_date": "1959-11" },
        "12": { "average": 0.5, "highest": 3.6, "highest_date": "1959-12", "lowest": -6.6, "lowest_date": "1940-12" }
      }
    },
    
    {
      "city": "La Chaux-de-Fonds",
      "referenceTemp": {
        "1": { "average": -2.8, "highest": 0.7, "highest_date": "1948-01", "lowest": -7.6, "lowest_date": "1945-01" },
        "2": { "average": -1.7, "highest": 3.0, "highest_date": "1966-02", "lowest": -6.8, "lowest_date": "1942-02" },
        "3": { "average": 0.6, "highest": 3.2, "highest_date": "1943-03", "lowest": -2.7, "lowest_date": "1963-03" },
        "4": { "average": 4.3, "highest": 7.6, "highest_date": "1961-04", "lowest": 1.8, "lowest_date": "1970-04" },
        "5": { "average": 8.5, "highest": 11.3, "highest_date": "1961-05", "lowest": 7.3, "lowest_date": "1949-05" },
        "6": { "average": 12.4, "highest": 16.8, "highest_date": "1952-06", "lowest": 9.8, "lowest_date": "1962-06" },
        "7": { "average": 14.1, "highest": 16.6, "highest_date": "1950-07", "lowest": 12.0, "lowest_date": "1966-07" },
        "8": { "average": 13.1, "highest": 16.7, "highest_date": "1944-08", "lowest": 11.2, "lowest_date": "1956-08" },
        "9": { "average": 10.7, "highest": 14.4, "highest_date": "1949-09", "lowest": 8.8, "lowest_date": "1965-09" },
        "10": { "average": 6.4, "highest": 9.2, "highest_date": "1968-10", "lowest": 4.4, "lowest_date": "1964-10" },
        "11": { "average": 1.5, "highest": 3.7, "highest_date": "1967-11", "lowest": -1.1, "lowest_date": "1959-11" },
        "12": { "average": -1.8, "highest": 1.5, "highest_date": "1953-12", "lowest": -7.1, "lowest_date": "1940-12" }
      }
    },
    
    {
      "city": "Payerne",
      "referenceTemp": {
        "1": { "average": -0.5, "highest": 2.7, "highest_date": "1966-01", "lowest": -2.7, "lowest_date": "1966-01" },
        "2": { "average": 0.3, "highest": 4.7, "highest_date": "1966-02", "lowest": -2.8, "lowest_date": "1965-02" },
        "3": { "average": 3.6, "highest": 5.6, "highest_date": "1967-03", "lowest": 1.5, "lowest_date": "1970-03" },
        "4": { "average": 7.3, "highest": 9.3, "highest_date": "1966-04", "lowest": 5.8, "lowest_date": "1970-04" },
        "5": { "average": 11.7, "highest": 12.7, "highest_date": "1966-05", "lowest": 11.1, "lowest_date": "1970-05" },
        "6": { "average": 15.6, "highest": 16.9, "highest_date": "1966-06", "lowest": 13.4, "lowest_date": "1969-06" },
        "7": { "average": 16.9, "highest": 19.2, "highest_date": "1967-07", "lowest": 16.1, "lowest_date": "1965-07" },
        "8": { "average": 16.3, "highest": 17.3, "highest_date": "1970-08", "lowest": 15.1, "lowest_date": "1968-08" },
        "9": { "average": 13.7, "highest": 14.8, "highest_date": "1966-09", "lowest": 11.5, "lowest_date": "1965-09" },
        "10": { "average": 9.2, "highest": 11.4, "highest_date": "1966-10", "lowest": 7.7, "lowest_date": "1964-10" },
        "11": { "average": 3.9, "highest": 5.5, "highest_date": "1970-11", "lowest": 1.8, "lowest_date": "1966-11" },
        "12": { "average": -0.3, "highest": 2.7, "highest_date": "1965-12", "lowest": -3.4, "lowest_date": "1969-12" }
      }
    },
    
    {
      "city": "Château-d'Oex",
      "referenceTemp": {
        "1": { "average": -3.2, "highest": 1.6, "highest_date": "1941-01", "lowest": -8.6, "lowest_date": "1945-01" },
        "2": { "average": -1.4, "highest": 2.4, "highest_date": "1967-02", "lowest": -11.6, "lowest_date": "1956-02" },
        "3": { "average": 1.5, "highest": 4.9, "highest_date": "1948-03", "lowest": -2.0, "lowest_date": "1958-03" },
        "4": { "average": 5.1, "highest": 8.4, "highest_date": "1947-04", "lowest": 1.6, "lowest_date": "1970-04" },
        "5": { "average": 9.7, "highest": 12.1, "highest_date": "1941-05", "lowest": 5.8, "lowest_date": "1941-05" },
        "6": { "average": 12.6, "highest": 14.3, "highest_date": "1947-06", "lowest": 10.0, "lowest_date": "1956-06" },
        "7": { "average": 14.3, "highest": 16.6, "highest_date": "1950-07", "lowest": 12.1, "lowest_date": "1954-07" },
        "8": { "average": 13.0, "highest": 15.8, "highest_date": "1944-08", "lowest": 11.3, "lowest_date": "1968-08" },
        "9": { "average": 10.4, "highest": 13.6, "highest_date": "1949-09", "lowest": 8.4, "lowest_date": "1965-09" },
        "10": { "average": 5.8, "highest": 8.4, "highest_date": "1968-10", "lowest": 3.9, "lowest_date": "1956-10" },
        "11": { "average": 1.3, "highest": 3.7, "highest_date": "1963-11", "lowest": -2.9, "lowest_date": "1947-11" },
        "12": { "average": -2.5, "highest": 0.4, "highest_date": "1950-12", "lowest": -8.3, "lowest_date": "1940-12" }
      }
    },
    
    {
      "city": "Lugano",
      "referenceTemp": {
        "1": { "average": 1.8, "highest": 3.9, "highest_date": "1949-01", "lowest": -0.7, "lowest_date": "1945-01" },
        "2": { "average": 3.3, "highest": 6.3, "highest_date": "1946-02", "lowest": -1.7, "lowest_date": "1956-02" },
        "3": { "average": 6.9, "highest": 10.2, "highest_date": "1945-03", "lowest": 4.4, "lowest_date": "1962-03" },
        "4": { "average": 11.0, "highest": 13.7, "highest_date": "1945-04", "lowest": 8.9, "lowest_date": "1956-04" },
        "5": { "average": 15.0, "highest": 16.8, "highest_date": "1947-05", "lowest": 12.1, "lowest_date": "1941-05" },
        "6": { "average": 18.6, "highest": 20.9, "highest_date": "1950-06", "lowest": 16.4, "lowest_date": "1953-06" },
        "7": { "average": 20.4, "highest": 24.1, "highest_date": "1945-07", "lowest": 17.9, "lowest_date": "1960-07" },
        "8": { "average": 20.0, "highest": 22.4, "highest_date": "1943-08", "lowest": 18.1, "lowest_date": "1968-08" },
        "9": { "average": 17.5, "highest": 19.1, "highest_date": "1949-09", "lowest": 14.3, "lowest_date": "1965-09" },
        "10": { "average": 12.2, "highest": 14.6, "highest_date": "1949-10", "lowest": 10.8, "lowest_date": "1960-10" },
        "11": { "average": 7.3, "highest": 8.7, "highest_date": "1958-11", "lowest": 5.4, "lowest_date": "1966-11" },
        "12": { "average": 3.5, "highest": 5.0, "highest_date": "1943-12", "lowest": 0.8, "lowest_date": "1940-12" }
      }
    },
       
    {
      "city": "Col du Grand St-Bernard",
      "referenceTemp": {
        "1": { "average": -8.4, "highest": -5.2, "highest_date": "1944-01", "lowest": -13.8, "lowest_date": "1945-01" },
        "2": { "average": -8.5, "highest": -4.0, "highest_date": "1961-02", "lowest": -16.2, "lowest_date": "1956-02" },
        "3": { "average": -6.3, "highest": -1.8, "highest_date": "1957-03", "lowest": -10.7, "lowest_date": "1962-03" },
        "4": { "average": -3.7, "highest": -1.0, "highest_date": "1946-04", "lowest": -6.3, "lowest_date": "1970-04" },
        "5": { "average": 0.8, "highest": 2.9, "highest_date": "1958-05", "lowest": -3.2, "lowest_date": "1941-05" },
        "6": { "average": 4.3, "highest": 6.8, "highest_date": "1950-06", "lowest": 1.4, "lowest_date": "1956-06" },
        "7": { "average": 6.2, "highest": 9.6, "highest_date": "1947-07", "lowest": 3.9, "lowest_date": "1940-07" },
        "8": { "average": 6.2, "highest": 9.4, "highest_date": "1944-08", "lowest": 4.1, "lowest_date": "1948-08" },
        "9": { "average": 4.4, "highest": 6.5, "highest_date": "1966-09", "lowest": 1.5, "lowest_date": "1965-09" },
        "10": { "average": -0.1, "highest": 3.2, "highest_date": "1969-10", "lowest": -3.5, "lowest_date": "1944-10" },
        "11": { "average": -4.8, "highest": -0.6, "highest_date": "1948-11", "lowest": -9.0, "lowest_date": "1966-11" },
        "12": { "average": -7.3, "highest": -5.0, "highest_date": "1951-12", "lowest": -11.0, "lowest_date": "1950-12" }
      }
    }
      
    // Add other cities here
  ];
  
  getReferenceData(): ReferenceData[] {
    return this.referenceData;
  }




}
