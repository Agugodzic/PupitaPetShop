import { PreferenciaModel } from "./preferencia-model";

export interface PedidoModel{
  id:number;
  email:string;
  nombre:string;
  telefono:number;
  ciudad:string;
  direccion:string;
  pisoDepartamento:string;
  codigoPostal:string;
  descripcion:PreferenciaModel[];
  fecha:string;
  total:number;
  estadoEnvio:string;
  estadoPago:string;
}
