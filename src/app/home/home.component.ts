import { Component, OnInit } from '@angular/core';
import { ProductoModel } from '../modelos/producto-model';
import { AuthService } from '../servicios/auth.service';
import { ProductoService } from '../servicios/producto.service';
import { ToolsService } from '../tools.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public productosRecomendados:ProductoModel[] = [];
  public productos:ProductoModel[];
  public precio = this.toolsService.precio;
  public longitud = this.toolsService.recortarString;
  public imagen = this.toolsService.imagen;

  constructor(
    private productoService:ProductoService,
    private toolsService:ToolsService,
    private authService:AuthService
    ) { }

    public getLogValue(){
      return this.authService.loggedIn()
    };

    public listarProductos(){
      this.productoService.listar().subscribe(
        (response: ProductoModel[])  =>{
          this.productos = response;
          this.asignarProductosRecomendados()
      })
    }

    public productoLink(producto: any): string {
      return '/prod/' + producto.id;
    }

    public asignarProductosRecomendados(){
      for(let n = 1 ; n < 6; n++){
        if(this.productos !== null){
          this.productosRecomendados.push(this.productos[n]);
        }
      }
    }

  ngOnInit(): void {
    this.listarProductos();
  }

}
