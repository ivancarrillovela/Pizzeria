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
    'https://www.hogarmania.com/archivos/202303/pizza-margarita-portada-848x477x80xX.jpg',
    ['Tomate', 'Mozzarella', 'Albahaca']
  ),
  new PizzaModel(
    'BBQ', 18.00,
    'https://tse2.mm.bing.net/th/id/OIP.IklJj9okwn37Izj0OjWT8AHaEK?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3',
    ['Tomate', 'Mozzarella', 'Pollo', 'Salsa BBQ', 'Bacon']
  ),
  new PizzaModel(
    'Napolitana', 16.00,
    'https://tse3.mm.bing.net/th/id/OIP.5foZfMOewymwIwfb_h_JLwHaE4?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3',
    ['Tomate', 'Mozzarella', 'Anchoas', 'Alcaparras']
  ),
  new PizzaModel(
    'Vegetariana', 17.00,
    'https://buenavibra.es/wp-content/uploads/2017/07/pizza-1.jpg',
    ['Tomate', 'Mozzarella', 'Pimiento', 'Cebolla', 'Champiñón']
  ),
  new PizzaModel(
    'Hawaiana', 20.50, // Precio con decimales para probar
    'https://th.bing.com/th/id/R.2c3332312c5d9c5dc915db4b9aee90bb?rik=pjhzfjLjZ9IjSQ&pid=ImgRaw&r=0',
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