import { createSelector } from "@ngrx/store";
import { appState } from "../app.state";
import { ProductosState } from "src/app/state/stateModels/producto.state";

export const selectProductosFeature = (state:appState) => state.productos;

export const listaDeProductos = createSelector(
  selectProductosFeature,
  (state:ProductosState) => state
);
