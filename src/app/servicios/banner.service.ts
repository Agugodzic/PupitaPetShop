import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { BannerModel } from '../modelos/banner-model';
import { ToolsService } from '../tools.service';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private apiServerUrl = this.toolsService.apiServerUrl;

  constructor(
    private http: HttpClient,
    private toolsService: ToolsService
  ) {}
/*
  public buscarPorId(id: number): Observable<BannerModel[]> {
    return this.http.get<BannerModel[]>(`${this.apiServerUrl}/banner/id/${id}`);
  }
*/

  public get(): Observable<BannerModel[]> {
    return this.http.get<BannerModel[]>(`${this.apiServerUrl}/banner/listar`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public editar(banner: BannerModel): Observable<BannerModel> {
    return this.http.put<BannerModel>(`${this.apiServerUrl}/banner/editar`,banner).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public agregar(banner: BannerModel): Observable<BannerModel> {
    return this.http.post<BannerModel>(`${this.apiServerUrl}/banner/agregar`,banner).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('Hubo un error en la solicitud:', error);
    return error;
  }
/*
  public eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiServerUrl}/banner/${id}`);
  }*/
}
