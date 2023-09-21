import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from '../tools.service';
import { ProductoService } from '../servicios/producto.service';
import { ProductoModel } from '../modelos/producto-model';
import { CategoriaService } from '../servicios/categoria.service';
import { CategoriaModel } from '../modelos/categoria-model';
import { AuthService } from '../servicios/auth.service';
import { LocalStorageService } from '../servicios/local-storage.service';
import { RangoModel } from '../modelos/rango-model';
import { FiltroModel } from '../modelos/filtro-model';
import { ImagenService } from '../servicios/imagen.service';
import { BannerService } from '../servicios/banner.service';
//import { Store } from '@ngrx/store';
//import { Observable } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  @Input() productoIn:string = 'all';

  public mostrarVariarPrecios:boolean = false;
  public productoFiltro: string = 'all';
  public marcaFiltro: string = 'Todas las marcas';
  public logged:boolean = true;
  public textoAlternativo:string = "";
  public estadoRecursos:any;
  private ordenPrecio:string = 'none';

  public listaDeProductos:ProductoModel[] = [];

  private categoria:any;

  private cantidadDePaginas = this.numerosDePagina().length;
  public paginas = this.numerosDePagina();
  public paginaActual:number = 1;
  public listaDePaginas:number[];

  public agregarProducto:boolean = false;
  public longitud = this.ToolsService.recortarString;
  public Imagen = this.ToolsService.imagen;
  public categorias:any = [];
  public mostrarSelectorCategorias:boolean = false;
  public loading:boolean = true;
  private cantidadDeProductos:number = 1;
  public images = this.imagenService;

  public mostrarEliminarCategoria = false;
  public showEditarBanner:boolean = false;

  public banner:string = "";
  public bannerLoaded:boolean = false;
  /*
  public productos$():Observable<any>{
    return this.store.select(listaDeProductos);
  };
  */

  private productosPorPagina = 10;
  public categoriasEnUso:any = [];
  public eliminarCategoriaId:number;

  constructor(
    private ToolsService: ToolsService,
    private ProductoService: ProductoService,
    private route: ActivatedRoute,
    private categoriaService:CategoriaService,
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private imagenService:ImagenService,
    private bannerService:BannerService
   // private store:Store<any>
  ) {}

  public getLogValue(){
    return this.authService.loggedIn();
  };

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

  public listarProductos(rango:number){
    this.ProductoService.rango(rango).subscribe(
      (response:RangoModel) =>{
        this.loading = false;
        this.listaDeProductos = this.ToolsService.ordenarProductosPorTalle(response.productos);
        this.cantidadDeProductos = response.cantidad;
        this.estadoRecursos = 'defined';


        this.cantidadDePaginas = this.numerosDePagina().length;
        this.paginas = this.numerosDePagina();
        this.textoAlternativo = "No se encontraron coincidencias."
    })
  }


  private filtrarProductos() {
    this.ProductoService.filtrar(this.paginaActual,this.productoFiltro,this.ordenPrecio).subscribe(
      (response:FiltroModel)  =>{
        this.loading = false;
        this.listaDeProductos = this.ToolsService.ordenarProductosPorTalle(response.productos);
        this.cantidadDeProductos = response.cantidad;

        this.estadoRecursos = 'defined';
        this.cantidadDePaginas = this.numerosDePagina().length;
        this.paginas = this.numerosDePagina();
        this.textoAlternativo = "No se encontraron coincidencias.";
        this.numerosDePagina()
    }
    );
  }

  public listarCategorias(){
    this.categoriaService.listar().subscribe(
      (response:CategoriaModel[]) =>{
        this.categorias = response;
        this.productoFiltro = this.generadorDeFiltro(this.categoria);
      }
    )
  }

  public switchEditarBanner(actualizar?:boolean): void {
    this.showEditarBanner = !this.showEditarBanner;
    if(actualizar){
      this.getBanner()
    }
  }

  public switchSelectorCategorias(){
    this.mostrarSelectorCategorias = !this.mostrarSelectorCategorias;
  }

  public switchVariarPrecios(){
    this.mostrarVariarPrecios= !this.mostrarVariarPrecios;
  }

  public switchEliminarCategoria(mostrar:boolean,id:number):void{
    if(mostrar){
      this.eliminarCategoriaId = id;
      this.mostrarEliminarCategoria = true;
    }else if(!mostrar){
      this.mostrarEliminarCategoria = false;
    }
  }

  public switchAgregar():void{
    if(this.agregarProducto == false){
      this.agregarProducto = true;
    }else{
      this.agregarProducto = false;
    }
  }

  public productoLink(producto: any): string {
    return '/prod/' + producto.id;
  }

  public linkCategoria(id:number){
    return `store/${id}`
  }

  public get precio() {
    return this.ToolsService.precio;
  }

    // ------------------- FILTROS -------------------- //


  public cambiarProducto(producto:any) {
    this.productoFiltro = producto;
    this.loading = true;
    this.paginaActual = 1;
    this.filtrarProductos();
  }

  public cambiarProductoM(producto:any) {
    this.cambiarProducto(producto);
    this.switchSelectorCategorias();
  }

  public ordenarProductos(orden:string) {
    this.loading = true;

    if (orden == 'menorPrecio') {
      this.ordenPrecio = 'asc';
    } else if (orden == 'mayorPrecio') {
      this.ordenPrecio = 'desc';
    }else{
      this.ordenPrecio = 'none';
    }

    this.paginaActual = 1;
    this.filtrarProductos();
  }

  private generadorDeFiltro(categoria: number):any {
    let numeroRuta:number;

    if (categoria == 0){
      return 'Todos los productos';
    }

    else{
      for(let Categoria of this.categorias){
        numeroRuta = Categoria.id;

        if (categoria == numeroRuta) {
          return Categoria.categoria;
        }
      }
    }
  }


  // ------------------- PAGINAS -------------------//

  public siguiente(): void {
    if (this.paginaActual < this.cantidadDePaginas) {
      this.paginaActual = this.paginaActual + 1;
      this.loading = true;
      if(this.productoFiltro == 'Todos los productos'){
        this.listarProductos(this.paginaActual);
      }else{
        this.filtrarProductos();
      }
    }
  }

  public ultimaPagina(): void {
    this.paginaActual = this.numerosDePagina().length;
    this.loading = true;
    if(this.productoFiltro == 'Todos los productos'){
      this.listarProductos(this.paginaActual);
    }else{
      this.filtrarProductos();
    }
  }

  public anterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.loading = true;
      if(this.productoFiltro == 'Todos los productos'){
        this.listarProductos(this.paginaActual);
      }else{
        this.filtrarProductos();
      }
    }
  }

  public primeraPagina(): void {
    this.paginaActual = 1;
    this.loading = true;
    if(this.productoFiltro == 'Todos los productos'){
      this.listarProductos(this.paginaActual);
    }else{
      this.filtrarProductos();
    }
  }

  public cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.loading = true;
    if(this.productoFiltro == 'Todos los productos'){
      this.listarProductos(this.paginaActual);
    }else{
      this.filtrarProductos();
    }
  }

  public numerosDePagina() {
    let listaPaginas = [1];
    let contador = 1;
    let numerosDePagina = 1;

    for (let iterador = 1; iterador < this.cantidadDeProductos; iterador++) {
      contador++;
      if (contador > this.productosPorPagina) {
        numerosDePagina++;
        listaPaginas.push(numerosDePagina);
        contador = 1;
      }
    }
    this.listaDePaginas = listaPaginas;
    return listaPaginas;
  }



  ngOnInit() {/*
    this.productos$().subscribe((response)=> {})*/
    this.categorias = this.localStorageService.getValues("categorias");
    this.categoria = this.route.snapshot.paramMap.get('categoria');

    this.listarCategorias();
    this.getBanner(true);

    if(this.categoria != 0){
      this.productoFiltro = this.generadorDeFiltro(this.categoria);
      this.filtrarProductos();
    }else{
      this.listarProductos(this.paginaActual);
    }
  }

}
