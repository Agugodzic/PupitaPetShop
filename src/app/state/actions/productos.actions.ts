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

export const agregarProducto = createAction(
  '[form-producto] Agregar producto',
  props<{producto:ProductoModel}>()
);

export const editarProducto = createAction(
  '[form-producto] Editar producto',
  props<{producto:ProductoModel}>()
);
