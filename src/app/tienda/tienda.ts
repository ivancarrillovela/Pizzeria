import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaCard } from '../pizza-card/pizza-card';
import { ResumenPedido } from '../resumen-pedido/resumen-pedido';
import { Pago } from '../pago/pago';
import { PizzaModel } from '../models/PizzaModel';
import { PedidoItemModel } from '../models/PedidoItemModel';

// Datos de ejemplo
const PIZZAS_POR_DEFECTO: PizzaModel[] = [
  new PizzaModel(
    'Margarita', 15.50,
    'https://tse2.mm.bing.net/th/id/OIP.UDQ-kwe6SS-u-v68e2w3VQHaE7?rs=1&pid=ImgDetMain',
    ['Tomate', 'Mozzarella', 'Albahaca']
  ),
  new PizzaModel(
    'BBQ', 18.00,
    'https://pluspng.com/img-png/bbq-pizza-png-pizza-png-image-4874-3236-4874.png',
    ['Tomate', 'Mozzarella', 'Pollo', 'Salsa BBQ', 'Bacon']
  ),
  new PizzaModel(
    'Napolitana', 16.00,
    'https://www.lucapizza.es/wp-content/uploads/2021/03/pizza-napolitana.jpg',
    ['Tomate', 'Mozzarella', 'Anchoas', 'Alcaparras']
  ),
  new PizzaModel(
    'Vegetariana', 17.00,
    'https://images.hola.com/imagenes/cocina/recetas/20191029152968/pizza-vegetariana/0-738-161/pizza-vegetariana-m.jpg',
    ['Tomate', 'Mozzarella', 'Pimiento', 'Cebolla', 'Champiñón']
  ),
  new PizzaModel(
    'Hawaiana', 20.50, // Precio con decimales para probar
    'https://www.biggerbolderbaking.com/wp-content/uploads/2021/02/Homemade-Hawaiian-Pizza-New-Thumb-scaled.jpg',
    ['Tomate', 'Mozzarella', 'Jamón', 'Piña']
  ),
  new PizzaModel(
    'Carbonara', 18.50,
    'https://www.unileverfoodsolutions.es/dam/global-ufs/mcos/SPAIN/calcmenu/recipes/ES-recipes/general/pizza-carbonara/main-header.jpg',
    ['Nata', 'Mozzarella', 'Bacon', 'Huevo', 'Queso']
  )
];


@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, PizzaCard, ResumenPedido, Pago],
  templateUrl: './tienda.html',
})
export class Tienda implements OnInit {

  // Lista maestra de pizzas
  public pizzasMaestra: PizzaModel[] = [];

  // El estado del pedido (el carrito)
  public pedido: PedidoItemModel[] = [];

  // Cargamos los datos iniciales en ngOnInit (como en la teoría y recetas.ts)
  ngOnInit() {
    this.pizzasMaestra = PIZZAS_POR_DEFECTO;
  }

  // Método que se llama desde el output() de <app-pizza-card>
  onAgregarPizza(evento: { pizza: PizzaModel, cantidad: number }) {

    // Buscamos si la pizza ya está en el pedido
    const itemExistente = this.pedido.find(
      item => item.pizza.nombre === evento.pizza.nombre
    );

    if (itemExistente) {
      // Si existe, sumamos la cantidad
      itemExistente.cantidad += evento.cantidad;
      // Creamos una nueva instancia del array para forzar la detección de cambios
      this.pedido = [...this.pedido];
    } else {
      // Si no existe, lo añadimos como un nuevo item
      const nuevoItem = new PedidoItemModel(evento.pizza, evento.cantidad);
      // Creamos una nueva instancia del array
      this.pedido = [...this.pedido, nuevoItem];
    }
  }

  // Método que se llama desde el output() de <app-pago>
  onPedidoPagado() {
    // Limpiamos el pedido (como pide el examen)
    this.pedido = [];

    // Devolvemos el foco a la lista de pizzas (scroll)
    // Buscamos el elemento por ID y hacemos scroll
    const elementoPizzas = document.getElementById('lista-pizzas');
    if (elementoPizzas) {
      elementoPizzas.scrollIntoView({ behavior: 'smooth' });
    }
  }
}