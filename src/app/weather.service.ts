import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey = '3840e7b1a421142d6d0e1c25d9b6d9ee';
  url = 'https://api.openweathermap.org/data/2.5/weather?q=';

  globalUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=';
  

  constructor( private http: Http) { }

  getData(city: string,country: string) {
    return this.http.get(`${this.url}${city},${country}&units=imperial&APPID=${this.apiKey}`).pipe(map(res => res.json()));
  }

  getGeo(lat: any, lon: any) {
    return this.http.get(`${this.globalUrl}${lat}&lon=${lon}&units=imperial&APPID=${this.apiKey}`).pipe(map(res => res.json()));
  }
}
