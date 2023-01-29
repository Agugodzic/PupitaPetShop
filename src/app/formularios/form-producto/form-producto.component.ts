import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriaModel } from 'src/app/modelos/categoria-model';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ToolsService } from 'src/app/tools.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {
  @Input() accion:any;
  @Input() producto:any;

  public editarProducto:FormGroup;
  public agregarProducto:FormGroup;
  public agregarCategoria:FormGroup;
  public categorias:CategoriaModel[];
  public categoriaAlert:boolean = false;

  constructor(
    private formBuilder:FormBuilder,
    private productoService:ProductoService,
    private categoriaService:CategoriaService,
    private tools:ToolsService
    ) { }

  public switchCategoria(){
    if(this.categoriaAlert == false){
      this.categoriaAlert = true;
    }else{
      this.categoriaAlert = false;
    }
  }

  public editar():boolean{
    return this.accion == "editar";
  }

  public agregar():boolean{
    return this.accion == "agregar";
  }

  public actualizar(){
    location.reload()
  }

  private listarCategorias(){
    this.categoriaService.listar().subscribe(
      (response: CategoriaModel[])  =>{
        this.categorias = response;
    })
  }

  public submitEditar(){
    this.productoService.editar(this.editarProducto.value).subscribe(() => location.reload());
  }

  public submitAgregar(){
    this.productoService.editar(this.agregarProducto.value).subscribe(() => location.reload());
  }

  public submitCategoria(){
    this.categoriaService.agregar(this.agregarCategoria.value).subscribe(()=>this.listarCategorias())
    this.switchCategoria()
    this.listarCategorias()
  }

  ngOnInit(): void {
    this.listarCategorias();

    this.agregarCategoria = this.formBuilder.group(
      {
        categoria:["",[]]
      }
    )

    this.editarProducto = this.formBuilder.group(
      {
        id:["",[]],
        nombre:["",[]],
        precio:["",[]],
        marca:["",[]],
        descripcioncorta:["",[]],
        descripcion:["",[]],
        categoria:[],
        imagen1:["",[]],
        imagen2:["",[]],
        imagen3:["",[]],
        imagen4:["",[]]
      }
    )

    this.agregarProducto = this.formBuilder.group(
      {
        nombre:["",[]],
        precio:["",[]],
        descripcioncorta:["",[]],
        descripcion:["",[]],
        marca:["",[]],
        categoria:[],
        imagen1:["",[]],
        imagen2:["",[]],
        imagen3:["",[]],
        imagen4:["",[]]
      }
    )
    if(this.accion=="editar"){
      this.editarProducto.patchValue({
      id:this.producto.id,
      nombre:this.producto.nombre,
      precio:this.producto.precio,
      marca:this.producto.marca,
      descripcioncorta:this.producto.descripcioncorta,
      descripcion:this.producto.descripcion,
      categoria:this.producto.categoria,
      imagen1:this.producto.imagen1,
      imagen2:this.producto.imagen2,
      imagen3:this.producto.imagen3,
      imagen4:this.producto.imagen4
    })}

  }
  }
