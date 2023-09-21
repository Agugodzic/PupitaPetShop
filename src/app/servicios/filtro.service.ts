import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { FiltroModel } from '../modelos/filtro-model';
import { ToolsService } from '../tools.service';
import { Filtro } from '../modelos/filtro';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {
  private apiServerUrl = this.toolsService.apiServerUrl;

  constructor(
    private http: HttpClient,
    private toolsService: ToolsService
  ) {}

  public buscarPorId(id: number): Observable<Filtro[]> {
    return this.http.get<Filtro[]>(`${this.apiServerUrl}/filtros/id/${id}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public get(): Observable<Filtro[]> {
    return this.http.get<Filtro[]>(`${this.apiServerUrl}/filtros/listar`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public editar(filtro: Filtro): Observable<Filtro> {
    return this.http.put<Filtro>(`${this.apiServerUrl}/filtros/editar`, filtro).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public agregar(filtro: Filtro): Observable<Filtro> {
    return this.http.post<Filtro>(`${this.apiServerUrl}/filtros/agregar`, filtro).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiServerUrl}/filtros/${id}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('Hubo un error en la solicitud:', error);
    return error;
  }
}
