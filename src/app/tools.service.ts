import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CarritoModel } from './modelos/carrito-model';
import { ItemsModel } from './modelos/items-model';
import { PreferenciaModel } from './modelos/preferencia-model';
import { ProductoModel } from './modelos/producto-model';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private sanitizer:DomSanitizer) { }


  public recortarString(cadena: string, longitud: number): string {
    return cadena.substr(0, longitud);
  }

  public extraerElementos(
    lista:any,
    indicePrimerElemento: number,
    indiceUltimoElemento: number
  ): any {
    let extraidos = [];
    for (let i = indicePrimerElemento; i <= indiceUltimoElemento; i++) {
      extraidos.push(lista[i]);
    }
    return extraidos;
  }

  public menorPrecio(productos:any) {
    //Toma una lista de objetos que contienen la propiedad precio y los ordena de menor a mayor.
    let ordenados = productos;

    for (let i = 0; i < ordenados.length - 1; i++) {
      for (let j = 0; j < ordenados.length - i - 1; j++) {
        if (ordenados[j].precio > ordenados[j + 1].precio) {
          [ordenados[j], ordenados[j + 1]] = [ordenados[j + 1], ordenados[j]];
        }
      }
    }
    return ordenados;
  }

  public mayorPrecio(productos:any) {
    ////Toma una lista de objetos que contienen la propiedad precio y los ordena de menor a mayor.
    let ordenados = productos;

    for (let i = 0; i < ordenados.length - 1; i++) {
      for (let j = 0; j < ordenados.length - i - 1; j++) {
        if (ordenados[j].precio < ordenados[j + 1].precio) {
          [ordenados[j], ordenados[j + 1]] = [ordenados[j + 1], ordenados[j]];
        }
      }
    }
    return ordenados;
  }

  public precio(numero:number, decimales:number) {
    // transforma un numero al formato precio. ej: 2889.99 a $2.889,99
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: decimales,
    }).format(numero);
  }

  public filtrarProductosEnLista(
    /*
    Esta funcion destinada al filtro de productos toma cinco argumentos:
     1- Una lista de objetos que contienen la propiedad categoria y la propiedad marca.
     2- Un nombre o tipo de Producto.
     3- Una marca.
     4- Un valor que de coincidir con el segundo argumento desactiva el filtro producto.
     5- Un valor que de coincidir con el tercer argumento desactiva el filtro marca.
    */
    lista: any,
    filtroProducto: string,
    filtroMarca: string,
    excepcionProducto: string,
    excepcionMarca:string
  ): any {
    let listaFiltrada = [];

    for (let objeto of lista) {
      if (
        (objeto.categoria == filtroProducto ||
          filtroProducto == excepcionProducto) &&
        (objeto.marca == filtroMarca || filtroMarca == excepcionMarca)
      ) {
        listaFiltrada.push(objeto);
      }
    }

    for (let objeto of listaFiltrada) {
      console.log(
        'producto: ' + objeto.categoria + ' |  marca: ' + objeto.marca
      );
      console.log(listaFiltrada.length);
    }
    console.log(' --------------------------------------------------');
    return listaFiltrada;
  }

  public filtrarPorId(arrayElementos:any,arrayDeId:any){
    let listaFiltrada:any = [];
    for(let elemento of arrayElementos){
      for(let id of arrayDeId){
        if(elemento.id == id){
          listaFiltrada.push(elemento);
        }
      }
    }
    return listaFiltrada;
  }

  public toCarritoModel(carrito:any){
    let IDs:number[] = carrito;
    let productoCantidad = [];
    let revisados:any = [];
    let cantidad:number;

    for(let id of IDs){
      cantidad = 0;

      if(!revisados.includes(id)){
        revisados.push(id);
        IDs.forEach((elemento)=>{ if(elemento == id){cantidad++} })

        productoCantidad.push(
          {
          id:id,
          cantidad:cantidad,
          }
        )
      }
    }

    return productoCantidad;
  }

  public agregarAlCarrito(productoID:number,cantidad:number){

    let productosCarrito:any = localStorage.getItem('carrito');

    if(productosCarrito != null && productosCarrito!= undefined){
      productosCarrito = JSON.parse(productosCarrito);

      for(let prod = 1; prod <= cantidad; prod++){
       productosCarrito.push(productoID);
      }

      localStorage.setItem("carrito",JSON.stringify(productosCarrito));
      }else{

        for(let prod = 1; prod <= cantidad; prod++){
          productosCarrito = [productoID];
         }

        localStorage.setItem("carrito",JSON.stringify(productosCarrito));
      };
}

  public preferencias(productos:ProductoModel[],carrito:CarritoModel[],ordenId:number){
    let preferencia:PreferenciaModel;
    let Items:ItemsModel[] = [];
    let producto:any;
    for(let elemento of carrito){
      producto = productos.find(
        (prod:any) => prod.id == Number(elemento.id)
      );

      Items.push({
        id:elemento.id,
        category_id:producto.categoria,
        currency_id:"ARS",
        description:"",
        title:producto.nombre,
        quantity:elemento.cantidad,
        unit_price:producto.precio,
      });
    }

    preferencia = {
      items: Items,
      metadata : {
        order_id:ordenId
      }
    }
    console.log(preferencia)

    return preferencia;
  }

  public extraerBase64 = async ($event: any) => new Promise(
    (resolve, reject):any => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

  public fechaEsp(){
    let fecha = new Date();
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre'];
    const dias_semana = ['Domingo', 'Lunes', 'martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    let fechaActual = dias_semana[fecha.getDay()] + ' ' + fecha.getDate() + ' de ' + meses[fecha.getMonth()] + ' de ' + fecha.getUTCFullYear() ;
    return fechaActual;
  }

  public imagen = {
    borrar:"https://postimg.cc/k6N9G6CS",
    delete:"https://i.postimg.cc/D042wHhw/delete-black.png",
    logo:"",
    logoWsp:"https://i.postimg.cc/Dwr0RGPv/1490889687-whats-app-82529.png",
    transferencia:"https://cdn-icons-png.flaticon.com/512/794/794735.png?w=360",
    pagofacil:"https://www.hiperconstruccion.com.ar/wp-content/uploads/2020/08/PAGO-FACIL-PNG.png",
    tarjeta:"https://cdn-icons-png.flaticon.com/512/60/60378.png",
    carrito:"https://cdn-icons-png.flaticon.com/512/107/107831.png",
    carritoBlanco:"https://i.postimg.cc/Bn0BSLXD/carrito-blanco.png",
    patita:"https://static.vecteezy.com/system/resources/previews/009/344/667/original/dog-paw-free-png.png"
  }

    public apiServerUrl = "https://pupita-node.vercel.app";
// public apiServerUrl = "http://localhost:3000";
  //apiServerUrl = ""
}
