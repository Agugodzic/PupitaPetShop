import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ItemsModel } from '../modelos/items-model';
import { ProductoModel } from '../modelos/producto-model';
import { RangoModel } from '../modelos/rango-model';
import { CheckoutExpressService } from '../servicios/checkout-express.service';
import { ProductoService } from '../servicios/producto.service';
import { listaDeProductos } from '../state/selectors/productos.selectors';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {
  public localStorageData:any;
  public serviceData:any;
  public carritoPrueba:any;
  public linkCheckout:string;
  public productosRx:any = [];
  public loading:any = true;
  private items:ItemsModel[] = [];

  public productos$():Observable<any>{
    return this.store.select(listaDeProductos);
  };

  cantidadTotal: number;



  constructor(
    private productoService:ProductoService,
    private check : CheckoutExpressService,
    private store:Store<any>
    ){
      this.carritoPrueba = [
        {id:1,nombre:"correa",precio:500,cantidad:3},
        {id:2,nombre:"correa",precio:200,cantidad:2},
        {id:3,nombre:"correa",precio:450,cantidad:5}
      ]
    }

    generarPreferencias(){
      for(let producto of this.carritoPrueba){
        this.items.push({
          id:producto.id,
          category_id:"",
          currency_id:"ARS",
          description:"",
          title:producto.nombre,
          quantity:producto.cantidad,
          unit_price:producto.precio
        })
      }
    }


  ngOnInit(){
    this.productos$().subscribe(
      (response)=> {
        this.productosRx = response.productos;
        this.loading = response.loading;
      }
    )

    this.productoService.listarPorRango(1).subscribe(
      (response:RangoModel) => {
        this.serviceData = response.productos;
        this.cantidadTotal = response.cantidad;
      });
   // let localStorage_:any = localStorage.getItem("productos");
    //this.localStorageData =  JSON.parse(localStorage_);
    this.generarPreferencias();
  }
}
