import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { PreferenciaModel } from '../modelos/preferencia-model';
import { ToolsService } from '../tools.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutExpressService {

  expressUrl = this.toolsService.apiServerUrl;

  constructor(
    private http:HttpClient,
    private toolsService:ToolsService
    ) {

   }

  public sendPreferences(preferencias:PreferenciaModel):Observable<any>{
    return this.http.post<PreferenciaModel[]>(`${this.expressUrl}/new-order`,preferencias).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public findPaymentById(orderId:any):Observable<any>{
    return this.http.get<any>(`${this.expressUrl}/find-paymeny-by-id/${orderId}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('Hubo un error en la solicitud:', error);
    return error;
  }
}
