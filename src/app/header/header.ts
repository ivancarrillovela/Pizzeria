import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  // Hacemos el título configurable como pide el examen
  titulo = input<string>('TITULO DE LA PÁGINA'); // Valor por defecto
  
  // Input para la URL del logo
  logoUrl = input<string>('/favicon.ico'); // Por defecto el favicon
}