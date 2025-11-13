import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoItemModel } from '../models/PedidoItemModel';
import { EstadoVacio } from '../estado-vacio/estado-vacio';
import { ResumenPedidoItem } from '../resumen-pedido-item/resumen-pedido-item'; // <-- IMPORTADO

@Component({
  selector: 'app-resumen-pedido',
  standalone: true,
  imports: [CommonModule, EstadoVacio, ResumenPedidoItem], // <-- AÑADIDO
  templateUrl: './resumen-pedido.html',
})
export class ResumenPedido {

  // Recibimos los items del pedido
  items = input<PedidoItemModel[]>([]);

  // Calculamos el total del pedido
  // computed: crea una señal reactiva que se recalcula automáticamente cuando items cambia
  // reduce: acumula el precio total de todas las pizzas (precio × cantidad)
  totalPedido = computed(() => {
    return this.items().reduce((total, item) => {
      return total + ((item.pizza.precio * item.cantidad));
    }, 0);
  });

}