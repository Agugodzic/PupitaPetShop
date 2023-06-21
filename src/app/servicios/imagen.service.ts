import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  public banner = {
    home:"assets/portadas/banner-home.png",
    store:"assets/portadas/banner-store.png"
  }
  public icon = {
    home:"",
    store:""
  }
  public logo = {
    textLogo:"assets/logos/logo-texto.png",
  }
}
