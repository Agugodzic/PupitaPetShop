import { Component, EventEmitter, Output } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';


@Component({
  selector: 'app-variar-precios',
  templateUrl: './variar-precios.component.html',
  styleUrls: ['./variar-precios.component.css']
})
export class VariarPreciosComponent {
  @Output() mostrar = new EventEmitter();

  public porcentaje:number = 0;
  public spinner:boolean = false;

  constructor(private productoService:ProductoService){
  }

  variarPrecios(){
    this.spinner = true;
    if(this.porcentaje != 0){
      let conf = {
        porcentaje:this.porcentaje
      };

      this.productoService.variarPrecios(conf).subscribe(()=>{
        location.href='/#/store/0';
      });

      setTimeout(()=>{
        location.reload();
    }, 2000);
    }
  }

  cancelar(){
    this.mostrar.emit(false);
  }
}
