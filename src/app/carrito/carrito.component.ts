import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToolsService } from '../tools.service';
import { ProductosService } from '../productos.service';
import { ProductoService } from '../servicios/producto.service';
import { ProductoModel } from '../modelos/producto-model';
import { PreferenciaModel } from '../modelos/preferencia-model';
import { CarritoModel } from '../modelos/carrito-model';
import { CheckoutExpressService } from '../servicios/checkout-express.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit, OnDestroy {
  public precio = this.ToolsService.precio;
  public imagen = this.ToolsService.imagen;
  public total:number;

  public productosCarrito:any;
  private localStorage_:any = localStorage.getItem("productos");
  public productos:any = JSON.parse(this.localStorage_);
  public productoCantidad:any = [];

  private carritoLocalStorage:any = [];
  private carritoId:any = [];

  constructor(
    private ProductoService: ProductoService,
    private ToolsService: ToolsService,
    private Checkout:CheckoutExpressService
  ) {}

  productoLink(producto: any): string {
    return '/prod/' + producto.id;
  }

  public listarProductos(){
    this.ProductoService.listar().subscribe(
      (response: ProductoModel[])  =>{
        this.productos = response;
        this.productosCarrito = this.ToolsService.filtrarPorId(response,this.carritoId);
        this.listarProductoCantidad(this.productosCarrito)
        this.total = this.precioTotal();
    });
  }

  private preCargarProducto(){
    let productosLocalStorage:any = localStorage.getItem("productos");
    this.productos = JSON.parse(productosLocalStorage);
    this.productosCarrito = this.ToolsService.filtrarPorId(this.productos,this.carritoId);
    this.listarProductoCantidad(this.productosCarrito)
    this.total = this.precioTotal();
  }

  public listarProductoCantidad(listaProductos:any){
    let productos = listaProductos;
    this.productoCantidad = [];

    while(productos.length != 0){

      let producto = productos[0];
      let id = producto.id;
      let cantidad = 0;

      productos.forEach((elemento:any) => {
        if(elemento.id == id){
          cantidad ++;
          productos = productos.filter( (prod:any) => prod !== producto)
        }
      });



      this.productoCantidad.push(
        {
        cantidad:cantidad,
        producto:producto
        }
      )
    }
  }

  public aumentarProducto(productoID:number){

    if(this.carritoLocalStorage != null && this.carritoLocalStorage!= undefined){
      this.carritoLocalStorage = JSON.parse(this.carritoLocalStorage);
      this.carritoLocalStorage.push(productoID);

      localStorage.setItem("carrito",JSON.stringify(this.carritoLocalStorage));

      }else{
        this.carritoLocalStorage = [productoID];
        localStorage.setItem("carrito",JSON.stringify(this.carritoLocalStorage));
      };

      location.reload();
}

  public disminuirProducto(id:number){
    let nuevaLista:any = [];
    let revisados:any = [];

    for(let elemento of this.carritoId){
      if(elemento != id || revisados.includes(elemento)){
        nuevaLista.push(elemento);
      }
      revisados.push(elemento);
    }
    localStorage.setItem("carrito",JSON.stringify(nuevaLista));
    location.reload();
  }

  public eliminarProducto(id:number){
    let nuevaLista:any = [];

    for(let elemento of this.carritoId){
      if(elemento != id){
        nuevaLista.push(elemento);
      }
    }

    localStorage.setItem("carrito",JSON.stringify(nuevaLista));
    location.reload();
  }

  public precioTotal(){
    let total:number=0;
    for(let producto of this.productosCarrito){
      total = total + producto.precio;
    }
    return total;
  }

  public pruebas(){
    this.enviarPreferencias();
  }

  public enviarPreferencias(){
    let _carrito:CarritoModel[];
    let _preferencias:PreferenciaModel[];

    _carrito = this.ToolsService.toCarritoModel(this.carritoId)

    this.ProductoService.listar().subscribe(
      (response: ProductoModel[])  =>{
      _preferencias = this.ToolsService.preferencias(response,_carrito);
    this.Checkout.sendPreferences(_preferencias).subscribe(
      (response)=> window.location.href = response.body.init_point.toString()
    );
    })
  }

  ngOnInit() {
    this.carritoLocalStorage = localStorage.getItem("carrito");
    this.carritoId = JSON.parse(this.carritoLocalStorage);
    this.productosCarrito = this.ToolsService.filtrarPorId(this.productos,this.carritoId);
    this.preCargarProducto()
    this.listarProductos();
  }
  ngOnDestroy():void{
    this.ProductoService.listar().subscribe();
  }
}
