import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoModel } from '../modelos/producto-model';
import { HttpClient } from '@angular/common/http';
import { ToolsService } from '../tools.service';
import { RangoModel } from '../modelos/rango-model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiServerUrl = this.toolsService.apiServerUrl;

  constructor(
    private http:HttpClient,
    private toolsService:ToolsService) {
  }


  public listarPorRango(rango:number):Observable<RangoModel>{
    return this.http.get<RangoModel>(`${this.apiServerUrl}/productos/rango/${rango}`)
    /* Devuelve (rango * 10) productos , saltea los [(rango - 1) * 10] primeros productos de la base de datos.
    modelo {
      items:ProductoModel[],
      cantidad:number  / Cantidad total de productos en la base de datos
    }
  */
  }

  public buscarPorId(id:number):Observable<ProductoModel[]>{
    return this.http.get<ProductoModel[]>(`${this.apiServerUrl}/productos/id/${id}`)
  }

  public imagenesPorId(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/productos/imagenes/${id}`)
    // Devuelve las imagenes 2, 3 y 4 del producto de id dado.
  }

  public listar():Observable<ProductoModel[]>{
    return this.http.get<ProductoModel[]>(`${this.apiServerUrl}/productos/rango/1`)
  }

  public rango(rango:number):Observable<any>{
    return this.http.get<ProductoModel[]>(`${this.apiServerUrl}/productos/rango/${rango}`)
  }

  public editar(curso:ProductoModel):Observable<ProductoModel>{
    return this.http.put<ProductoModel>(`${this.apiServerUrl}/productos/editar`,curso)
  }

  public agregar(curso:ProductoModel):Observable<ProductoModel>{
    return this.http.post<ProductoModel>(`${this.apiServerUrl}/productos/agregar`,curso)
  }

  public eliminar(id:number):Observable<any>{
    return this.http.delete(`${this.apiServerUrl}/productos/${id}`)
  }
}
