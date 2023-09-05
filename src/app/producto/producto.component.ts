import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../productos.service';
import { ProductoService } from '../servicios/producto.service';
import { ToolsService } from '../tools.service';
import { ProductoModel } from '../modelos/producto-model';
import { AuthService } from '../servicios/auth.service';
import { LocalStorageService } from '../servicios/local-storage.service';
//import { Store } from '@ngrx/store';
//import { listaDeProductos } from '../state/selectors/productos.selectors';
//import { Observable } from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit, OnDestroy {

  public verMas:string = 'Ver especificaciones';
  public longitud = this.ToolsService.recortarString;
  public productoId:number;
  public imagenSeleccionada:any = {};
  public producto:any = {undefined:true};
  public precio = this.ToolsService.precio;
  public logged:boolean = true;
  public cantidadImagenes:number = 0;
  public mostrarEspecificaciones:boolean = false;
  public mostrarAlert:boolean = false;
  public editarProducto:boolean = false;
  public Imagen = this.ProductosService.imagen;
  public categoria = 'all';
  public cantidad:number = 1;

  private mostrarAlertEliminar:boolean = false;
  public getMostrarAlertEliminar = () => { return this.mostrarAlertEliminar}

  private productosCarrito:any;
  public ImagenesProducto:any = [];
  public productosRelacionados:any = [];
  public inputImageNumber:number;
  public inputImageValue:string;
  public mostrarInputImage:boolean = false;
  public inputImageAction:string;
  public resource: any;
  public loading:boolean = true;
  public loadingImagenes:boolean = true;
  private imagenes:any = ["","","",""];
  public cantidadmaxima:number = 5;
    /*public productos$():Observable<any>{
    return this.store.select(listaDeProductos);
  };*/


  constructor(
    private ProductosService: ProductosService,
    private ProductoService: ProductoService,
    private ToolsService: ToolsService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
   // private store:Store<any>
  ) {
  }

  public getLogValue(){
    return this.authService.loggedIn()
  };

  public solicitarProducto(id:number){
    this.ProductoService.buscarPorId(id).subscribe(
      (response: ProductoModel[])  =>{
        this.producto = response[0];
        this.listarImagenes();
        this.loadingImagenes = false;
        this.loading = false;
        this.categoria = this.producto.categoria;
        this.listarRelacionados(this.categoria);

        if(this.producto.cantidadmaxima > 0){
          this.cantidadmaxima = this.producto.cantidadmaxima;
        }

  })
  }

  public listarRelacionados(categoria:string){
    this.ProductoService.relacionados(categoria,5).subscribe(
      (response:ProductoModel[]) =>{
        this.productosRelacionados = response;
      }
    );
  }

  public switchEliminar(){
    this.mostrarAlertEliminar = !this.mostrarAlertEliminar;
  }

  public switchInputImage(numero:number,action:string){
    this.inputImageNumber = numero;
    this.inputImageAction = action;
    this.resource = this.producto;
    this.mostrarInputImage = !this.mostrarInputImage;
  }

  public eliminarImagen(numero:number){
    let productoImagen:any = [];
    let numeros:any = [];

    this.ImagenesProducto.splice(numero-1,1);

    try{
      this.producto.imagen1 = this.ImagenesProducto[0].imagen
    }catch(err){
      console.log(err)
      this.producto.imagen1 = null
    }

    try{
       this.producto.imagen2 = this.ImagenesProducto[1].imagen
    }catch(err){
      console.log(err)
      this.producto.imagen2 = null
    }

    try{
      this.producto.imagen3 = this.ImagenesProducto[2].imagen
    }catch(err){
      console.log(err)
      this.producto.imagen3 = null
    }

    try{
      this.producto.imagen4 = this.ImagenesProducto[3].imagen
    }catch(err){
      console.log(err)
      this.producto.imagen4 = null
    }

    this.cantidadImagenes = this.ImagenesProducto.length;
    this.imagenSeleccionada = this.ImagenesProducto[0];
    this.ProductoService.editar(this.producto).subscribe(
    )
  }

  public mostrarId() {
    alert(this.productoId);
  }

  public buscarId(array: any): any {
    for (let elemento of array) {
      if (elemento.id === this.productoId) {
        return elemento;
      }
    }
  }

  public cambiarImagen(imagen:any) {
    this.imagenSeleccionada = imagen;
  }

  public productoLink(producto: any): string {
    return '#/prod/' + producto.id;
  }

  public mostrarObjeto(objeto:any) {
    for (let producto of objeto) {
      console.log(Number(producto.precio));
    }
  }

  public VerMas(){
    if (this.verMas == 'Ver especificaciones') {
      this.verMas = 'Ocultar especificaciones';
      this.mostrarEspecificaciones = true;
    }else{
      this.verMas = 'Ver especificaciones';
      this.mostrarEspecificaciones = false;
    }
  }

  public agregarAlCarrito(productoID:number,cantidad:number){
      if(cantidad && cantidad <= this.cantidadmaxima && this.cantidad > 0){
        this.ToolsService.agregarAlCarrito(productoID,cantidad)
        this.mostrarAlert = true;
      }
  }

  public listarImagenes(){
    this.ImagenesProducto = [];
    let contador = 0;
    this.imagenes = [this.producto.imagen1,this.producto.imagen2,this.producto.imagen3,this.producto.imagen4]
    for(let imagen of this.imagenes){
      if(imagen){
        contador = contador + 1;
        this.ImagenesProducto.push({
          numero:contador,
          imagen:imagen
        })
      }
    }
    this.cantidadImagenes = contador;
    this.imagenSeleccionada = {numero:1,imagen:this.producto.imagen1}
  }

  public switchEditar():void{
    if(this.editarProducto == false){
      this.editarProducto = true;
    }else{
      this.editarProducto = false;
    }
  }
  public actualizarProducto():void{
    location.reload();
  }

  ngOnInit() {
    //this.productosCarrito = localStorage.getItem('carrito');
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));
    /*this.productos$().subscribe(
      (response)=> {
        this.productos = response.productos;
        this.loading = response.loading;
        this.producto = this.productos.find(
          (prod:any) => prod.id == Number(this.productoId)
        );
        this.listarImagenes();
        this.solicitarProducto(this.productoId);
      }
    )*/
    //this.listarProductos();

    this.listarImagenes();
    this.solicitarProducto(this.productoId);
  }


  ngOnDestroy():void{
  }
}
