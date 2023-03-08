import { PreferenciaModel } from "./preferencia-model";

export interface PedidoModel{
  id:number;
  nombre:string;
  apellido:string;
  email:string;
  telefono:number;
  ciudad:string;
  codigoPostal:string;
  direccion:string;
  pisoDepto:string;
  descripcion:PreferenciaModel[];
  fecha:string;
  total:number;
  estadoDeEnvio:string;
  estadoDePago:string;
}
