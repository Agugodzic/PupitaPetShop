import { Component, OnDestroy, OnInit } from '@angular/core';
import { PedidoModel } from '../modelos/pedido-model';
import { OrdenService } from '../servicios/orden.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit , OnDestroy {
  public pedidos:any = [];
  public ordenes:any = []

  constructor(
    private ordenService:OrdenService
  ){}

  listarOrdenes(){
    this.ordenService.listar().subscribe()
  }

  ngOnInit(): void {
  }

  ngOnDestroy():void{

  }

}
