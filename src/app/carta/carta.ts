import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para @for
import { PizzaModel } from '../models/PizzaModel';
import { PizzaCard } from '../pizza-card/pizza-card';

@Component({
  selector: 'app-carta',
  standalone: true,
  imports: [CommonModule, PizzaCard], // Importamos PizzaCard
  templateUrl: './carta.html',
})
export class Carta {
  
  // 1. Recibimos la lista de pizzas del componente padre (tienda)
  pizzas = input.required<PizzaModel[]>();

  // 2. Re-emitimos el evento 'agregar' hacia el componente padre (tienda)
  agregar = output<{ pizza: PizzaModel, cantidad: number }>();

  // 3. Método que se llama cuando una pizza-card emite 'agregar'
  onAgregarPizza(evento: { pizza: PizzaModel, cantidad: number }) {
    // 4. Emitimos el evento hacia arriba
    this.agregar.emit(evento);
  }
}