export class PizzaModel {
  constructor(
    public nombre: string,
    public precio: number,
    public fotoUrl: string,
    public ingredientes: string[]
  ) { }

  /**
   * Getter que devuelve el precio formateado con 2 decimales
   */
  get precioFormateado(): string {
    return this.precio.toFixed(2);
  }
}