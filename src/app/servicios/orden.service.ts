import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { OrdenModel } from '../modelos/orden-model';
import { ToolsService } from '../tools.service';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private apiServerUrl = this.toolsService.apiServerUrl;

  constructor(
    private http:HttpClient,
    private toolsService:ToolsService) {
  }

  public buscarPorId(id:number):Observable<OrdenModel[]>{
    return this.http.get<OrdenModel[]>(`${this.apiServerUrl}/orden/id/${id}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public listar():Observable<OrdenModel[]>{
    return this.http.get<OrdenModel[]>(`${this.apiServerUrl}/orden/listar`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public editar(orden:OrdenModel):Observable<OrdenModel>{
    return this.http.put<OrdenModel>(`${this.apiServerUrl}/orden/editar`,orden).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public agregar(orden:OrdenModel):Observable<any>{
    return this.http.post<OrdenModel>(`${this.apiServerUrl}/orden/agregar`,orden).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public eliminar(id:number):Observable<any>{
    return this.http.delete(`${this.apiServerUrl}/orden/${id}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('Hubo un error en la solicitud:', error);
    return error;
  }
}
