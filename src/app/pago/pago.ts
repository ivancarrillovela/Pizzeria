import { Component, OnInit, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PedidoItemModel } from '../models/PedidoItemModel';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Importamos ReactiveFormsModule
  templateUrl: './pago.html',
})
export class Pago implements OnInit {

  // Recibimos los items del pedido
  items = input<PedidoItemModel[]>([]);

  // Evento de salida
  pedidoPagado = output<void>();

  // Definimos el FormGroup
  formularioPago: FormGroup;

  constructor() {
    // Inicializamos el FormGroup en el constructor (como en receta-form.ts)
    this.formularioPago = new FormGroup({
      horaEntrega: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required, Validators.minLength(10)]),
      metodoPago: new FormControl('Tarjeta', [Validators.required]), // Valor por defecto
      numeroTarjeta: new FormControl(''), // Validadores dinámicos
      numeroTelefono: new FormControl(''), // Validadores dinámicos
    });
  }

  // Usamos ngOnInit para la lógica de inicialización (como en recetas.ts y teoría)
  ngOnInit() {
    // Escuchamos cambios en el método de pago para poner/quitar validadores
    this.formularioPago.get('metodoPago')!.valueChanges.subscribe(metodo => {
      this.actualizarValidadoresPago(metodo);
    });

    // Ejecutamos una vez al inicio
    this.actualizarValidadoresPago('Tarjeta');
  }

  // Getters para los campos (como en la teoría y receta-form.ts)
  get horaEntrega() { return this.formularioPago.get('horaEntrega'); }
  get direccion() { return this.formularioPago.get('direccion'); }
  get metodoPago() { return this.formularioPago.get('metodoPago'); }
  get numeroTarjeta() { return this.formularioPago.get('numeroTarjeta'); }
  get numeroTelefono() { return this.formularioPago.get('numeroTelefono'); }


  actualizarValidadoresPago(metodo: string) {
    const tarjetaControl = this.numeroTarjeta!;
    const telefonoControl = this.numeroTelefono!;

    if (metodo === 'Tarjeta') {
      tarjetaControl.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
      telefonoControl.clearValidators();
    } else if (metodo === 'Bizum') {
      telefonoControl.setValidators([Validators.required, Validators.pattern(/^\d{9}$/)]);
      tarjetaControl.clearValidators();
    }

    // Actualizamos la validez de los controles
    tarjetaControl.updateValueAndValidity();
    telefonoControl.updateValueAndValidity();
  }

  // Método para el (ngSubmit)
  enviarFormulario() {
    if (this.formularioPago.invalid) {
      // Marcamos todos los campos como 'touched' para mostrar errores
      this.formularioPago.markAllAsTouched();
      return;
    }

    // Validamos que haya al menos un producto en el pedido
    if (this.items().length === 0) {
      alert('Debe seleccionar al menos un producto para realizar el pedido.');
      return;
    }

    // Damos las gracias (como pide el examen)
    alert('¡Gracias por su pedido!');

    // Emitimos el evento
    this.pedidoPagado.emit();

    // Limpiamos el formulario
    this.limpiarFormulario();
  }

  // Método para el botón LIMPIAR
  limpiarFormulario() {
    this.formularioPago.reset();
    // Restauramos el valor por defecto del radio button
    this.formularioPago.patchValue({ metodoPago: 'Tarjeta' });
  }

  // Helper para mostrar errores en la plantilla
  controlInvalido(control: AbstractControl | null): boolean {
    if (!control) return false;
    return control.invalid && (control.dirty || control.touched);
  }
}