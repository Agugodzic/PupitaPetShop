import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
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
    return this.http.get<RangoModel>(`${this.apiServerUrl}/productos/rango/${rango}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
    /* Devuelve 10 productos , saltea los [(rango - 1) * 10] primeros productos de la base de datos.
      modelo: {
        items:ProductoModel[],
        cantidad:number  / Cantidad total de productos en la base de datos
      }
    */
  }

  public filtrar(rango:number,categoria:string,ordenSegunPrecio:string):Observable<FiltroModel>{
    return this.http.get<FiltroModel>(`${this.apiServerUrl}/productos/filter/${rango}/${categoria}/${ordenSegunPrecio}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public relacionados(categoria:string,cantidad:number):Observable<ProductoModel[]>{
    return this.http.get<ProductoModel[]>(`${this.apiServerUrl}/productos/relacionados/${categoria}/${cantidad}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public listarPorRango(rango:number):Observable<RangoModel>{
    return this.http.get<RangoModel>(`${this.apiServerUrl}/productos/rango/${rango}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
    /* Devuelve 10 productos , saltea los [(rango - 1) * 10] primeros productos de la base de datos.
      modelo {
        items:ProductoModel[],
        cantidad:number  / Cantidad total de productos en la base de datos
      }
    */
  }

  public buscarPorId(id:number):Observable<ProductoModel[]>{
    return this.http.get<ProductoModel[]>(`${this.apiServerUrl}/productos/id/${id}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public listarPorIds(ids:number[]):Observable<ProductoModel[]>{
    return this.http.post<ProductoModel[]>(`${this.apiServerUrl}/productos/id-list`,ids).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public imagenesPorId(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/productos/imagenes/${id}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
    // Devuelve las imagenes 2, 3 y 4 del producto de id dado.
  }

  public listar():Observable<ProductoModel[]>{
    return this.http.get<ProductoModel[]>(`${this.apiServerUrl}/productos/listarInfo`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public editar(producto:ProductoModel):Observable<ProductoModel>{
    return this.http.put<ProductoModel>(`${this.apiServerUrl}/productos/editar`,producto).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public variarPrecios(porcentaje:any):Observable<ProductoModel>{
    return this.http.put<any>(`${this.apiServerUrl}/productos/variar-precios`,porcentaje).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public agregar(producto:ProductoModel):Observable<ProductoModel>{
    return this.http.post<ProductoModel>(`${this.apiServerUrl}/productos/agregar`,producto).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public eliminar(id:number):Observable<any>{
    return this.http.delete(`${this.apiServerUrl}/productos/${id}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('Hubo un error en la solicitud:', error);
    return error;
  }
}
