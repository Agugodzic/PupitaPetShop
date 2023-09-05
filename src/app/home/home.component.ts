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
import { RangoModel } from '../modelos/rango-model';
import { ImagenService } from '../servicios/imagen.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ImagenService]
})
export class HomeComponent implements OnInit {

  public precio = this.toolsService.precio;
  public longitud = this.toolsService.recortarString;
  public imagen = this.toolsService.imagen;
  private categorias:CategoriaModel[];
  private productos:any = [];
  public productosRecomendados:any = {undefined:true};
  public loading:boolean = true;
  public images = this.imagenService;
  public homeFiltros:{nombre:string,imagen:string,link:string}[] = [];
 /* public productos$():Observable<any>{
    return this.store.select(listaDeProductos);
  };*/

  constructor(
    private productoService:ProductoService,
    private toolsService:ToolsService,
    private authService:AuthService,
    private categoriaService:CategoriaService,
    private imagenService:ImagenService
    //private store:Store<any>
    ) { }

    public getLogValue(){
      return this.authService.loggedIn()
    };

    public listarProductos(){
      this.productoService.rango(1).subscribe(
        (response: RangoModel)  =>{
          this.productos = response.productos;
          this.loading = false;
          this.asignarProductosRecomendados();
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

    this.homeFiltros = [
      {nombre:'Collares',imagen:'assets/images/collares.jpg',link:"/#/store/"+14},
      {nombre:'Fundas para asiento',imagen:'assets/images/fundas.png',link:"/#/store/"+17},
      {nombre:'Abrigos',imagen:'assets/images/abrigos.jpg',link:"/#/store/"+29},
      {nombre:'Correas',imagen:'assets/images/correas.jpg',link:"/#/store/"+5},
      {nombre:'Moises',imagen:'assets/images/colchonetas.jpg',link:"/#/store/"+22}
    ]

    this.listarProductos();

    /*
    this.productos$().subscribe(
      (response)=> {
        this.productos = response.productos;
        this.loading = response.loading;
        this.asignarProductosRecomendados();
      }
    )*/
  }

}
