import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from '../modelos/categoria-model';
import { AuthService } from '../servicios/auth.service';
import { CategoriaService } from '../servicios/categoria.service';
import { ProductoService } from '../servicios/producto.service';
import { ToolsService } from '../tools.service';
import { RangoModel } from '../modelos/rango-model';
import { ImagenService } from '../servicios/imagen.service';
import { PortadaService } from '../servicios/portada.service';
import { BannerService } from '../servicios/banner.service';
import { FiltroService } from '../servicios/filtro.service';
import { Filtro } from '../modelos/filtro';

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
  public categorias:CategoriaModel[];
  private productos:any = [];
  public productosRecomendados:any = {undefined:true};
  public portadaLoaded:boolean = false;
  public productsLoaded:boolean = false;
  public loading:boolean = !this.portadaLoaded && !this.productsLoaded;
  public images = this.imagenService;
  public homeFiltros:Filtro[] = [];
  public showEditarPortada:boolean = false;
  public showEditarFiltro:boolean = false;
  public portada = "";
  public banner = "";
  public filtroFromForm:Filtro | undefined;
  public deleteFilterId:number;
  public showAlertFiltro:boolean = false;

  constructor(
    private productoService:ProductoService,
    private toolsService:ToolsService,
    private authService:AuthService,
    private categoriaService:CategoriaService,
    private imagenService:ImagenService,
    private portadaService:PortadaService,
    private bannerService:BannerService,
    private filtrosService:FiltroService
    ) { }

    public getLogValue(){
      return this.authService.loggedIn()
    };

    public getPortada(storageVerify?:boolean){
      if(storageVerify){
        if(localStorage.getItem('portada') !== null && localStorage.getItem('portada') !== undefined){
          this.portada = localStorage.getItem('portada') || "";
          this.portadaLoaded = true;
          this.loading = !this.portadaLoaded && !this.productsLoaded;
        }else{
          this.portadaService.get().subscribe((response)=>{
            this.portada = response[0].portada;
            localStorage.setItem('portada', this.portada);
            this.portadaLoaded = true;
            this.loading = !this.portadaLoaded && !this.productsLoaded;
          });
        }
      }else{
        this.portadaService.get().subscribe((response)=>{
          this.portada = response[0].portada;
          localStorage.setItem('portada',this.portada);
          this.portadaLoaded = true;
          this.loading = !this.portadaLoaded && !this.productsLoaded;
        });
      }
    }

    getFiltros(){
      this.filtrosService.get().subscribe((response)=>{
        this.homeFiltros = response;
      });
    }

    public getBanner(storageVerify?:boolean){
      if(storageVerify){
        if(localStorage.getItem('banner') !== null && localStorage.getItem('banner') !== undefined){
          this.banner = localStorage.getItem('banner') || "";
        }else{
          this.bannerService.get().subscribe((response)=>{
            this.banner = response[0].banner;
            localStorage.setItem('banner', this.banner);
          });
        }
      }else{
        this.bannerService.get().subscribe((response)=>{
          this.banner = response[0].banner;
          localStorage.setItem('banner',this.banner);
        });
      }
    }

    public listarProductos(){
      this.productoService.rango(1).subscribe(
        (response: RangoModel)  =>{
          this.productos = response.productos;
          this.asignarProductosRecomendados();
          this.productsLoaded = true;
          this.loading = !this.portadaLoaded && !this.productsLoaded;
      })
    }

    public listarCategorias(){
      this.categoriaService.listar().subscribe(
        (response: CategoriaModel[])  =>{
          this.categorias = response;
      })
    }

    public async asignarProductosRecomendados(){
      this.productosRecomendados = [];
      for(let n = 0 ; n < 5; n++){
        if(this.productos !== null && this.productos[n] !== undefined){
          this.productosRecomendados.push(this.productos[n]);
        }
      }
    }

    public switchEditarPortada(actualizar?:boolean): void {
      this.showEditarPortada = !this.showEditarPortada;
      if(actualizar){
        this.getPortada();
      }
    }

    public switchEditarFiltro(filtro?:Filtro): void {
      this.filtroFromForm = filtro || undefined;
      this.showEditarFiltro = !this.showEditarFiltro;
      if(!this.showEditarFiltro){
        this.getFiltros();
      }
    }

    public switchAlertFiltro(id?:number){
      this.showAlertFiltro = !this.showAlertFiltro;
      this.deleteFilterId = id || 0;
      this.getFiltros();
    }

    public filtrosClick(id?:number){
      if(!this.getLogValue() && id){
        location.href = '#/store/' + id;
      }
    }

  ngOnInit(): void {
    this.getFiltros();
    this.getPortada();
    this.listarProductos();
  }

}
