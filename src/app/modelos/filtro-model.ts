import { ProductoModel } from "./producto-model";

export interface FiltroModel{
  productos:ProductoModel[],
  cantidad:number,
  limit:number,
  offset:number,
  categoria:string,
  orden:string
}
