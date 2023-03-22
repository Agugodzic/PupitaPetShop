import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from './modelos/categoria-model';
import { ProductoModel } from './modelos/producto-model';
import { CategoriaService } from './servicios/categoria.service';
import { LocalStorageService } from './servicios/local-storage.service';
import { ProductoService } from './servicios/producto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  private productos:ProductoModel[];
  private categorias:CategoriaModel[];
  public mostrarNav:boolean = true;

  constructor(
    private productoService:ProductoService,
    private categoriaService:CategoriaService,
    private localStorageService:LocalStorageService,
     ){}

  title = 'e-commerce';

  listarProductos(){
    this.productoService.listar().subscribe((response) => {
      this.productos=response;
      this.localStorageService.setValues('productos',response);
    }
      )
  }
  listarCategorias(){
    this.categoriaService.listar().subscribe((response) => {
      this.categorias=response;
      this.localStorageService.setValues('categorias',response);
    }
      )
  }

  ngOnInit(){
    this.listarProductos();
    this.listarCategorias()
  }
}
