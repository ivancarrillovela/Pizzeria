import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoItemModel } from '../models/PedidoItemModel';

@Component({
  selector: 'app-resumen-pedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-pedido.html',
})
export class ResumenPedido {

  // Recibimos los items del pedido
  items = input<PedidoItemModel[]>([]);

  // Calculamos el total usando un 'computed' signal
  totalPedido = computed(() => {
    return this.items().reduce((total, item) => {
      return total + (item.pizza.precio * item.cantidad);
    }, 0);
  });

}