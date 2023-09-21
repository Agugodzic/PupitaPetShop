import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CategoriaModel } from '../modelos/categoria-model';
import { CategoriaService } from '../servicios/categoria.service';
import { ProductoService } from '../servicios/producto.service';
import { ToolsService } from '../tools.service';
import { LocalStorageService } from '../servicios/local-storage.service';
import { FiltroService } from '../servicios/filtro.service';

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
  @Input() categoriaId:number;
  @Input() filtroId:number;
  @Input() ruta:string;
  @Input() tipo:string;
  @Input() metodo:any;
  @Input() productoCantidadMaxima:number;

  @Output() mostrar = new EventEmitter();

  private categoria:CategoriaModel;
  public cantidad:number = 1;
  public tipoInputNumber:any;
  public spinner:boolean = false;
  public cantidadMaxima = 5;

  constructor(
      private productoService:ProductoService,
      private categoriaService:CategoriaService,
      private toolsService:ToolsService,
      private filtroService:FiltroService
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
      this.spinner = true;
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
      if(this.cantidad && this.cantidad <= this.cantidadMaxima && this.cantidad > 0){
        this.agregarAlCarrito();
        location.reload();
      }
    }
    if(this.accion == "agregar-categoria"){
      location.reload()
    }
    if(this.accion == "eliminar-filtro"){
      this.spinner=true;
      this.filtroService.eliminar(+this.filtroId).subscribe(()=>{
        this.mostrar.emit(false);
      });
    }
    if(this.accion == "eliminar-categoria"){
      this.spinner = true;
      this.categoriaService.eliminar(this.categoriaId).subscribe(()=>{
        location.href='/#/store/0';
      })
      setTimeout(()=>{
        location.reload();
    }, 2000);
    }
    else{
     // this.mostrar.emit();
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
    this.productoService.eliminar(this.productoId).subscribe(()=>{
      location.href='/#/store/0';
    });
    setTimeout(function(){
      location.href='/#/store/0';
  }, 2000);

  }



  agregarCategoria(){
    this.categoriaService.agregar(this.categoria).subscribe();
  }

  ngOnInit(): void {
    this.tipoInputNumber = this.tipo == "inputNumber";
    if(this.productoCantidadMaxima){
      this.cantidadMaxima = this.productoCantidadMaxima;
    }
  }
}
