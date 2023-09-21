import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BannerService } from 'src/app/servicios/banner.service';
import { PortadaService } from 'src/app/servicios/portada.service';

@Component({
  selector: 'app-editar-portada',
  templateUrl: './editar-portada.component.html',
  styleUrls: ['./editar-portada.component.css']
})
export class EditarPortadaComponent implements OnInit {
  @Input() portadaActual: string;
  @Input() recurso: string;
  @Output() mostrar = new EventEmitter();
  @Output() actualizar = new EventEmitter();

  constructor(private portadaService:PortadaService, private bannerService:BannerService){
  }

  public image:string = "";
  public spinner:boolean = false;

  public image1Change(event:any):any{
    let imagen = event.target.files[0];
    this.extraerBase64(imagen).then((image:any) => {
      this.image = image.base;
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

  funcionCancelar(){
      this.mostrar.emit(false);
  }

  submit(){
    this.spinner = true;
    if(this.recurso === "portada"){
      this.portadaService.editar({id:1,portada:this.image}).subscribe((response)=>{this.actualizar.emit(true)});
    }else if(this.recurso === "banner"){
      this.bannerService.editar({id:1,banner:this.image}).subscribe((response)=>{this.actualizar.emit(true)});
    }
  }

  ngOnInit(){
    this.image = this.portadaActual;
  }


}
