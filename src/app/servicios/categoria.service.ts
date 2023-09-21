import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { CategoriaModel } from '../modelos/categoria-model';
import { ToolsService } from '../tools.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiServerUrl = this.toolsService.apiServerUrl;

  constructor(
    private http:HttpClient,
    private toolsService:ToolsService) {
  }

  public buscarPorId(id:number):Observable<CategoriaModel[]>{
    return this.http.get<CategoriaModel[]>(`${this.apiServerUrl}/categorias/id/${id}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public listar():Observable<CategoriaModel[]>{
    return this.http.get<CategoriaModel[]>(`${this.apiServerUrl}/categorias/listar`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public editar(categoria:CategoriaModel):Observable<CategoriaModel>{
    return this.http.put<CategoriaModel>(`${this.apiServerUrl}/categorias/editar`,categoria).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public agregar(categoria:CategoriaModel):Observable<CategoriaModel>{
    return this.http.post<CategoriaModel>(`${this.apiServerUrl}/categorias/agregar`,categoria).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public eliminar(id:number):Observable<any>{
    return this.http.delete(`${this.apiServerUrl}/categorias/${id}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('Hubo un error en la solicitud:', error);
    return error;
  }
}
