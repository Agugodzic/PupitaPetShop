import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  setValues(item:string,recurso:any){
  /* recibe como entrada el nombre del item a modificar y el array completo de los recursos a agregar o actualizar.
  crea el item en el localStorage o lo actualiza por completo si este ya existe. */
      localStorage.setItem(item,JSON.stringify(recurso));
  }

  addValue(item:string,recurso:any){
  //agrega un elemento unico al array de recursos del item seleccionado
    if(item == "categorias"){

    let categorias_ = localStorage.getItem("categorias")
    let categorias:any;

    if(categorias_ != null && categorias_ != undefined){
      categorias = JSON.parse(categorias_);
      categorias.push(recurso);
    }

    localStorage.setItem("categorias",JSON.stringify(categorias));

   }else if(item == "carrito"){

    let carrito_ = localStorage.getItem("carrito")
    let carrito:any;

    if(carrito_ != null && carrito_ != undefined){
      carrito = JSON.parse(carrito_);
      carrito.push(recurso);
    }

    localStorage.setItem("carrito",JSON.stringify(carrito));
   }
  }

  getValues(item:string):any{
  //Devuelve  un array completo con los objetos del item solicitado
    if(item == 'categorias'){
      let categorias_ = localStorage.getItem("categorias")
      if(categorias_ != null && categorias_ != undefined){
        return JSON.parse(categorias_);
      }
    }else if(item == 'carrito'){
      let carrito_ = localStorage.getItem("carrito")
      if(carrito_ != null && carrito_ != undefined){
        return JSON.parse(carrito_);
      }
    }else{
      return [];
    }
  }

  deleteValue(item:string,id:number){
    let nuevaLista:any = [];
    let values_ = localStorage.getItem(item)
    if(values_ != null && values_ != undefined){

      let values = JSON.parse(values_);
      values.forEach( (value:any)=>{

        if(id !== value.id){
          nuevaLista.push(value)
        }
      });
      localStorage.setItem(item,JSON.stringify(nuevaLista));
    }
  }

}
