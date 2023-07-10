import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToolsService } from '../tools.service';
import { ProductoService } from '../servicios/producto.service';
import { ProductoModel } from '../modelos/producto-model';
import { CheckoutExpressService } from '../servicios/checkout-express.service';
import { ProductoCantidad } from '../modelos/producto-cantidad';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  public precio = this.ToolsService.precio;
  public imagen = this.ToolsService.imagen;
  public total:number;

  public productosCarrito:any = [];
  public productos:any = [];
  public estadoRecurso = {undefined:true};
  public productoCantidad:ProductoCantidad[] = [];

  private carritoLocalStorage:any = [];
  private carritoId:any = [];

  public loading:boolean = true;

  constructor(
    private ProductoService: ProductoService,
    private ToolsService: ToolsService,
    private Checkout:CheckoutExpressService
  ) {}

  productoLink(producto: any): string {
    return '/#/prod/' + producto.id;
  }

  public listarProductos(){

    this.ProductoService.listarPorIds(this.carritoId).subscribe(
      (response: ProductoModel[]) => {
        this.estadoRecurso.undefined = false;
        this.productosCarrito = response;
        this.listarProductoCantidad(this.productosCarrito)
        this.total = this.precioTotal(this.productoCantidad);
    });

  }

  public listarProductoCantidad(listaProductos:ProductoModel[]){
    let productos = listaProductos;
    let localStorageIds = this.carritoId;
    let iterador = 0;

    this.productoCantidad = [];

    while(localStorageIds != 0){
      let producto = productos[iterador];
      let productoId:number = producto.id;
      let cantidad:number = 0;


      localStorageIds.forEach((id:number) => {
        if(id == productoId){
          cantidad = cantidad + 1;
        }
      });

      localStorageIds = localStorageIds.filter( (Id:number) => Id !== productoId);

      this.productoCantidad.push(
        {
        cantidad:cantidad,
        producto:producto
        }
      )
      iterador += 1;
    }
  }

  public aumentarProducto(productoID:number,cantidad:number,cantidadmaxima:number){
    let max:number;
    if(cantidadmaxima){
      max = cantidadmaxima;
    }else{
      max = 5;
    }
    if(cantidad < cantidadmaxima){
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
  }

  public disminuirProducto(id:number,cantidad:number):void {
    if(cantidad > 1){
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

  public precioTotal(productos:ProductoCantidad[]):number {
    let total = 0;
    productos.forEach((elemento:ProductoCantidad)=>{
      total += (elemento.cantidad * elemento.producto.precio)
    });

    return total;
  }


  ngOnInit() {
    this.carritoLocalStorage = localStorage.getItem("carrito");
    this.carritoId = JSON.parse(this.carritoLocalStorage);
    //this.productosCarrito = this.ToolsService.filtrarPorId(this.productos,this.carritoId);
    this.listarProductos();
  }
}
