import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdenModel } from '../modelos/orden-model';
import { AuthService } from '../servicios/auth.service';
import { OrdenService } from '../servicios/orden.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit , OnDestroy {
  public pedidos:any = [];
  public getLogValue(){ return this.authService.loggedIn() };
  public conteo = {
    pendientes:0,
    enviados:0,
    entregados:0
  }

  constructor(
    private ordenService:OrdenService,
    private authService:AuthService
  ){}

  listarOrdenes(){
    this.ordenService.listar().subscribe(
      (response) => {
        this.pedidos = response;
        this.conteoDeEnvios();
      }
    )
  }

  marcarComoPagado(orden:OrdenModel){
    orden.estadoDePago = "Pagado";
    this.ordenService.editar(orden).subscribe(()=>{
      this.conteoDeEnvios()
    }
    );
  }

  marcarComoEnviado(orden:OrdenModel){
    orden.estadoDeEnvio = "Enviado";
    this.ordenService.editar(orden).subscribe(()=>{
      this.conteoDeEnvios()
});
  }

  marcarComoEntregado(orden:OrdenModel){
    orden.estadoDeEnvio = "Entregado";
    this.ordenService.editar(orden).subscribe(()=>{
      this.conteoDeEnvios()

    });
  }

  marcarComoPendiente(orden:OrdenModel){
    orden.estadoDeEnvio = "Pendiente";
    this.ordenService.editar(orden).subscribe(()=>{
      this.conteoDeEnvios()
});
  }

  conteoDeEnvios(){
    let pendientes:number = 0;
    let enviados:number = 0;
    let entregados:number = 0;

    this.pedidos.forEach( (pedido:OrdenModel) => {
      if(pedido.estadoDeEnvio == "Pendiente"){
        pendientes ++;
      };
      if(pedido.estadoDeEnvio == "Enviado"){
        enviados ++;
      };
      if(pedido.estadoDeEnvio == "Entregado"){
        entregados = entregados + 1;
      }
    });
    this.conteo = {
      pendientes:pendientes,
      enviados:enviados,
      entregados:entregados
    }
  }

  ngOnInit(): void {
    this.listarOrdenes();
    this.conteoDeEnvios()
  }

  ngOnDestroy():void{

  }

}
