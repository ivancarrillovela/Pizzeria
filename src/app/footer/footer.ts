import { Component, input } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
})
export class Footer {
  // Calculamos el año actual, como pide el examen
  public anoActual: number = new Date().getFullYear();

  // Hacemos el creador configurable
  creador = input<string>('Desarrollador de Angular');
}