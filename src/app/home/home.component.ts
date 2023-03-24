import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoriaModel } from '../modelos/categoria-model';
import { ProductoModel } from '../modelos/producto-model';
import { AuthService } from '../servicios/auth.service';
import { CategoriaService } from '../servicios/categoria.service';
import { ProductoService } from '../servicios/producto.service';
import { listaDeProductos } from '../state/selectors/productos.selectors';
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
  public productosRecomendados:any = {undefined:true};
  public loading:boolean = true
  public productos$():Observable<any>{
    return this.store.select(listaDeProductos);
  };

  image = "https://t1.ea.ltmcdn.com/es/posts/0/3/7/que_es_mejor_arnes_o_collar_para_perros_22730_orig.jpg";

  constructor(
    private productoService:ProductoService,
    private toolsService:ToolsService,
    private authService:AuthService,
    private categoriaService:CategoriaService,
    private store:Store<any>
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

    public async asignarProductosRecomendados(){
      this.productosRecomendados = [];
      for(let n = 0 ; n < 5; n++){
        if(this.productos !== null && this.productos[n] !== undefined){
          this.productosRecomendados.push(this.productos[n]);
        }
      }
    }

  ngOnInit(): void {
    this.productos$().subscribe(
      (response)=> {
        this.productos = response.productos;
        this.loading = response.loading;
        this.asignarProductosRecomendados();
      }
    )
    this.listarProductos();
  }

}
