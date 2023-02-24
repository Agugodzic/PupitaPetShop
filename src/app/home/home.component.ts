import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from '../modelos/categoria-model';
import { ProductoModel } from '../modelos/producto-model';
import { AuthService } from '../servicios/auth.service';
import { CategoriaService } from '../servicios/categoria.service';
import { ProductoService } from '../servicios/producto.service';
import { ToolsService } from '../tools.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public precio = this.toolsService.precio;
  public longitud = this.toolsService.recortarString;
  public imagen = this.toolsService.imagen;
  private categorias:CategoriaModel[];
  private productos:any;
  public productosRecomendados:any = [];

  constructor(
    private productoService:ProductoService,
    private toolsService:ToolsService,
    private authService:AuthService,
    private categoriaService:CategoriaService
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

    public listarCategorias(){
      this.categoriaService.listar().subscribe(
        (response: CategoriaModel[])  =>{
          this.categorias = response;
      })
    }

    public categoriaLink(categoria:string){
      let categoriaId:number = 0;

      for(let Categoria of this.categorias){
        if(Categoria.categoria == categoria){
          categoriaId = Categoria.id;
        }
      }
      return '/store/' + categoriaId;
    }

    public productoLink(producto: any): string {
      return '/prod/' + producto.id;
    }

    public asignarProductosRecomendados(){
      this.productosRecomendados = [];
      for(let n = 0 ; n < 5; n++){
        if(this.productos !== null && this.productos[n] !== undefined){
          this.productosRecomendados.push(this.productos[n]);
        }
      }
    }

  ngOnInit(): void {
    let localStorage_:any = localStorage.getItem("productos");
    this.productos =  JSON.parse(localStorage_);
    this.asignarProductosRecomendados();
    this.listarProductos();
  }

}
