import { Component, Input, OnInit } from '@angular/core';
import { ToolsService } from '../tools.service';

@Component({
  selector: 'app-producto-miniatura',
  templateUrl: './producto-miniatura.component.html',
  styleUrls: ['./producto-miniatura.component.css']
})
export class ProductoMiniaturaComponent implements OnInit {
  @Input() producto:any;
  private cantidad:number = 1;
  private productosCarrito:any;
  public linkStatus:boolean = true;
  public mostrarAlert:boolean = false;

  constructor(
    private toolsService:ToolsService
  ) { }

  get precio() {
    return this.toolsService.precio;
  }

  get longitud() {
    return this.toolsService.recortarString;
  }

  public mostrarAlertCantidad(){
    this.mostrarAlert = !this.mostrarAlert;
  }

  agregarAlCarrito():void{

    if(this.productosCarrito != null && this.productosCarrito!= undefined){
      this.productosCarrito = JSON.parse(this.productosCarrito);

      for(let prod = 1; prod <= this.cantidad; prod++){
       this.productosCarrito.push(this.producto.id);
      }

      localStorage.setItem("carrito",JSON.stringify(this.productosCarrito));
      }else{

        for(let prod = 1; prod <= this.cantidad; prod++){
          this.productosCarrito = [this.producto.id];
         }

        localStorage.setItem("carrito",JSON.stringify(this.productosCarrito));
      };

  }

  abrirProducto(producto: any):void{
    if(this.linkStatus){
      window.location.href = '#/prod/' + producto.id;
    }
  }

  public desactivarLink():void{
    this.linkStatus = false;
  }

  public activarLink():void{
    this.linkStatus = true;
  }

  ngOnInit(): void {
    this.productosCarrito = localStorage.getItem('carrito');
  }
}
