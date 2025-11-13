import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoItemModel } from '../models/PedidoItemModel';

@Component({
  selector: 'app-resumen-pedido-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-pedido-item.html',
})
export class ResumenPedidoItem {
  
  // Recibimos el item del pedido como un input obligatorio
  // (Siguiendo el estilo de pizza-card.ts)
  item = input.required<PedidoItemModel>();

  // Calculamos el subtotal aquí dentro usando un 'computed'
  // (Siguiendo el estilo de resumen-pedido.ts)
  subtotal = computed(() => {
    const currentItem = this.item();
    return currentItem.pizza.precio * currentItem.cantidad;
  });

}