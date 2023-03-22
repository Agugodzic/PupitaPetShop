import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CategoriaModel } from '../modelos/categoria-model';
import { CategoriaService } from '../servicios/categoria.service';
import { LocalStorageService } from '../servicios/local-storage.service';
import { ProductoService } from '../servicios/producto.service';
import { ToolsService } from '../tools.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() texto:string;
  @Input() titulo:string;
  @Input() textoBoton:string;
  @Input() textoCancelar:string;
  @Input() accion:string;
  @Input() accionCancelar:any;
  @Input() productoId:number;
  @Input() ruta:string;
  @Input() tipo:string;
  @Input() metodo:any;

  @Output() mostrar = new EventEmitter();

  private categoria:CategoriaModel;
  public cantidad:number = 1;
  public tipoInputNumber:any;

  constructor(
    private productoService:ProductoService,
    private categoriaService:CategoriaService,
    private toolsService:ToolsService,
    private localStorageService:LocalStorageService
    ){}

  actualizar(){
    location.reload()
  }

  agregarAlCarrito(){
    this.toolsService.agregarAlCarrito(this.productoId,this.cantidad);
    location.reload;
  }

  funcion(){
    if(this.accion == "eliminar-producto"){
      this.eliminarProducto()
    }
    if(this.accion == "agregar-imagen"){
      //this.productoService.agregarImagen().subscribe();
      location.reload()
    }
    if(this.accion == "actualizar"){
      location.reload()
    }
    if(this.accion == "agregar-carrito"){
      this.agregarAlCarrito();
      location.reload();
    }
    if(this.accion == "agregar-categoria"){
      location.reload()
    }
    else{
      this.mostrar.emit();
    }
  }

  funcionCancelar(){
    if(this.accionCancelar == "actualizar"){
      location.reload()
    }
    else{
      this.mostrar.emit(false);
    }
  }

  eliminarProducto(){
    this.productoService.eliminar(this.productoId).subscribe((response)=>{
      window.location.href='/#/store/0';
    });
    this.localStorageService.deleteValue('productos',this.productoId)
  }

  agregarCategoria(){
    this.categoriaService.agregar(this.categoria).subscribe();
  }

  ngOnInit(): void {
    this.tipoInputNumber = this.tipo == "inputNumber"
  }
}
