import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css']
})
export class ImageInputComponent implements OnInit{
  @Input() resource:any;
  @Input() imageNumber:any;
  @Input() action: any;
  preview: any;


  constructor(
    private productoService:ProductoService,
  ){
  }

  public cancel(){
    location.reload();
  }

  public submit(){
    this.productoService.editar(this.resource).subscribe(
      ()=>{
        //location.reload();
        alert('se envio'+this.preview);
        location.reload()
      }
    )
  }

  public imageChange(event:any):any{
    let imagen = event.target.files[0];
    this.extraerBase64(imagen).then((image:any) => {
      this.preview = image.base;
      if(this.imageNumber == 1){
        return this.resource.imagen1 = image.base;
      }else if(this.imageNumber ==2){
        return this.resource.imagen2 = image.base;
      }else if(this.imageNumber == 3){
        return this.resource.imagen3 = image.base;
      }else if(this.imageNumber == 4){
        return this.resource.imagen4 = image.base;
      };
    }
  )}

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
  }
}
