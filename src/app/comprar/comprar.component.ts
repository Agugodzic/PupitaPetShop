import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public pasoActual:number = 2;

  public paso1:boolean = true;
  public paso2:boolean = false;
  public paso3:boolean = false;

  public clickedSumbit = false;
  private datosValidados:any;
  public datosDeUsuario:FormGroup;
  public paso2option:number;

  constructor(
    private toolsService:ToolsService,
    private formBuilder:FormBuilder,) {

    this.imagen = toolsService.imagen;
  }

  public volverALaTienda(){
    window.location.href='/store/0';
  }

  public selectOptionStyle1():any{
    if(1  == this.paso2option){
      return {
        'background-color':'rgba(70, 247, 47, 0.200)',
        'border-color':'rgba(0, 0, 0, 0.274)'
      }
    }
  }
  public selectOptionStyle2():any{
    if( this.paso2option == 2){
      return {
        'background-color':'rgba(70, 247, 47, 0.180)',
        'border-color':'rgba(0, 0, 0, 0.274)'
      }
    }
  }

  public submitDatos(){
    if(this.datosDeUsuario.valid){
      this.datosValidados = this.datosDeUsuario.value;
      this.siguiente()
    }else{
      this.clickedSumbit = true;
    }
  }

  public selectOption(opcion:number){
    this.paso2option = opcion;
  }

  public sendOption():void{
    if(this.paso2option == 1 ){
    } else if(this.paso2option == 2){
      let textoWsp:string = "Buenas%20tardes!%20Mi%20nombre%20es%20"+ this.datosValidados.nombre +".%20%20Quisiera%20adquirir%20los%20siguientes%20productos:.";
      let linkWspMsj:string = "https://api.whatsapp.com/send?phone=+5493415717618&text=" + textoWsp;
      window.location.href = linkWspMsj;
    }
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
    this.datosDeUsuario = this.formBuilder.group({
      nombre:["",[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      apellido:["",[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      telefono:["",[Validators.required, Validators.min(100000), Validators.maxLength(50)]],
      email:["",[Validators.required, Validators.minLength(6), Validators.email, Validators.maxLength(50)]],
      ciudad:["",[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      direccion:["",[Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      pisoDepto:["",[]],
      codigoPostal:["",[Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    })
  }

}
