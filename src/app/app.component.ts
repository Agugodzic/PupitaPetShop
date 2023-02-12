import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{

  title = 'e-commerce';
  mostrarNav:boolean = true;
  objetoVenta:any = {
    descripcion:"Productos",
    precio:0.0,
  }
  ngOnInit(){

  }
}
