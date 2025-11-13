import { Component, input } from '@angular/core';

@Component({
  selector: 'app-estado-vacio',
  standalone: true,
  imports: [],
  templateUrl: './estado-vacio.html',
})
export class EstadoVacio {
  // Input para el icono
  icono = input<string>('bi-inbox'); // Icono por defecto

  // Input para el mensaje
  mensaje = input<string>('No hay elementos.'); // Mensaje por defecto
}