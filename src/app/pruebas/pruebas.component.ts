import { Component, OnInit } from '@angular/core';
import { ItemsModel } from '../modelos/items-model';
import { PreferenciaModel } from '../modelos/preferencia-model';
import { CheckoutExpressService } from '../servicios/checkout-express.service';
import { ProductoService } from '../servicios/producto.service';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {
  public localStorageData:any;
  public serviceData:any;
  public carritoPrueba:any;
  private items:ItemsModel[] = [];
  linkCheckout:string;

  constructor(
    private productoService:ProductoService,
    private check : CheckoutExpressService
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
    this.productoService.listar().subscribe(response => this.serviceData = response);
    let localStorage_:any = localStorage.getItem("productos");
    this.localStorageData =  JSON.parse(localStorage_);
    this.generarPreferencias();
  }
}
