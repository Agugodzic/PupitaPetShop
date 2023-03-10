import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PreferenciaModel } from '../modelos/preferencia-model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutExpressService {

  expressUrl = "http://localhost:3000"

  constructor(private http:HttpClient) {
   }

  public sendPreferences(preferencias:PreferenciaModel):Observable<any>{
    return this.http.post<PreferenciaModel[]>(`${this.expressUrl}/crear-orden`,preferencias)
  }
}
