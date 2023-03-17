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
  public orden:OrdenModel;
  public id:number;
  public mostrarOrden = false;
  public pedidos:any = [];
  public seccionActual: string = 'pendientes';
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

  public colorEstadosEnvio(estadoDeEnvio:any):any{
    if(estadoDeEnvio.toString == 'Pendiente'){
      return {'color':'rgba(20, 165, 15, 0.836)'};
    }
    else if(estadoDeEnvio == 'Enviado'){
      return {'color':'rgb(230, 188, 0)'};
    }
    else if(estadoDeEnvio == 'Entregado'){
      return {'color':'rgb(189, 50, 15)'};
    }else{
      return {'color':'black'};
    }
  }

  public estiloBoton(estado:string){
    return {
      'background-color':this.seccionActual==estado?'rgba(42, 71, 235, 0.76)':'white',
      'color':this.seccionActual==estado?'white':'black',
      'border-style':this.seccionActual==estado?'none':'solid',
      }
  }

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
  switchOrden(Orden:any){
    this.orden = Orden;
    this.mostrarOrden = !this.mostrarOrden;
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

  public cambiarSeccion(seccion:string){
    this.seccionActual = seccion;
  }


  ngOnInit(): void {
    this.listarOrdenes();
    this.conteoDeEnvios()
  }

  ngOnDestroy():void{

  }

}
