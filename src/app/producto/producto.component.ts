import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../productos.service';
import { ProductoService } from '../servicios/producto.service';
import { ToolsService } from '../tools.service';
import { ProductoModel } from '../modelos/producto-model';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit, OnDestroy {

  public verMas:string = 'Ver especificaciones';
  public longitud = this.ToolsService.recortarString;
  public productoId:number;
  public imagenSeleccionada:string = "";
  public producto:any;
  public precio = this.ToolsService.precio;
  public logged:boolean = true;
  public cantidadImagenes:number;
  public mostrarEspecificaciones:boolean = false;
  public mostrarAlert:boolean = false;
  public editarProducto:boolean = false;
  public Imagen = this.ProductosService.imagen;

  public cantidad:number = 1;

  private mostrarAlertEliminar:boolean = false;
  public getMostrarAlertEliminar = () => { return this.mostrarAlertEliminar}

  private productosCarrito:any;
  public ImagenesProducto:any = [];
  public productos:any = [];

  constructor(
    private ProductosService: ProductosService,
    private ProductoService: ProductoService,
    private ToolsService: ToolsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  public getLogValue(){ return this.authService.loggedIn() };

  private preCargarProducto(){
    let productosLocalStorage:any = localStorage.getItem("productos");
    this.productos = JSON.parse(productosLocalStorage);
    this.producto = this.productos.find(
      (prod:any) => prod.id == Number(this.productoId)
    );
    this.listarImagenes();
    this.imagenSeleccionada = this.producto.imagen1;
  }

  public listarProductos(){
    this.ProductoService.listar().subscribe(
      (response: ProductoModel[])  =>{
        this.productos = response;
        this.producto = this.productos.find(
          (prod:any) => prod.id == Number(this.productoId)
        );
        this.listarImagenes();/*
        this.ToolsService.extraerBase64(this.producto.imagen1).then((image:any) => {
          this.imagenSeleccionada = image.base;
    })*/
    this.imagenSeleccionada = this.producto.imagen1
  })
  }
  public switchEliminar(){
    if(this.mostrarAlertEliminar == false){
      this.mostrarAlertEliminar = true;
    }
    else{this.mostrarAlertEliminar = false}

  }

  public eliminarProducto(){
    this.ProductoService.eliminar(this.productoId).subscribe()
  }

  mostrarId() {
    alert(this.productoId);
  }

  buscarId(array: any): any {
    for (let elemento of array) {
      if (elemento.id === this.productoId) {
        return elemento;
      }
    }
  }

  cambiarImagen(imagen:any) {
    this.imagenSeleccionada = imagen;
  }

  productoLink(producto: any): string {
    return '/prod/' + producto.id;
  }

  mostrarObjeto(objeto:any) {
    for (let producto of objeto) {
      console.log(Number(producto.precio));
    }
  }

  VerMas(){
    if (this.verMas == 'Ver especificaciones') {
      this.verMas = 'Ocultar especificaciones';
      this.mostrarEspecificaciones = true;
    }else{
      this.verMas = 'Ver especificaciones';
      this.mostrarEspecificaciones = false;
    }
  }

  agregarAlCarrito(productoID:number,cantidad:number){
      this.ToolsService.agregarAlCarrito(productoID,cantidad)
      this.mostrarAlert = true;
  }

  listarImagenes(){
    this.ImagenesProducto = [];
    if(this.producto.imagen1){this.ImagenesProducto.push(this.producto.imagen1)}
    if(this.producto.imagen2){this.ImagenesProducto.push(this.producto.imagen2)}
    if(this.producto.imagen3){this.ImagenesProducto.push(this.producto.imagen3)}
    if(this.producto.imagen4){this.ImagenesProducto.push(this.producto.imagen4)}
    this.cantidadImagenes = this.ImagenesProducto.length;
  }

  switchEditar():void{
    if(this.editarProducto == false){
      this.editarProducto = true;
    }else{
      this.editarProducto = false;
    }
  }

  ngOnInit() {
    this.productosCarrito = localStorage.getItem('carrito');
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));
    this.listarProductos();
    this.preCargarProducto();
    this.cantidadImagenes = this.ImagenesProducto.length;
  }
  ngOnDestroy():void{
  }
}
