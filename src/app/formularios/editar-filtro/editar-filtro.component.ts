import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FiltroService } from '../../servicios/filtro.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriaModel } from '../../modelos/categoria-model';
import { CategoriaService } from '../../servicios/categoria.service';
import { LocalStorageService } from '../../servicios/local-storage.service';
import { Filtro } from '../../modelos/filtro';

@Component({
  selector: 'app-editar-filtro',
  templateUrl: './editar-filtro.component.html',
  styleUrls: ['./editar-filtro.component.css']
})
export class EditarFiltroComponent {
  @Input() filtro: Filtro | undefined;
  @Input() categorias: CategoriaModel[] = [];
  @Output() mostrar = new EventEmitter();
  @Output() actualizar = new EventEmitter();

  constructor(private filtroService:FiltroService,private categoriaService:CategoriaService,private localStorageService:LocalStorageService, private formBuilder:FormBuilder){
  }

  public spinner:boolean = false;
  public nuevoFiltro:Filtro;
  public imagenFiltro:string;
  public agregarCategoria:FormGroup;
  public formFiltro:FormGroup;
  public categoriaAlert:boolean = false;
  public categoriaInputValue:any = '';
  public nuevaCategoria:any;
  public funcion:string;
  public selectedCategory:CategoriaModel | undefined;


  public image1Change(event:any):any{
    let imagen = event.target.files[0];
    this.extraerBase64(imagen).then((image:any) => {
      this.resizeBase64Img(image.base,400,1).then((img:any) => {
      this.imagenFiltro = img;
      })}
  )}

  public resizeBase64Img(base64: string, newWidth: number, quality: number): Promise<string> {
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.src = base64;

      image.onload = function () {
        const oldWidth = image.width;
        const oldHeight = image.height;
        const newHeight = Math.floor(oldHeight / oldWidth * newWidth);

        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;

        const context = canvas.getContext("2d");

        if (context !== null) {
          context.drawImage(image, 0, 0, newWidth, newHeight);

          // Convert the canvas data to a base64 string with the specified quality
          const compressedBase64 = canvas.toDataURL("image/png", quality);
          resolve(compressedBase64);
        } else {
          reject(new Error("Canvas context is null."));
        }
      };
      image.onerror = function (error) {
        reject(error);
      };
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

  public switchCategoria(){
    this.categoriaAlert = ! this.categoriaAlert;
  }

  public submitCategoria(){
    this.categoriaService.agregar(this.agregarCategoria.value).subscribe(
      (response)=>{
        this.localStorageService.addValue('categorias',response);
        this.nuevaCategoria = this.agregarCategoria.value;
        this.listarCategorias();
      }
    )

    this.switchCategoria();
    this.listarCategorias();

  }

  private listarCategorias(){
    //this.categorias = this.localStorageService.getValues('categorias');
    this.categoriaService.listar().subscribe(
      (response: CategoriaModel[])  =>{

        if(this.filtro){
          this.categorias = response.filter(categoria => categoria.categoria !== this.filtro?.nombre);
          this.selectedCategory = response.find(categoria => categoria.categoria == this.filtro?.nombre);
        }else{
          this.categorias = response;
        }
    })
  }

  public funcionCancelar(){
      this.mostrar.emit(false);
  }

  public submit(){
    this.spinner = true;
    if(this.funcion == 'agregar'){
      const values:Filtro = {
        id:0,
        nombre:this.selectedCategory?.categoria || '',
        categoria:this.selectedCategory?.id  || 0,
        imagen:this.imagenFiltro,
      }
      this.filtroService.agregar(values).subscribe((response)=>{this.mostrar.emit(false);});
    }else{
      const values:Filtro = {
        id:this.formFiltro.value.id,
        nombre:this.selectedCategory?.categoria || '',
        categoria:this.selectedCategory?.id  || 0,
        imagen:this.imagenFiltro,
      }
      this.filtroService.editar(values).subscribe((response)=>{this.mostrar.emit(false);});
    }
  }

  onCategoriaChange(event: Event) {
    const change = (event.target as HTMLSelectElement).value;
    this.selectedCategory = this.categorias.find(categoria =>  categoria.categoria == change ) || this.selectedCategory;
  }

  ngOnInit(){

    this.agregarCategoria = this.formBuilder.group(
      {
        categoria:["",[]]
      }
    );

    this.formFiltro = this.formBuilder.group(
      {
        id:[],
        imagen:[],
        nombre:[],
        categoria:["",[]]
      }
    );

    if(this.filtro !== undefined){
      this.funcion = "editar";
      this.imagenFiltro = this.filtro.imagen;
      this.formFiltro.patchValue({
        id:this.filtro.id || 0,
        imagen:this.filtro?.imagen || "",
        nombre:this.filtro?.nombre || "",
        categoria:this.filtro?.categoria
      });
    }else{
      this.funcion = "agregar"
    }
    this.listarCategorias();
  }

}
