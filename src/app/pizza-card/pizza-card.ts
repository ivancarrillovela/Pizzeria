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

  /**
   * Método que devuelve la ruta de la imagen del ingrediente
   * basado en el nombre del ingrediente.
   */
  public getIconoIngrediente(ingrediente: string): string {
    const nombre = ingrediente.toLowerCase();

    // Mapeamos los ingredientes a las imágenes disponibles en public/imagenes/ingredientes
    switch (true) {
      case nombre.includes('tomate'):
        return '/imagenes/ingredientes/tomate.png';
      case nombre.includes('mozzarella'):
        return '/imagenes/ingredientes/mozzarella.png';
      case nombre.includes('queso'):
        return '/imagenes/ingredientes/mozzarella.png';
      case nombre.includes('albahaca'):
        return '/imagenes/ingredientes/albahaca.png';
      case nombre.includes('pollo'):
        return '/imagenes/ingredientes/pollo.png';
      case nombre.includes('bacon'):
        return '/imagenes/ingredientes/bacon.png';
      case nombre.includes('jamón'):
        return '/imagenes/ingredientes/jamon.png';
      case nombre.includes('bbq'):
        return '/imagenes/ingredientes/barbacoa.png';
      case nombre.includes('anchoas'):
        return '/imagenes/ingredientes/anchoas.png';
      case nombre.includes('pimiento'):
        return '/imagenes/ingredientes/pimiento.png';
      case nombre.includes('cebolla'):
        return '/imagenes/ingredientes/cebolla.png';
      case nombre.includes('piña'):
        return '/imagenes/ingredientes/pina.png';
      case nombre.includes('huevo'):
        return '/imagenes/ingredientes/huevo.png';
      case nombre.includes('nata'):
        return '/imagenes/ingredientes/nata.png';
      case nombre.includes('alcaparras'):
        return '/imagenes/ingredientes/alcaparras.png';
      case nombre.includes('champiñón'):
        return '/imagenes/ingredientes/champinon.png';
      default:
        return '/imagenes/ingredientes/barbacoa.png'; // Imagen por defecto
    }
  }
}