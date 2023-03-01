import { Component, Input,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoriaModel } from 'src/app/modelos/categoria-model';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProductoService } from 'src/app/servicios/producto.service';

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
  public imageFile1: any;
  public imageFile2: any;
  public imageFile3: any;
  public imageFile4: any;

  constructor(
    private formBuilder:FormBuilder,
    private productoService:ProductoService,
    private categoriaService:CategoriaService,
    private sanitizer:DomSanitizer
    ) { }

  public switchCategoria(){
    this.categoriaAlert = ! this.categoriaAlert
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
    if(this.imageFile1){
      this.editarProducto.value.imagen1 = this.imageFile1;
    }
    if(this.imageFile2){
      this.editarProducto.value.imagen2 = this.imageFile2;
    }
    if(this.imageFile3){
      this.editarProducto.value.imagen3 = this.imageFile3;
    }
    if(this.imageFile4){
      this.editarProducto.value.imagen4 = this.imageFile4;
    }
    /*console.log("in submit" + this.editarProducto.value.imagen1)*/
    this.productoService.editar(this.editarProducto.value).subscribe((response) => {
      location.reload();
    });
  }

  public submitAgregar(){
    let botonStatus = document.querySelector('button');
    if(botonStatus){botonStatus.disabled = true}

    if(this.imageFile1){
      this.agregarProducto.value.imagen1 = this.imageFile1;
    }
    if(this.imageFile2){
      this.agregarProducto.value.imagen2 = this.imageFile2;
    }
    if(this.imageFile3){
      this.agregarProducto.value.imagen3 = this.imageFile3;
    }
    if(this.imageFile4){
      this.agregarProducto.value.imagen4 = this.imageFile4;
    }
    this.productoService.agregar(this.agregarProducto.value).subscribe((response) => {
      if(botonStatus){botonStatus.disabled = false}
      location.reload();
    });

  }

  public submitCategoria(){
    this.categoriaService.agregar(this.agregarCategoria.value).subscribe(()=>this.listarCategorias())
    this.switchCategoria()
    this.listarCategorias()
  }

  public image1Change(event:any):any{
    let imagen = event.target.files[0];
    this.extraerBase64(imagen).then((image:any) => {
      this.imageFile1 = image.base;
    }
  )}
  public image2Change(event:any):any{
    let imagen = event.target.files[0];
    this.extraerBase64(imagen).then((image:any) => {
      this.imageFile2 = image.base;
    }
  )}
  public image3Change(event:any):any{
    let imagen = event.target.files[0];
    this.extraerBase64(imagen).then((image:any) => {
      this.imageFile3 = image.base;
    }
  )}
  public image4Change(event:any):any{
    let imagen = event.target.files[0];
    this.extraerBase64(imagen).then((image:any) => {
      this.imageFile4 = image.base;
    }
  )}

  extraerBase64 = async ($event: any) => new Promise(
    (resolve, reject):any => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

  ngOnInit(): void {

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

      imagen2:this.producto.imagen2,
      imagen3:this.producto.imagen3,
      imagen4:this.producto.imagen4
    })

    this.imageFile1 = this.producto.imagen1;
    }
    this.listarCategorias();
  }
  }
