import { createAction, props } from '@ngrx/store';
import { ProductoModel } from 'src/app/modelos/producto-model';

export const listarProductos = createAction(
  '[App Component] Listar productos desde el servidor',
  props<{productos:any}>()
);

export const eliminarProducto = createAction(
  '[Producto Component] Eliminar producto',
  props<{producto:ProductoModel}>()
);

export const agregarProductos = createAction(
  '[form-producto] Agregar productos',
  props<{productos:any}>()
);

export const editarProducto = createAction(
  '[form-producto] Editar producto',
  props<{producto:ProductoModel}>()
);
