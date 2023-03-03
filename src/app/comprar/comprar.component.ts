import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarritoModel } from '../modelos/carrito-model';
import { PreferenciaModel } from '../modelos/preferencia-model';
import { ProductoModel } from '../modelos/producto-model';
import { CheckoutExpressService } from '../servicios/checkout-express.service';
import { ProductoService } from '../servicios/producto.service';
import { ToolsService } from '../tools.service';


declare var paypal:any;

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {
  public imagen:any;
  public textoBoton:string = "Siguiente";
  public pasoActual:number = 1;

  public paso1:boolean = true;
  public paso2:boolean = false;
  public paso3:boolean = false;

  public clickedSumbit = false;
  private datosValidados:any;
  public datosDeUsuario:FormGroup;
  public paso2option:number;
  public errorPaso2:boolean;
  public productosCarrito:any;
  private localStorage_:any = localStorage.getItem("productos");

  private carritoLocalStorage:any = [];
  private carritoId:any = [];

  constructor(
    private productoService:ProductoService,
    private checkout:CheckoutExpressService,
    private toolsService:ToolsService,
    private formBuilder:FormBuilder,) {
    this.imagen = toolsService.imagen;
  }

  // ------------ METODOS PASO 1 ------------------//

  public volverALaTienda(){
    window.location.href='/store/0';
  }

  public selectOptionStyle1():any{
    if(1  == this.paso2option){
      return {
        'background-color':'rgba(70, 247, 47, 0.200)',
        'border-color':'rgba(0, 0, 0, 0.374)'
      }
    }
  }
  public selectOptionStyle2():any{
    if( this.paso2option == 2){
      return {
        'background-color':'rgba(70, 247, 47, 0.180)',
        'border-color':'rgba(0, 0, 0, 0.374)'
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


   // ------------ METODOS PASO 2 ------------------//


  public selectOption(opcion:number){
    this.paso2option = opcion;
  }

  private sendPreferencias(){
    let _carrito:CarritoModel[];
    let _preferencias:PreferenciaModel[];

    _carrito = this.toolsService.toCarritoModel(this.carritoId)

    this.productoService.listar().subscribe(
      (response: ProductoModel[])  =>{
      _preferencias = this.toolsService.preferencias(response,_carrito);
    this.checkout.sendPreferences(_preferencias).subscribe(
      (response)=>  {
        //window.location.href = response.body.init_point.toString();
        window.open(response.body.init_point.toString());
        alert(response.body.collector_id.toString())
      }
    );
    })
  }

  private sendPreferenciasWsp():any{
    let _carrito:CarritoModel[];
    let preferencias:PreferenciaModel[] = [];
    let preferenciasToUrl:string = "";
    let total:number = 0;

    _carrito = this.toolsService.toCarritoModel(this.carritoId)

    this.productoService.listar().subscribe(
      (response: ProductoModel[])  =>{
      preferencias = this.toolsService.preferencias(response,_carrito);

      for(let preferencia of preferencias){
        total = total + preferencia.quantity * preferencia.unit_price;
        preferenciasToUrl = preferenciasToUrl + "%20" + preferencia.quantity + "%20" + preferencia.title + "%20%20"+ preferencia.quantity+ "%20x%20$" + preferencia.unit_price + "%0A" ;
      }

      let textoWsp:string = "Hola, %20mi%20nombre%20es%20"+ this.datosValidados.nombre +
        "%20y%20quisiera%20comprar:%0A"+ preferenciasToUrl + "Total: $" + total +
        "%0AMIS%20DATOS:%0A"+
        "nombre: " + this.datosValidados.nombre+" "+this.datosValidados.apellido+"%0A"+
        "telefono: " + this.datosValidados.telefono+"%0A"+
        "email: " + this.datosValidados.email+"%0A"+
        "direccion: " + this.datosValidados.direccion+"%0A"+
        "piso/depto: " + this.datosValidados.pisoDepto+"%0A"+
        "c. postal: " + this.datosValidados.codigoPostal+"%0A";

      let linkWspMsj:string = "https://api.whatsapp.com/send?phone=+5493415717618&text=" + textoWsp;
      window.open(linkWspMsj);
      this.pasoActual = 3;
      localStorage.setItem('carrito',"[]");

      }
    )

    return preferenciasToUrl;
  }

  public sendOption(){
    if(this.paso2option == 1 ){
     this.sendPreferencias();
    }
    else if(this.paso2option == 2){
    this.sendPreferenciasWsp();
    }
    else{
      this.errorPaso2 = true;
    }
  }

   // ------------ METODOS GENERALES ------------------//


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
    this.carritoLocalStorage = localStorage.getItem("carrito");
    this.carritoId = JSON.parse(this.carritoLocalStorage);

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

      this.datosDeUsuario.patchValue({
      pisoDepto:"-"
    })
  }

}
