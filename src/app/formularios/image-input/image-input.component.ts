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
  @Input() imageNumber:number;
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
        location.reload()
      }
    )
  }

  public async imageChange(event:any){
    let imagen = event.target.files[0];
    await this.extraerBase64(imagen).then((image64:any) => {
      this.resizeBase64Img(image64.base,400).then((image:any) => {
        this.preview = image;
        if(this.imageNumber == 1){
          return this.resource.imagen1 = image;
        }else if(this.imageNumber ==2){
          return this.resource.imagen2 = image;
        }else if(this.imageNumber == 3){
          return this.resource.imagen3 = image;
        }else if(this.imageNumber == 4){
          return this.resource.imagen4 = image;
        };
    }
    )}
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

  ngOnInit(): void {
    if(this.action == 'agregar'){
      this.imageNumber = this.imageNumber + 1;
    }
  }
}
