import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ToolsService } from '../tools.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() tema:any;
  @Input() actual:any;

  public imagen:any = this.toolsService.imagen;
  public textoDescuento:string = "15% OFF a partir de las 10 unidades!"

  constructor(
    private authService:AuthService,
    private toolsService:ToolsService
  ) { }

  public cantidadCarrito = this.generar();

  generar(){
    let carritoIDs = [];
    let carritoIDsString:any;

    if(localStorage.getItem("carrito") !== null)
    {carritoIDsString = localStorage.getItem("carrito");}

    if(carritoIDsString !== undefined){
      carritoIDs = JSON.parse(carritoIDsString);
    }

    return carritoIDs.length;
  }

  estiloBoton(numeroBoton:number){
    return {
            //'border-top-style': this.actual == numeroBoton ? 'solid':'none',
            'border-bottom-style': this.actual == numeroBoton ? 'solid':'none',
            'color': this.actual == numeroBoton ? 'none':'none',
            //'opacity': this.actual == numeroBoton ? '90%':'none',
            //'background-color': this.actual == numeroBoton ? 'rgba(0, 0, 0, 0.75)':'none'
           }
  }

  public getLogValue(){ return this.authService.loggedIn() };
  public logOut(){
    this.authService.logoutUser();
    location.reload();
  }

  ngOnInit(): void {
  }

}
