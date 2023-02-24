import { Component, OnDestroy, OnInit } from '@angular/core';
import { PedidoModel } from '../modelos/pedido-model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit , OnDestroy {
  public pedidos:any = [];
  public pedidosPrueba:PedidoModel[] = [];

  constructor(){
    this.pedidosPrueba = [{
      id:0,
      nombre:"Jose Herrero",
      email:"pepe@gmail.com",
      telefono:34259855,
      ciudad:"Santa Fe",
      direccion:"Antonia Godoy 4568",
      pisoDepartamento:"-",
      codigoPostal:"3000",
      descripcion:[],
      fecha:"03/02/2022",
      total:1568,
      estadoEnvio:"no enviado",
      estadoPago:"pagado",
    },{
      id:0,
      email:"pepe@gmail.com",
      nombre:"Juan Perez",
      telefono:34259855,
      ciudad:"Santa Fe",
      direccion:"Antonia Godoy 4568",
      pisoDepartamento:"-",
      codigoPostal:"3000",
      descripcion:[],
      fecha:"03/02/2022",
      total:1568,
      estadoEnvio:"no enviado",
      estadoPago:"pagado",
    },{
      id:0,
      nombre:"Juana Loca",
      email:"pepe@gmail.com",
      telefono:34259855,
      ciudad:"Santa Fe",
      direccion:"Antonia Godoy 4568",
      pisoDepartamento:"-",
      codigoPostal:"3000",
      descripcion:[],
      fecha:"03/02/2022",
      total:1568,
      estadoEnvio:"no enviado",
      estadoPago:"pagado",
    }]
  }

  ngOnInit(): void {
  }



  ngOnDestroy():void{

  }

}
