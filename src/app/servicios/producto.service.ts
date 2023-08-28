import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoModel } from '../modelos/producto-model';
import { HttpClient } from '@angular/common/http';
import { ToolsService } from '../tools.service';
import { RangoModel } from '../modelos/rango-model';
import { FiltroModel } from '../modelos/filtro-model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiServerUrl = this.toolsService.apiServerUrl;

  constructor(
    private http:HttpClient,
    private toolsService:ToolsService) {
  }


  public rango(rango:number):Observable<RangoModel>{
    return this.http.get<RangoModel>(`${this.apiServerUrl}/productos/rango/${rango}`);
    /* Devuelve 10 productos , saltea los [(rango - 1) * 10] primeros productos de la base de datos.
      modelo: {
        items:ProductoModel[],
        cantidad:number  / Cantidad total de productos en la base de datos
      }
    */
  }

  public filtrar(rango:number,categoria:string,ordenSegunPrecio:string):Observable<FiltroModel>{
    return this.http.get<FiltroModel>(`${this.apiServerUrl}/productos/filter/${rango}/${categoria}/${ordenSegunPrecio}`);
  }

  public relacionados(categoria:string,cantidad:number):Observable<ProductoModel[]>{
    return this.http.get<ProductoModel[]>(`${this.apiServerUrl}/productos/relacionados/${categoria}/${cantidad}`);
  }

  public listarPorRango(rango:number):Observable<RangoModel>{
    return this.http.get<RangoModel>(`${this.apiServerUrl}/productos/rango/${rango}`);
    /* Devuelve 10 productos , saltea los [(rango - 1) * 10] primeros productos de la base de datos.
      modelo {
        items:ProductoModel[],
        cantidad:number  / Cantidad total de productos en la base de datos
      }
    */
  }

  public buscarPorId(id:number):Observable<ProductoModel[]>{
    return this.http.get<ProductoModel[]>(`${this.apiServerUrl}/productos/id/${id}`);
  }

  public listarPorIds(ids:number[]):Observable<ProductoModel[]>{
    return this.http.post<ProductoModel[]>(`${this.apiServerUrl}/productos/id-list`,ids);
  }

  public imagenesPorId(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/productos/imagenes/${id}`);
    // Devuelve las imagenes 2, 3 y 4 del producto de id dado.
  }

  public listar():Observable<ProductoModel[]>{
    return this.http.get<ProductoModel[]>(`${this.apiServerUrl}/productos/listarInfo`);
  }

  public editar(producto:ProductoModel):Observable<ProductoModel>{
    return this.http.put<ProductoModel>(`${this.apiServerUrl}/productos/editar`,producto);
  }

  public variarPrecios(porcentaje:any):Observable<ProductoModel>{
    return this.http.put<any>(`${this.apiServerUrl}/productos/variar-precios`,porcentaje);
  }

  public agregar(producto:ProductoModel):Observable<ProductoModel>{
    return this.http.post<ProductoModel>(`${this.apiServerUrl}/productos/agregar`,producto);
  }

  public eliminar(id:number):Observable<any>{
    return this.http.delete(`${this.apiServerUrl}/productos/${id}`);
  }
}
