import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LoginModel } from '../modelos/login-model';
import { ToolsService } from '../tools.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSubject: BehaviorSubject<any>;
  private apiServerUrl = this.toolsService.apiServerUrl;

  constructor(private http:HttpClient,
    private toolsService:ToolsService){
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem('token') || '{}')
    );
  }

  IniciarSesion(credenciales: LoginModel): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/login`, credenciales).pipe(
      map((data) => {
        sessionStorage.setItem('token', JSON.stringify(data));
        this.currentUserSubject.next(data);
        return data;
      })
    );
  }

  get UsuarioAutenticado() {
    return this.currentUserSubject.value;
  }

  loggedIn() {
    return sessionStorage.getItem('token') !== null;
  }

  logoutUser() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');

    this.currentUserSubject.next(null);
    alert('Has finalizado la sesion.');
  }
}
