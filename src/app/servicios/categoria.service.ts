import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaModel } from '../modelos/categoria-model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiServerUrl = "http://localhost:8080"

  constructor(private http:HttpClient) { }

  public listar():Observable<CategoriaModel[]>{
    return this.http.get<CategoriaModel[]>(`${this.apiServerUrl}/categorias/listar`)
  }

  public editar(categoria:CategoriaModel):Observable<CategoriaModel>{
    return this.http.put<CategoriaModel>(`${this.apiServerUrl}/categorias/editar`,categoria)
  }

  public agregar(categoria:CategoriaModel):Observable<CategoriaModel>{
    return this.http.put<CategoriaModel>(`${this.apiServerUrl}/categorias/agregar`,categoria)
  }

  public eliminar(id:number):Observable<any>{
    return this.http.delete(`${this.apiServerUrl}/productos/${id}`)
  }
}
