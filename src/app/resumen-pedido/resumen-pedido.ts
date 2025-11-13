import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoItemModel } from '../models/PedidoItemModel';
import { EstadoVacio } from '../estado-vacio/estado-vacio';

@Component({
  selector: 'app-resumen-pedido',
  standalone: true,
  imports: [CommonModule, EstadoVacio],
  templateUrl: './resumen-pedido.html',
})
export class ResumenPedido {

  // Constante para el IVA (21%)
  private readonly IVA = 1.21;

  // Recibimos los items del pedido
  items = input<PedidoItemModel[]>([]);

  // Calculamos el total usando un 'computed' signal que se actualiza automáticamente
  // cuando cambian los items. Usamos 'reduce' para acumular el precio total de todas
  // las pizzas multiplicando cada precio por su cantidad y aplicando el IVA (el 0 indica el valor inicial).
  totalPedido = computed(() => 
    this.items().reduce((sumaTotal, pedidoItem) => 
      sumaTotal + ((pedidoItem.pizza.precio * pedidoItem.cantidad) * this.IVA), 0)
  );

}