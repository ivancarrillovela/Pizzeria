import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
})
export class Header {
  // Hacemos el título configurable como pide el examen
  titulo = input<string>('4V PIZZA');

  // Icono configurable (usaremos un icono de Bootstrap)
  icono = input<string>('bi-shop');
}