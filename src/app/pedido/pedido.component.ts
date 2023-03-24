import { Component, Input, OnInit } from '@angular/core';
import { CheckoutExpressService } from '../servicios/checkout-express.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit{
  @Input() orden:any;
  @Input() id:number;
  public estadoDePagoActualizado:string = "Cargando..";
  public descripcion:any = [];

  constructor(
    private checkout:CheckoutExpressService
  ){}

  public colorEstadosPago():any{
    if(this.estadoDePagoActualizado == 'Pagado'){
      return {'color':'rgba(20, 165, 15, 0.836)'};
    }
    else if(this.estadoDePagoActualizado == 'Pendiente'){
      return {'color':'rgb(230, 188, 0)'};
    }
    else if(this.estadoDePagoActualizado == ''){
      return {'color':'rgb(189, 50, 15)'};
    }else{
      return {'color':'black'};
    }
  }
  public colorEstadosEnvio():any{
    if(this.orden.estadoDeEnvio.toString == 'Pendiente'){
      return {'color':'rgba(20, 165, 15, 0.836)'};
    }
    else if(this.orden.estadoDeEnvio.toString == 'Enviado'){
      return {'color':'rgb(230, 188, 0)'};
    }
    else if(this.orden.estadoDeEnvio.toString == 'Entregado'){
      return {'color':'rgb(189, 50, 15)'};
    }else{
      return {'color':'black'};
    }
  }

  comprobarPago(){
      this.checkout.findPaymentById(this.orden.id).subscribe(
        (response) => {
          if(response.orderList.length > 0){
            if(response.orderList[response.orderList.length-1].status == 'approved'){
              this.estadoDePagoActualizado = 'Pagado';
            }else if(response.orderList[response.orderList.length-1].status == 'pending'){
              this.estadoDePagoActualizado = 'Pendiente';
            }
          }
          else{
            this.estadoDePagoActualizado = 'Pendiente'
          }
        }
      );
  }


  cerrar(){
    location.reload()
  }

  ngOnInit(): void {
    this.comprobarPago()
    if(this.descripcion){
      this.descripcion = this.orden.descripcion.split("|");
    }
  }
}
