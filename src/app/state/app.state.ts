import { ActionReducerMap } from "@ngrx/store";
import { ProductosState } from "./stateModels/producto.state";
import { productosReducer } from "./reducers/productos.reducer";

export interface appState{
  productos:ProductosState
}

export const ROOT_REDUCERS:ActionReducerMap<appState> = {
 productos:productosReducer
}

