import { Component, Input,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriaModel } from 'src/app/modelos/categoria-model';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { LocalStorageService } from 'src/app/servicios/local-storage.service';
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
  public categoriaInputValue:any = '';
  public categoriaEditarProducto:any = {categoria:''};
  public nuevaCategoria:CategoriaModel;


  public imageFile1: any;
  public imageFile2: any;
  public imageFile3: any;
  public imageFile4: any;

  private buttonDisabled:boolean = false;
  public spinner:boolean = false;

  constructor(
    private formBuilder:FormBuilder,
    private productoService:ProductoService,
    private categoriaService:CategoriaService,
    private localStorageService:LocalStorageService
    ) { }

  public switchCategoria(){
    this.categoriaAlert = ! this.categoriaAlert;
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
    //this.categorias = this.localStorageService.getValues('categorias');
    this.categoriaService.listar().subscribe(
      (response: CategoriaModel[])  =>{
        let resp = response;
        if(this.accion == 'editar' && this.producto.categoria){
          this.categorias = resp.filter(categoria => categoria.categoria != this.producto.categoria);
          this.categoriaEditarProducto = resp.find( categoria => categoria.categoria == this.producto.categoria);
        }else{
          this.categorias = response;
        }

    })
  }

  public submitEditar(){
    this.spinner = true;

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
      //this.localStorageService.setProductValue(this.editarProducto.value);
      location.reload();
    });

    //this.functionAgregar = undefined;
  }

  public submitAgregar(){
    this.spinner = true;

    if(!this.buttonDisabled){
      this.buttonDisabled = !this.buttonDisabled;
      if(this.imageFile1){
        this.agregarProducto.value.imagen1 = this.imageFile1;
      }
      this.productoService.agregar(this.agregarProducto.value).subscribe((response) => {
        this.localStorageService.addValue('productos',response);
        location.reload();
      });
      let button = document.querySelector('button');
      button?.setAttribute('style', 'cursor:wait');
    }
  }

  public submitCategoria(){
    this.categoriaService.agregar(this.agregarCategoria.value).subscribe(
      (response)=>{
        this.localStorageService.addValue('categorias',response);
        this.nuevaCategoria = this.agregarCategoria.value;
        this.listarCategorias();
      }
    )

    //let inputValue = document.getElementById();

    this.switchCategoria();
    this.listarCategorias();

  }

  public image1Change(event:any):any{
    let imagen = event.target.files[0];
    this.extraerBase64(imagen).then((image:any) => {
      this.resizeBase64Img(image.base,400).then((img:any) => {
      this.imageFile1 = img;
      })}
  )}

  public resizeBase64Img(base64:string, newWidth:number) {return new Promise((resolve, reject)=>{
        let image:any, oldHeight:number, oldWidth:number, newHeight:number, canvas, context;

        image =  new Image();
        image.src = base64;

        image.onload = function () {

          oldWidth = image.width;
          oldHeight = image.height;
          newHeight = Math.floor(oldHeight / oldWidth * newWidth);

          canvas = document.createElement("canvas");
          canvas.width = newWidth;
          canvas.height = newHeight;

          context = canvas.getContext("2d");

          if(context != null){
            //context.scale(newWidth/image.width,  newHeight/image.height);
            context.drawImage(image, 0, 0, newWidth, newHeight);
            resolve(canvas.toDataURL());
          }else{
            console.log("no")
          }
      }
    });
  }

  extraerBase64 = async ($event: any) => new Promise(
    (resolve, reject):any => {
    try {
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

    let editSelectValue = document.getElementById("select-input");

    this.listarCategorias();
   // this.categoriaEditarProducto = this.categorias.filter((categoria:CategoriaModel)=>{categoria.categoria == this.producto.categoria});

    this.agregarCategoria = this.formBuilder.group(
      {
        categoria:["",[]]
      }
    );

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
    );

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
    );

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
    });

    this.imageFile1 = this.producto.imagen1;
    }

  }
  }
