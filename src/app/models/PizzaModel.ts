export class PizzaModel {
  constructor(
    public nombre: string,
    public precio: number,
    public fotoUrl: string,
    public ingredientes: string[]
  ) { }
}