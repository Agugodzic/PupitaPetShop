import { Injectable } from '@angular/core';
import { ProductosService } from './productos.service';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }


  recortarString(cadena: string, longitud: number): string {
    return cadena.substr(0, longitud);
  }
  extraerElementos(
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
  menorPrecio(productos:any) {
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
  mayorPrecio(productos:any) {
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
  precio(numero:number, decimales:number) {
    // transforma un numero al formato precio. ej: 2889.99 a $2.889,99
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: decimales,
    }).format(numero);
  }

  filtrarProductosEnLista(
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

  filtrarPorId(arrayElementos:any,arrayDeId:any){
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

  categorias:any = [
    "Mouses",
    "Teclados",
    "Monitores",
    "Auriculares",
    "Mousepads"
  ]

  imagen = {
    borrar:"https://postimg.cc/k6N9G6CS",
    delete:"https://i.postimg.cc/D042wHhw/delete-black.png",
    logo:"",
    logoWsp:"https://es.logodownload.org/wp-content/uploads/2018/10/whatsapp-logo-11.png",
    transferencia:"https://cdn-icons-png.flaticon.com/512/794/794735.png?w=360",
    pagofacil:"https://www.hiperconstruccion.com.ar/wp-content/uploads/2020/08/PAGO-FACIL-PNG.png",
    tarjeta:"https://cdn-icons-png.flaticon.com/512/60/60378.png",
    carrito:"https://cdn-icons-png.flaticon.com/512/107/107831.png"
  }
}

