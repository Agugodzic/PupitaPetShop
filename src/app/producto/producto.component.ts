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
  public imagenSeleccionada:any = {};
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
  public inputImageNumber:number;
  public inputImageValue:string;
  public mostrarInputImage:boolean = false;
  public inputImageAction:string;
  public resource: any;


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
  })
  }

  public switchEliminar(){
    this.mostrarAlertEliminar = this.mostrarAlertEliminar!;
  }

  public switchInputImage(name:number,action:string){
    this.inputImageNumber = name;
    this.inputImageAction = action;
    this.resource = this.producto;
    this.mostrarInputImage = !this.mostrarInputImage;
  }

  public eliminarProducto(){
    this.ProductoService.eliminar(this.productoId).subscribe()
  }

  public eliminarImagen(){

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
      this.ToolsService.agregarAlCarrito(productoID,cantidad)
      this.mostrarAlert = true;
  }

  public listarImagenes(){
    this.ImagenesProducto = [];
    let contador = 0;
    let imagenes = [this.producto.imagen1,this.producto.imagen2,this.producto.imagen3,this.producto.imagen4]
    for(let imagen of imagenes){
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

  ngOnInit() {
    this.productosCarrito = localStorage.getItem('carrito');
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));
    this.listarProductos();
    this.preCargarProducto();
  }

  ngOnDestroy():void{
  }
}
