import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from '../tools.service';
import { ProductosService } from '../productos.service';
import { ProductoService } from '../servicios/producto.service';
import { ProductoModel } from '../modelos/producto-model';
import { CategoriaService } from '../servicios/categoria.service';
import { CategoriaModel } from '../modelos/categoria-model';
import { AuthService } from '../servicios/auth.service';
import { LocalStorageService } from '../servicios/local-storage.service';
import { Observable } from 'rxjs';
import { listaDeProductos } from '../state/selectors/productos.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit , OnDestroy {

  @Input() productoIn:string = 'Todos los productos';

  public productoFiltro: string = 'Todos los productos';
  public marcaFiltro: string = 'Todas las marcas';
  public logged:boolean = true;
  public textoAlternativo:string = "";
  public estadoRecursos:any;

  private extraerElementos = this.ToolsService.extraerElementos;
  private menorPrecio = this.ToolsService.menorPrecio;
  private mayorPrecio = this.ToolsService.mayorPrecio;
  public listaDeProductos:any;
  public productosService:any = [];
  private filtrar = this.ToolsService.filtrarProductosEnLista;
  public productos = this.productosService;
  private categoria:any;

  private cantidadDePaginas = this.numerosDePagina().length;
  private paginas = this.numerosDePagina();

  public paginaActual = 1;
  public agregarProducto:boolean = false;
  public longitud = this.ToolsService.recortarString;
  public Imagen = this.ToolsService.imagen;
  public categorias:any = [];
  public mostrarSelectorCategorias:boolean = false;
  public loading: true;
  private cantidadDeProductos:number = 1;

  public productos$():Observable<any>{
    return this.store.select(listaDeProductos);
  };


  private productosPorPagina = 10;
  public categoriasEnUso:any = [];

  constructor(
    private ToolsService: ToolsService,
    private ProductoService: ProductoService,
    private route: ActivatedRoute,
    private categoriaService:CategoriaService,
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private store:Store<any>
  ) {}

  public getLogValue(){
    return this.authService.loggedIn()
  };

  public listarProductos(){
    this.ProductoService.rango(this.paginaActual).subscribe(
      (response)  =>{
        this.productosService = response.items;
        this.cantidadDeProductos = response.cantidad;
        this.estadoRecursos = 'defined';
        this.actualizarLista();// se filtran los productos para mostrar en pantalla
        this.textoAlternativo = "No se encontraron coincidencias."
        response.items.forEach((producto:any)=>{ // se filtran las categorias que contienen productos para ocultar las vacias;
          let usadas:any = [];
          if(!usadas.includes(producto.categoria))
            this.categoriasEnUso.push(producto.categoria);
        })
    })
  }

  public listarCategorias(){
    this.categoriaService.listar().subscribe(
      (response:CategoriaModel[]) =>{
        this.categorias = response;
        this.productoFiltro = this.generadorDeFiltro(this.categoria);

      }
    )
  }

  private indicesPorPagina(): number {
    if (this.paginaActual == this.cantidadDePaginas) {
      return this.productos.length - 1;
    } else {
      return this.productosPorPagina * this.paginaActual - 1;
    }
  }

  private filtrarProductos() {
    this.productos = this.filtrar(
      this.productosService,
      this.productoFiltro,
      this.marcaFiltro,
      'Todos los productos',
      'Todas las marcas'
    );
  }

  private actualizarLista() {
    this.filtrarProductos();
    this.cantidadDePaginas = this.numerosDePagina().length;
    this.paginas = this.numerosDePagina();
    this.productosPaginaActual = this.extraerElementos(
      this.productos,
      this.productosPorPagina * (this.paginaActual - 1),
      this.indicesPorPagina()
    );
    console.log(this.productosPaginaActual.length);
  }

  public switchSelectorCategorias(){
    this.mostrarSelectorCategorias = !this.mostrarSelectorCategorias;
  }

  public switchAgregar():void{
    if(this.agregarProducto == false){
      this.agregarProducto = true;
    }else{
      this.agregarProducto = false;
    }
  }

  private generadorDeFiltro(categoria: number):any {
    let numeroRuta:number;

    if (categoria == 0) {
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

  public productosPaginaActual = this.extraerElementos(
    this.productos,
    this.productosPorPagina * (this.paginaActual - 1),
    this.indicesPorPagina()
  );

  public productoLink(producto: any): string {
    return '/prod/' + producto.id;
  }

  public cambiarProducto(producto:any) {
    this.productoFiltro = producto;
    this.paginaActual = 1;
    this.actualizarLista();
  }

  public cambiarProductoM(producto:any) {
    this.cambiarProducto(producto);
    this.paginaActual = 1;
    this.switchSelectorCategorias();
  }

  public cambiarMarca(marca:string) {
    this.marcaFiltro = marca;
    this.paginaActual = 1;
    this.actualizarLista();
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
    return listaPaginas;
  }

  public get listaPaginas() {
    return this.paginas;
  }

  public get precio() {
    return this.ToolsService.precio;
  }

  public ordenarProductos(orden:string) {
    if (orden === 'menorPrecio') {
      this.productosService = this.menorPrecio(this.productosService);
    } else if (orden === 'mayorPrecio') {
      this.productosService = this.mayorPrecio(this.productosService);
    }
    this.paginaActual = 1;
    this.actualizarLista();
  }

  public siguiente(): void {
    if (this.paginaActual < this.cantidadDePaginas) {
      this.paginaActual = this.paginaActual + 1;
      this.actualizarLista();
    }
  }

  public linkCategoria(id:number){
    return `store/${id}`
  }

  public ultimaPagina(): void {
    this.paginaActual = this.numerosDePagina().length;
    this.actualizarLista();
  }

  public anterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarLista();
    }
  }

  public primeraPagina(): void {
    this.paginaActual = 1;
    this.actualizarLista();
  }

  public cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.actualizarLista();
  }

  ngOnInit() {
    this.productos$().subscribe(
      (response)=> {
        this.productosService = response.productos;
        this.loading = response.loading;
        this.actualizarLista();
      }
    )

    this.categorias = this.localStorageService.getValues("categorias");
    this.listarCategorias();
    this.categoria = this.route.snapshot.paramMap.get('categoria');

   // this.listarProductos();

  }
  ngOnDestroy():void{
  }

}
