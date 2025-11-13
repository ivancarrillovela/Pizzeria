import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenPedidoItem } from './resumen-pedido-item';

describe('ResumenPedidoItem', () => {
  let component: ResumenPedidoItem;
  let fixture: ComponentFixture<ResumenPedidoItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenPedidoItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenPedidoItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
