import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from '../tools.service';
import { ProductosService } from '../productos.service';
import { ProductoService } from '../servicios/producto.service';
import { ProductoModel } from '../modelos/producto-model';
import { CategoriaService } from '../servicios/categoria.service';
import { CategoriaModel } from '../modelos/categoria-model';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

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
  private productosService:any = [];
  private filtrar = this.ToolsService.filtrarProductosEnLista;
  public productos = this.productosService;
  private categoria:any;
  private cantidadDePaginas = this.numerosDePagina(this.productos).length;
  private paginas = this.numerosDePagina(this.productos);

  public paginaActual = 1;
  public agregarProducto:boolean = false;
  public longitud = this.ToolsService.recortarString;
  public Imagen = this.ToolsService.imagen;

  public categorias:CategoriaModel[];
  public mostrarSelectorCategorias:boolean = false;
  private productosPorPagina = 12;


  constructor(
    private ToolsService: ToolsService,
    private ProductosService: ProductosService,
    private ProductoService: ProductoService,
    private route: ActivatedRoute,
    private categoriaService:CategoriaService,
    private authService:AuthService
  ) {}

  public getLogValue(){
    return this.authService.loggedIn()
  };

  public listarProductos(){
    this.ProductoService.listar().subscribe(
      (response: ProductoModel[])  =>{
        this.productosService = response;
        this.estadoRecursos = 'defined';
        this.actualizarLista();
        this.textoAlternativo = "No se encontraron coincidencias."
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
    this.cantidadDePaginas = this.numerosDePagina(this.productos).length;
    this.paginas = this.numerosDePagina(this.productos);
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

 /* private generadorDeFiltro(categoria: number):any {
    let numeroRuta = 0;

    if (categoria == numeroRuta) {
      return 'Todos los productos';
    }
    else{

      for(let Categoria of this.categorias){
        numeroRuta ++;

        if (categoria == numeroRuta) {
          return Categoria.categoria;
        }
      }
    }
  }*/

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

  productosPaginaActual = this.extraerElementos(
    this.productos,
    this.productosPorPagina * (this.paginaActual - 1),
    this.indicesPorPagina()
  );

  productoLink(producto: any): string {
    return '/prod/' + producto.id;
  }

  cambiarProducto(producto:any) {
    this.productoFiltro = producto;
    this.paginaActual = 1;
    this.actualizarLista();
  }

  cambiarProductoM(producto:any) {
    this.cambiarProducto(producto);
    this.switchSelectorCategorias();
  }

  cambiarMarca(marca:string) {
    this.marcaFiltro = marca;
    this.paginaActual = 1;
    this.actualizarLista();
  }

  numerosDePagina(productos:any) {
    let listaPaginas = [1];
    let contador = 1;
    let numerosDePagina = 1;
    for (let iterador = 1; iterador < productos.length; iterador++) {
      contador++;
      if (contador > this.productosPorPagina) {
        numerosDePagina++;
        listaPaginas.push(numerosDePagina);
        contador = 1;
      }
    }
    return listaPaginas;
  }

  get listaPaginas() {
    return this.paginas;
  }

  get precio() {
    return this.ToolsService.precio;
  }

  ordenarProductos(orden:string) {
    if (orden === 'menorPrecio') {
      this.productosService = this.menorPrecio(this.productosService);
    } else if (orden === 'mayorPrecio') {
      this.productosService = this.mayorPrecio(this.productosService);
    }
    this.actualizarLista();
    this.paginaActual = 1;
  }

  siguiente(): void {
    if (this.paginaActual < this.cantidadDePaginas) {
      this.paginaActual = this.paginaActual + 1;
      this.actualizarLista();
    }
  }

  linkCategoria(id:number){
    return `store/${id}`
  }

  ultimaPagina(): void {
    this.paginaActual = this.numerosDePagina(this.productos).length;
    this.actualizarLista();
  }

  anterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarLista();
    }
  }

  primeraPagina(): void {
    this.paginaActual = 1;
    this.actualizarLista();
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.actualizarLista();
  }

  ngOnInit() {
    this.listarCategorias();
    this.categoria = this.route.snapshot.paramMap.get('categoria');
    this.listarProductos();
    this.actualizarLista();
  }

}
