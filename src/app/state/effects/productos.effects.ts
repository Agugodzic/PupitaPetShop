import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { ProductoService } from 'src/app/servicios/producto.service';

@Injectable()
export class ProductoEffects {

  loadItems$ = createEffect(() => this.actions$.pipe(
    ofType('[Productos] Listar productos desde el servidor'),
    exhaustMap(() => this.productoService.listar()
      .pipe(
        map(items => ({ type: '[Productos] Productos listados',items })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private productoService:ProductoService
  ) {}
}
