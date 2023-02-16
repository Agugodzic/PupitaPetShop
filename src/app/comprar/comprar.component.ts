import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToolsService } from '../tools.service';


declare var paypal:any;

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {
  @ViewChild( 'paypal', { static:true }) paypalElement:ElementRef;
  public imagen:any;
  public textoBoton:string = "Siguiente";
  public pasoActual:number = 1;

  public paso1:boolean = true;
  public paso2:boolean = false;
  public paso3:boolean = false;

  constructor( toolsService:ToolsService) {
    this.imagen = toolsService.imagen;
  }

  public volverALaTienda(){
    window.location.href='/store/0';
  }

  public siguiente(){
    if(this.pasoActual < 4){
      this.pasoActual ++;
      this.paso1 = this.pasoActual >= 1;
      this.paso2 = this.pasoActual >= 2;
      this.paso3 = this.pasoActual >= 3;
    }

    if(this.pasoActual == 3){
      this.textoBoton = "Comprar !";
    }
    if(this.pasoActual == 4){
      this.textoBoton = "Volver a la tienda";
      //window.location.href='/store/0';
    }
  }

  public volver(){
    if(this.pasoActual > 1){
      this.pasoActual --;
      this.paso1 = this.pasoActual >= 1;
      this.paso2 = this.pasoActual >= 2;
      this.paso3 = this.pasoActual >= 3;
    }
    if(this.pasoActual == 3){
      this.textoBoton = "Comprar !";
    }
    if(this.pasoActual < 3){
      this.textoBoton = "Siguiente";
    }
  }

  ngOnInit(): void {
  }

}
