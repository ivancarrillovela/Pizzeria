import { Component } from '@angular/core';
import { Header } from './header/header';
import { Tienda } from './tienda/tienda';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  // Importamos los componentes standalone
  imports: [Header, Tienda, Footer],
  templateUrl: './app.html',
})
export class App {
  // Aquí podríamos sobrescribir los inputs de header/footer si quisiéramos
  public miNombre = 'Iván Carrillo Vela'; // Ejemplo
}