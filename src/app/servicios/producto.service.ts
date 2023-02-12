import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoModel } from '../modelos/producto-model';
import { HttpClient } from '@angular/common/http';
import { ToolsService } from '../tools.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiServerUrl = this.toolsService.apiServerUrl;

  constructor(
    private http:HttpClient,
    private toolsService:ToolsService) {
  }

 public listar():Observable<ProductoModel[]>{
    return this.http.get<ProductoModel[]>(`${this.apiServerUrl}/productos/listar`)
 }

 public editar(curso:ProductoModel):Observable<ProductoModel>{
  return this.http.put<ProductoModel>(`${this.apiServerUrl}/productos/editar`,curso)
}

 public agregar(curso:ProductoModel):Observable<ProductoModel>{
  return this.http.put<ProductoModel>(`${this.apiServerUrl}/productos/agregar`,curso)
 }

 public eliminar(id:number):Observable<any>{
  return this.http.delete(`${this.apiServerUrl}/productos/${id}`)
 }
}
