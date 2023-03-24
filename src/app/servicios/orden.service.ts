import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.get<OrdenModel[]>(`${this.apiServerUrl}/orden/id/${id}`)
  }

  public listar():Observable<OrdenModel[]>{
    return this.http.get<OrdenModel[]>(`${this.apiServerUrl}/orden/listar`)
  }

  public editar(orden:OrdenModel):Observable<OrdenModel>{
    return this.http.put<OrdenModel>(`${this.apiServerUrl}/orden/editar`,orden)
  }

  public agregar(orden:OrdenModel):Observable<any>{
    return this.http.post<OrdenModel>(`${this.apiServerUrl}/orden/agregar`,orden)
  }

  public eliminar(id:number):Observable<any>{
    return this.http.delete(`${this.apiServerUrl}/orden/${id}`)
  }
}
