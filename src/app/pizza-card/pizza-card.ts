import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PizzaModel } from '../models/PizzaModel';

@Component({
  selector: 'app-pizza-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Importamos ReactiveFormsModule
  templateUrl: './pizza-card.html',
})
export class PizzaCard {

  // 1. Recibimos la pizza (Input)
  pizza = input.required<PizzaModel>();

  // 2. Emitimos el evento de agregar (Output)
  agregar = output<{ pizza: PizzaModel, cantidad: number }>();

  // 3. Creamos el FormGroup para el formulario (Reactive Forms)
  formularioCantidad = new FormGroup({
    cantidad: new FormControl(1, [Validators.required, Validators.min(1)])
  });

  // 4. Getter para el template (como en receta-form.ts)
  get cantidad() {
    return this.formularioCantidad.get('cantidad');
  }

  // 5. Método para enviar el formulario
  enviarFormulario() {
    if (this.formularioCantidad.invalid) {
      return;
    }

    const cantidadSeleccionada = this.cantidad?.value ?? 1;

    // Emitimos el evento al componente padre
    this.agregar.emit({
      pizza: this.pizza(),
      cantidad: cantidadSeleccionada
    });

    // Reseteamos el valor a 1
    this.formularioCantidad.reset({ cantidad: 1 });
  }
}