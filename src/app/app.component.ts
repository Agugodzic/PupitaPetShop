import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from './modelos/categoria-model';
import { ProductoModel } from './modelos/producto-model';
import { CategoriaService } from './servicios/categoria.service';
import { ProductoService } from './servicios/producto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  private productos:ProductoModel[];
  private categorias:CategoriaModel[];
  private productosLocalStorage:any;
  public mostrarNav:boolean = true;

  constructor(
    private productoService:ProductoService,
    private categoriaService:CategoriaService
     ){}

  title = 'e-commerce';

  listarProductos(){
    this.productoService.listar().subscribe((response) => {
      this.productos=response;
      this.setLocalStorage('productos');
    }
      )
  }
  listarCategorias(){
    this.categoriaService.listar().subscribe((response) => {
      this.categorias=response;
      this.setLocalStorage('categorias');
    }
      )
  }
  setLocalStorage(recurso:string){
    if(recurso == 'productos'){
      localStorage.setItem("productos",JSON.stringify(this.productos));
    }else if(recurso == 'categorias'){
      localStorage.setItem("productos",JSON.stringify(this.categorias));
    }
  }

  ngOnInit(){
    this.listarProductos();
  }
}
