import { Component, Input, OnInit } from '@angular/core';
import { ToolsService } from '../tools.service';

@Component({
  selector: 'app-producto-miniatura',
  templateUrl: './producto-miniatura.component.html',
  styleUrls: ['./producto-miniatura.component.css']
})
export class ProductoMiniaturaComponent implements OnInit {
  @Input() producto:any;

  constructor(
    private toolsService:ToolsService
  ) { }

  ngOnInit(): void {
  }

  get precio() {
    return this.toolsService.precio;
  }

  get longitud() {
    return this.toolsService.recortarString;
  }



  productoLink(producto: any): string {
    return '/prod/' + producto.id;
  }

}
