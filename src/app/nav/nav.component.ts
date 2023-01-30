import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ToolsService } from '../tools.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public imagen:any = this.toolsService.imagen;

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

  public getLogValue(){ return this.authService.loggedIn() };
  public logOut(){
    this.authService.logoutUser();
    location.reload();
  }

  ngOnInit(): void {
  }

}
