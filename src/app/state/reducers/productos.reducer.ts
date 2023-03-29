import { Action, createReducer, on } from '@ngrx/store';
import { ProductosState } from 'src/app/state/stateModels/producto.state';
import { ProductoModel } from 'src/app/modelos/producto-model';
import { listarProductos, editarProducto, eliminarProducto, agregarProductos} from '../actions/productos.actions';

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
  on(agregarProductos, (state,action)=> {
    let nuevaLista:any = action.productos;
    return {
      productos:nuevaLista,
      loading:false
    };;
  }),
  on(editarProducto, (state,action)=> {
    return {... state,loading:true};
  })
)
