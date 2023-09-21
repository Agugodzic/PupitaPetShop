import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { PortadaModel } from '../modelos/portada-model';
import { ToolsService } from '../tools.service';

@Injectable({
  providedIn: 'root'
})
export class PortadaService {
  private apiServerUrl = this.toolsService.apiServerUrl;

  constructor(
    private http: HttpClient,
    private toolsService: ToolsService
  ) {}
/*
  public buscarPorId(id: number): Observable<PortadaModel[]> {
    return this.http.get<PortadaModel[]>(`${this.apiServerUrl}/portada/id/${id}`);
  }*/

  public get(): Observable<PortadaModel[]> {
    return this.http.get<PortadaModel[]>(`${this.apiServerUrl}/portada/listar`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public editar(portada: PortadaModel): Observable<PortadaModel> {
    return this.http.put<PortadaModel>(`${this.apiServerUrl}/portada/editar`, portada).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public agregar(portada: PortadaModel): Observable<PortadaModel> {
    return this.http.post<PortadaModel>(`${this.apiServerUrl}/portada/agregar`, portada).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
/*
  public eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiServerUrl}/portada/${id}`);
  }*/

  private handleError(error: any): Observable<any> {
    console.error('Hubo un error en la solicitud:', error);
    return error;
  }
}
