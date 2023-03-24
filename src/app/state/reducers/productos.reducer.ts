import { Action, createReducer, on } from '@ngrx/store';
import { ProductosState } from 'src/app/state/stateModels/producto.state';
import { ProductoModel } from 'src/app/modelos/producto-model';
import { listarProductos, agregarProducto, editarProducto, eliminarProducto} from '../actions/productos.actions';

export interface State {
  home: number;
  away: number;
}

export const initialState = {
  productos:[],
  loading:true
}

export const productosReducer = createReducer(
  initialState,
  on(listarProductos, (state,action)=> {
    return {
      productos:action.productos,
      loading:false
    };
  }),
  on(eliminarProducto, (state,action)=> {
    return {... state,loading:true};
  }),
  on(agregarProducto, (state,action)=> {
    return {... state,loading:true};
  }),
  on(editarProducto, (state,action)=> {
    return {... state,loading:true};
  })
)
