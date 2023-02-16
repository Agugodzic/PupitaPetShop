import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from '../modelos/categoria-model';
import { CategoriaService } from '../servicios/categoria.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public categorias:CategoriaModel[];
  constructor(private categoriaService:CategoriaService) { }

  private listarCategorias(){
    this.categoriaService.listar().subscribe((response)=>{
      this.categorias = response;
    })
  }

  ngOnInit(): void {
    this.listarCategorias();
  }

}
