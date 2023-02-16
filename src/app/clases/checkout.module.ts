import { NgModule, OnInit } from "@angular/core";
import { CarritoModel } from "../modelos/carrito-model";
import { PreferenciaModel } from "../modelos/preferencia-model";
import { ProductoModel } from "../modelos/producto-model";
import { CheckoutExpressService } from "../servicios/checkout-express.service";
import { ProductoService } from "../servicios/producto.service";
import { ToolsService } from "../tools.service";

@NgModule({
  imports: [],
  exports: []
})
class Checkout implements OnInit{
  private carritoId:any;

  constructor(
    private ToolsService:ToolsService,
    private ProductoService:ProductoService,
    private CheckoutService:CheckoutExpressService){
  }

  public enviarPreferencias(){
    let _carrito:CarritoModel[];
    let _preferencias:PreferenciaModel[];

    _carrito = this.ToolsService.toCarritoModel(this.carritoId)

    this.ProductoService.listar().subscribe(
      (response: ProductoModel[])  =>{
      _preferencias = this.ToolsService.preferencias(response,_carrito);
    this.CheckoutService.sendPreferences(_preferencias).subscribe(
      (response)=> window.location.href = response.body.init_point.toString()

    );
    })
  }

  ngOnInit() {
    let carrito:any = localStorage.getItem("carrito")
    this.carritoId = JSON.parse(carrito);
  }

}
