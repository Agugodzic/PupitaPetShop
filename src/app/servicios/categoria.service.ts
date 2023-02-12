import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
