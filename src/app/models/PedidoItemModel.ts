import { PizzaModel } from "./PizzaModel";

export class PedidoItemModel {
  constructor(
    public pizza: PizzaModel,
    public cantidad: number
  ) {}
}