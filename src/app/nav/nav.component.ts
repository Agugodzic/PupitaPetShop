import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService:AuthService) { }

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
